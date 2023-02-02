<template>
  <b-modal
      v-model="showModal"
           centered
           size="sm"
           title="Edit-Data">
    <b-form>
      <b-form-group>
        <label for="name-input">FlieName</label>
        <b-form-input
            id="name-input"
            v-model="fileName"
            placeholder="filename.."
            required
        ></b-form-input>
      </b-form-group>
    </b-form>
<template #modal-footer>
  <div>
    <b-button @click="updateFileDetail" pill variant="primary" class="mr-1" size="sm">
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
import { updateFile } from '@/views/pages/authentication/services/login'

export default {
  name: "show-edit-modal",
  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,BButton,
  },
  props: {
    showEditModal: {
      type: Boolean,
      required: true,
    },
    fileDetails:{
      type:Object,
      required: true,
    },
    // folderDetails:{
    //   type:Object,
    //   required: true,
    // },
  },

  data() {
    return {
      fileName:"",
      // folderName: "",
      showModal: false,
    }
  },
  beforeMount() {
    if(this.fileDetails){
      this.fileName=this.fileDetails.fileName
    }
    // if(this.folderDetails){
    //   this.folderName = this.folderDetails.folderName
    // }
    this.showModal=this.showEditModal

  },
  methods:{
    updateFileDetail(){
      const requestData=new FormData()
      requestData.set('fileName',this.fileName)
      requestData.set('id',this.fileDetails.id)
      updateFile(requestData)
          .then((response)=>{
            if(response){
              this.$emit('update-modal')

              this.$toast.success('file Updated Successfully')
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