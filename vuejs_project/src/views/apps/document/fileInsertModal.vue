<template>
  <b-modal
      v-model="showModal"
      centered
      size="sm"
      title="Upload File"
      @hide="closeModal">
    <b-form>
      <b-form-group>
       <b> <label for="name-input">FileName</label></b>
        <b-form-file
            v-model="file"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            size="sm"
        ></b-form-file>
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <div>
        <b-button pill @click="insertFileData" variant="primary" class="mr-1" size="sm">
          Upload</b-button>
        <b-button pill @click="closeModal" size="sm">Cancel</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import {
  BFormInput,BModal,BFormGroup,BForm,BButton,BFormFile,
} from 'bootstrap-vue'
import { insertFile, sendMessage } from '@/views/pages/authentication/services/login'

export default {
  name: "show-file-modal",
  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,BButton,
    BFormFile,
  },
  props: {
    showFileModal: {
      type: Boolean,
      required: true,
    },
    currentFolderId:{
      type: Number,
      required: true
    },
  },

  data() {
    return {
      file:null,
      showModal: false,
    }
  },
  beforeMount() {

    this.showModal=this.showFileModal

  },
  methods:{
    insertFileData(){
      const requestData=new FormData()
      requestData.set('files',this.file)
      requestData.set('parentFolderId',this.currentFolderId)
      insertFile(requestData)
          .then(response=>{
            if(response){
              this.$emit('insert-file-modal')
              this.$toast.success('insert File Successfully')
              this.$emit('close-modal')

            }

      }).catch(e=>{
        console.log(e)
      })
    },

    closeModal(){
      this.$emit("close-modal")
    },
  },
}
</script>