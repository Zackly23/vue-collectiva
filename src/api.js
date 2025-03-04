import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Inisialisasi instance Axios
const api = axios.create({
    baseURL: `${API_BASE_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Tambahkan interceptor untuk menyisipkan token ke setiap request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Tambahkan interceptor untuk menangani token yang expired
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Minta token baru dari server
                const refreshResponse = await axios.post(`${API_BASE_URL}/refresh`, {}, {
                    headers: { 'Authorization': `Bearer ${refreshToken}` }
                });

                const newAccessToken = refreshResponse.data.access_token;
                localStorage.setItem('access_token', newAccessToken);

                // Perbarui header default Axios
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                // Ulangi request yang gagal dengan token baru
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);

                // Jika refresh token gagal, logout pengguna
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
