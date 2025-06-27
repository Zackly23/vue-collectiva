import { reactive } from "vue";

const errors = reactive({
  fullName: "",
  email: "",
  phone: "",
  address: "",

  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",

  criteriaChecked: "",
  roleChecked: "",
});

const validateForm = (
  userProfile,
  involvementDetail,
  criteriaRef,
  criteria,
  role
) => {
  let isValid = true;
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  if (!userProfile.value.fullName) {
    errors.fullName = "Nama lengkap harus diisi";
    isValid = false;
  }
  if (!userProfile.value.email) {
    errors.email = "Email harus diisi";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(userProfile.value.email)) {
    errors.email = "Email tidak valid";
    isValid = false;
  }

  if (
    !userProfile.value.phoneNumber ||
    userProfile.value.phoneNumber === null ||
    userProfile.value.phoneNumber == "null"
  ) {
    errors.phone = "Nomor telepon harus diisi";
    isValid = false;
  } else if (!/^\d{10,15}$/.test(userProfile.value.phoneNumber)) {
    errors.phone = "Nomor telepon tidak valid";
    isValid = false;
  }

  if (!userProfile.value.address) {
    errors.address = "Alamat harus diisi";
    isValid = false;
  }

  if (!involvementDetail.value.startDate) {
    errors.startDate = "Tanggal mulai harus diisi";
    isValid = false;
  }

  if (!involvementDetail.value.endDate) {
    errors.endDate = "Tanggal selesai harus diisi";
    isValid = false;
  } else if (
    involvementDetail.value.startDate &&
    involvementDetail.value.endDate < involvementDetail.value.startDate
  ) {
    errors.endDate = "Tanggal selesai tidak boleh sebelum tanggal mulai";
    isValid = false;
  }

  if (!involvementDetail.value.startTime) {
    errors.startTime = "Waktu mulai harus diisi";
    isValid = false;
  }

  if (!involvementDetail.value.endTime) {
    errors.endTime = "Waktu selesai harus diisi";
    isValid = false;
  } else if (
    involvementDetail.value.startTime &&
    involvementDetail.value.endTime < involvementDetail.value.startTime
  ) {
    errors.endTime = "Waktu selesai tidak boleh sebelum waktu mulai";
    isValid = false;
  }

  // console.log("Role is not selected : ", role.value.key);

  if (!role.value.key) {
    errors.roleChecked = "Peran harus dipilih";
    isValid = false;
  }

  if (!criteria || criteria.length === 0) {
    errors.criteriaChecked = "Kriteria harus dipilih";
    isValid = false;
  }

  errors.criteriaChecked = "Kriteria harus dipilih";

  return { errors, isValid }; // Pastikan return dalam bentuk OBJECT
};

export { validateForm };
