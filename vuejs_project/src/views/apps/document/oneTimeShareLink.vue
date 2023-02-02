<!--<template>-->

<!--</template>-->
<!--<script>-->
<!--import {-->
<!--  BFormInput,BModal,BFormGroup,BForm,BButton,BFormFile,-->
<!--} from 'bootstrap-vue'-->
<!--// import CopyToClipboard from 'vue-copy-to-clipboard'-->
<!--import {  oneTimeUrlShare} from '@/views/pages/authentication/services/login'-->

<!--export default {-->
<!--  components: {-->
<!--    BFormInput,-->
<!--    BModal,-->
<!--    BFormGroup,-->
<!--    BForm,BButton,-->
<!--    BFormFile,-->
<!--    // CopyToClipboard-->
<!--  },-->

<!--  beforeMount() {-->
<!--    this.getShareLink(this.$route?.query?.fileToken);-->
<!--    console.log('token')-->

<!--  },-->
<!--  methods: {-->
<!--    getShareLink(fileToken) {-->
<!--      const requestData = {-->
<!--        Token: fileToken,-->
<!--      };-->
<!--      oneTimeUrlShare(requestData)-->
<!--          .then((response) => {-->
<!--            console.log('token',response)-->
<!--              // this.isLoading = false;-->
<!--              window.open(response.data);-->
<!--              this.$toast.success('download File Successfully')-->
<!--          })-->
<!--          .catch((e) => {-->
<!--            // this.isLoading = false;-->
<!--            // this.isLinkExpired = true;-->
<!--            this.$toast.error("Your link is expired.");-->
<!--          });-->
<!--    },-->
<!--  },-->

<!--}-->
<!--</script>-->