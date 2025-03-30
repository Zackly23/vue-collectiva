import { reactive } from "vue";

const errors = reactive({
  address: "",
  desa: "",
  kecamatan: "",
  kabupaten: "",
  provinsi: "",
  longitude: "",
  latitude: "",
});

const validateForm = (location) => {
  let isValid = true;
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  if (!location.value.address) {
    errors.address = "Address is required";
    isValid = false;
  }

  if (!location.value.latitude) {
    errors.latitude = "Latitude is required";
    isValid = false;
  }

  if (!location.value.longitude) {
    errors.longitude = "Longitude is required";
    isValid = false;
  }

  if (!location.value.provinsi) {
    errors.provinsi = "Select Project Province";
    isValid = false;
  }

  if (!location.value.kabupaten) {
    errors.kabupaten = "Select Project Kabupaten";
    isValid = false;
  }

  if (!location.value.kecamatan) {
    errors.kecamatan = "Select Project Kecamatan";
    isValid = false;
  }

  if (!location.value.desa) {
    errors.desa = "Select Project Desa";
    isValid = false;
  }

  return { errors, isValid }; // Pastikan return dalam bentuk OBJECT
};

export { validateForm };
