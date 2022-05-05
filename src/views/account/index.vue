<template>
  <admin-info v-if="roleId == 1"></admin-info>
  <doctor-info v-else-if="roleId == 2"></doctor-info>
  <patient-info v-else></patient-info>
</template>
<script>
import AdminInfo from "./components/adminInfo.vue";
import DoctorInfo from "./components/doctorInfo.vue";
import PatientInfo from "./components/patientInfo";
export default {
  components: {
    AdminInfo,
    DoctorInfo,
    PatientInfo
  },
  data() {
    return {

    }
  },
  computed: {
    roleId() {
      return localStorage.getItem("roleId");
    }
  }
};
</script>