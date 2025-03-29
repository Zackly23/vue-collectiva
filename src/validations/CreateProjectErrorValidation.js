import { reactive } from "vue";

const errors = reactive({
  // Page 1 - Creator
  creatorName: "",
  creatorEmail: "",
  creatorPhone: "",
  creatorSocialMedia: "",
  creatorType: "",
  organizationName: "",
  creatorWebsite: "",
  creatorID: "",
  creatorFile: "",

  // Page 1 - Beneficiary
  beneficiaryType: "",
  beneficiaryName: "",
  beneficiaryNIK: "",
  beneficiaryAddress: "",
  beneficiaryPhone: "",
  beneficiaryNeeds: "",
  organizationName: "",
  organizationRegNumber: "",
  organizationAddress: "",
  organizationPIC: "",
  organizationPhone: "",
  beneficiaryRelation: "",
  beneficiaryRelationOther: "",
  beneficiaryFile: "",

  // Page 2 - Project Details
  projectTitle: "",
  projectTags: "",
  projectDescription: "",
  projectStartDate: "",
  projectEndDate: "",
  projectCategory: "",
  projectFile: "",
  projectTargetAmount: "",
  projectTargetVolunteer: "",
  projectCriteria: "",
  projectRole: "",
  projectGroupChatName: "",
  projectGroupAvatar: "",

  // Page 3 - Location
  address: "",
  provinsi: "",
  kabupaten: "",
  kecamatan: "",
  desa: "",
  latitude: "",
  longitude: "",

  // Page 4 - Timeline
  timeline: "",

  // Page 5 - Document
  lampiranList: "",
});

const validateForm = (
  creator,
  beneficiary,
  project,
  location,
  timeline,
  document
) => {
  let isValid = true;

  // Validate Creator Details
  if (!creator.value.creatorName.trim()) {
    errors.creatorName = "Full Name is required";
    isValid = false;
  }

  if (!creator.value.creatorEmail) {
    errors.creatorEmail = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(creator.value.creatorEmail)) {
    errors.creatorEmail = "Invalid email format";
    isValid = false;
  } else {
    errors.creatorEmail = "";
  }

  if (!creator.value.creatorPhone) {
    errors.creatorPhone = "Phone Number is required";
    isValid = false;
  } else if (!/^\d{10,15}$/.test(creator.value.creatorPhone)) {
    errors.creatorPhone = "Phone Number must be 10-15 digits";
    isValid = false;
  } else {
    errors.creatorPhone = "";
  }

  if (!creator.value.creatorSocialMedia) {
    errors.creatorSocialMedia = "Social Media is required";
    isValid = false;
  }

  if (!creator.value.creatorType) {
    // console.log('ada : ', beneficiary.value.creatorType)
    errors.creatorType = "Creator Type is required";
    isValid = false;
  } else {
    if (creator.value.creatorType == "perorangan") {
      // Validate Beneficiary Details

      if (!creator.value.creatorID) {
        errors.creatorID = "NIK is required";
        isValid = false;
      }
    } else if (creator.value.creatorType == "organisasi") {
      if (!creator.value.organizationName) {
        errors.organizationName = "Organization Name is required";
        isValid = false;
      }

      if (!creator.value.creatorID) {
        errors.creatorID = "NIK is required";
        isValid = false;
      }
    }
  }

  if (!beneficiary.value.beneficiaryType) {
    errors.beneficiaryType = "Beneficiary Type is required";
    isValid = false;
  } else {
    if (beneficiary.value.beneficiaryType == "perorangan") {
      if (!beneficiary.value.beneficiaryName) {
        errors.beneficiaryName = "Beneficiary Name is required";
        isValid = false;
      }

      if (!beneficiary.value.beneficiaryAddress) {
        errors.beneficiaryAddress = "Beneficiary Address is required";
        isValid = false;
      }

      if (!beneficiary.value.beneficiaryPhone) {
        errors.beneficiaryPhone = "Beneficiary Phone is required";
        isValid = false;
      }

      if (!beneficiary.value.beneficiaryNIK) {
        errors.beneficiaryNIK = "Beneficiary Phone is required";
        isValid = false;
      }

      if (!beneficiary.value.beneficiaryAddress) {
        errors.beneficiaryAddress = "Beneficiary Address is required";
        isValid = false;
      }
    } else if (beneficiary.value.beneficiaryType == "lembaga") {
      if (!beneficiary.value.organizationName) {
        errors.organizationName = "Beneficiary Name is required";
        isValid = false;
      }
      if (!beneficiary.value.organizationPhone) {
        errors.organizationPhone = "Organization Phone is required";
        isValid = false;
      }
      if (!beneficiary.value.organizationAddress) {
        errors.organizationAddress = "Organization Address is required";
        isValid = false;
      }
      if (!beneficiary.value.organizationPIC) {
        errors.organizationPIC = "Organization PIC Address is required";
        isValid = false;
      }
    }

    errors.beneficiaryType = "";
  }

  if (!beneficiary.value.beneficiaryRelation) {
    errors.beneficiaryRelation = "Relation of beneficiary is required";
    isValid = false;
  } else if (beneficiary.value.beneficiaryRelation === "lainnya") {
    if (!beneficiary.value.beneficiaryRelationOther) {
      errors.beneficiaryRelationOther = "Explain the Relation";
      isValid = false;
    } else {
      errors.beneficiaryRelationOther = "";
    }
  }

  // Validate Project Details
  if (!project.value.projectTitle) {
    errors.projectTitle = "Project Title is required";
    isValid = false;
  }
  if (!project.value.projectDescription) {
    errors.projectDescription = "Project Description is required";
    isValid = false;
  }
  if (
    !Array.isArray(project.value.projectTags) ||
    project.value.projectTags.length === 0
  ) {
    errors.projectTags = "At least one tag is required";
    isValid = false;
  }
  if (!project.value.projectStartDate) {
    errors.projectStartDate = "Project Start Date is required";
    isValid = false;
  }
  if (!project.value.projectEndDate) {
    errors.projectEndDate = "Project End Date is required";
    isValid = false;
  }

  if (!project.value.projectCategory) {
    errors.projectCategory = "Project Category is required";
    isValid = false;
  } else {
    if (project.value.projectCategory == "donation") {
      if (!project.value.projectTargetAmount) {
        errors.projectTargetAmount = "Target Donation is required";
        isValid = false;
      }
    } else if (project.value.projectCategory == "volunteer") {
      if (!project.value.projectTargetVolunteer) {
        errors.projectTargetVolunteer = "Target Volunteer is required";
        isValid = false;
      }
    }
    errors.projectCategory = "";
  }

  if (!project.value.projectFile) {
    errors.projectFile = "Project Image is Required";
    isValid = false;
  }

  if (
    !Array.isArray(project.value.projectCriteria) ||
    project.value.projectCriteria.length === 0
  ) {
    errors.projectCriteria = "At least one project criteria is required";
    isValid = false;
  } else {
    errors.projectCriteria = project.value.projectCriteria.some(
      (criteria) => !criteria.key || !criteria.value || !criteria.role
    )
      ? "Each project criteria must have key, value, and role"
      : "";
  }

  if (
    !Array.isArray(project.value.projectRole) ||
    project.value.projectRole.length === 0
  ) {
    errors.projectRole = "At least one project role is required";
    isValid = false;
  } else {
    errors.projectRole = project.value.projectRole.some(
      (role) => !role.key || !role.value
    )
      ? "Each project role must have key and value"
      : "";
  }

  if (!project.value.projectGroupChatName) {
    errors.projectGroupChatName = "Group Chat Name is required";
    isValid = false;
  }

  // Validate Location Details
  if (!location.value.address) {
    errors.address = "Project Address is required";
    isValid = false;
  }
  if (!location.value.provinsi) {
    errors.provinsi = "Province is required";
    isValid = false;
  }
  if (!location.value.kabupaten) {
    errors.kabupaten = "City/District is required";
    isValid = false;
  }
  if (!location.value.kecamatan) {
    errors.kecamatan = "Kecamatan is required";
    isValid = false;
  }
  if (!location.value.desa) {
    errors.desa = "Desa is required";
    isValid = false;
  }

  if (!location.value.latitude || !location.value.longitude) {
    errors.latitude = "Latitude is required";
    errors.longitude = "Longitude is required";
    isValid = false;
  }

  // Validate Timeline
  if (!Array.isArray(timeline.value) || timeline.value.length === 0) {
    // console.log("ini timeline : ", timeline.value);
    errors.timeline = "At least one timeline entry is required";
    isValid = false;
  } else {
    errors.timeline = "";
  }

  // Validate Document Upload
  // console.log("ini lampiran : ", document.value, ' length : ', document.value.length);

  if (document.value.length === 0) {
    // console.log("ini lampiran : ", document.value);
    errors.lampiranList = "At least one document is required";
    isValid = false;
  } else {
    errors.lampiranList = "";
    isValid = false;
  }

  return { errors, isValid }; // Pastikan return dalam bentuk OBJECT
};

export { validateForm };
