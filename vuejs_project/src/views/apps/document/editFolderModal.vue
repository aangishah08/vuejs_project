<template>
  <b-modal
      v-model="showModal"
      centered
      size="sm"
      title="Edit-Data">
    <b-form>
      <b-form-group>
        <label for="name-input">folderName</label>
        <b-form-input
            id="name-input"
            v-model="folderName"
            placeholder="foldername.."
            required
        ></b-form-input>
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <div>
        <b-button pill  @click="updateFolderDetail" variant="primary" class="mr-1" size="sm">
          Update
        </b-button>
        <b-button pill @click="closeModal" size="sm">Close</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import {
  BFormInput,BModal,BFormGroup,BForm,BButton
} from 'bootstrap-vue'
import { updateFolder } from '@/views/pages/authentication/services/login'

export default {
  name: "show-edit-folder-modal",
  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,BButton,
  },
  props: {
    showEditFolderModal: {
      type: Boolean,
      required: true,
    },
    folderDetails:{
      type:Object,
      required: true,
    },
    currentFolderId:{
      type: Number,
      required: true
    },
  },

  data() {
    return {
      folderName:"",
      showModal: false,
    }
  },
  beforeMount() {
    if(this.folderDetails){
      this.folderName=this.folderDetails.folderName
      // this.currentFolderId=this.folderDetails.currentFolderId
    }
    this.showModal=this.showEditFolderModal

  },
  methods:{
    updateFolderDetail(){
      const requestData={
        folderName:this.folderName,
        parentFolderId: this.folderDetails.parentFolderId,
        id:this.folderDetails.id
      }
      updateFolder(requestData)
          .then((response)=>{
            if(response){
              this.$emit('update-folder-modal')

              this.$toast.success(' Folder Updated Successfully')
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