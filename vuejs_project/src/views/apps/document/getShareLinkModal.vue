<template>
  <b-modal
      v-model="showModal"
      centered
      size="sm"
      title="share Link"
      @hide="closeModal">
    <b-form>
      <b-form-group>
        <b-form-input
            v-model="shareableLink"
            disabled
        ></b-form-input>

<!--        <copy-to-clipboard :text=shareableLink >-->
<!--           <feather-icon icon="CopyIcon" size="16" class="cursor-pointer" @click="getShareLink()"></feather-icon>-->

<!--        </copy-to-clipboard>-->
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <div>
        <b-button pill @click="downloadFileData(fileId)" variant="primary" class="mr-1" size="sm">Download</b-button>
        <b-button pill @click="closeModal" size="sm">Cancel</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import {
  BFormInput,BModal,BFormGroup,BForm,BButton,BFormFile,
} from 'bootstrap-vue'
import CopyToClipboard from 'vue-copy-to-clipboard'
import { downloadFile, getShareLink } from '@/views/pages/authentication/services/login'
// import {  oneTimeUrlShare} from '@/views/pages/authentication/services/login'

export default {
  name: "show-get-share-link-modal",
  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,BButton,
    BFormFile,
    CopyToClipboard
  },
  props: {
    showGetShareLinkModal: {
      type: Boolean,
      required: true,
    },
    shareLinkDetails:{
      type:Object,
      required: true,
    },
    fileId:{
      type:Number,
      required:true,

    },
    // fileToken:{
    //   type:String,
    //   required:true,
    // }

  },

  data() {

    return {
      shareableLink:"",
      showModal: false,
      // fileToken: this.$route.query.fileToken

    }

  },
  beforeMount() {
    if(this.shareLinkDetails){
      this.shareableLink=this.shareLinkDetails.shareableLink
    }
    this.showModal=this.showGetShareLinkModal
  },
  // mounted() {
  //   this.getOneUrl(this.$route?.query?.token)
  //   console.log('token :',this.$route?.query?.token)
  // },
  methods:{
    // async copyURL(link) {
    //   try {
    //     await navigator.clipboard.writeText(link);
    //     this.$toast.success('copied Link')
    //     this.$emit("close-modal")
    //   } catch($e) {
    //     this.$toast.error('can not copied Link')
    //   }
    // },
    downloadFileData(id){
      downloadFile({id})
          .then(response=>{
            if (response?.data){
              window.open(response.data.data)
              this.$emit("close-modal")
              this.$toast.success('download File Successfully')
            }
          }).catch(e => {
            this.$toast.error('Download failed')
        console.log(e)
      })
    },
    // getShareLink(fileToken) {
    //   console.log('getShareLink in')
    //   const requestData = {
    //     fileToken: fileToken,
    //   };
    //   console.log('getShareLink out')
    //   oneTimeUrlShare(requestData)
    //       .then((response) => {
    //         console.log('oneTimeUrlShare in', response)
    //         // this.isLoading = false;
    //         window.open(response.data.data)
    //         this.$toast.success('download File Successfully')
    //       })
    //       .catch((e) => {
    //         // this.isLoading = false;
    //         // this.isLinkExpired = true;
    //         this.$toast.error("Your link is expired.");
    //       });
    // },
    closeModal(){
      this.$emit("close-modal")
    },
  },
}
</script>