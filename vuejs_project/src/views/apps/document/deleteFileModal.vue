<template>
  <b-modal
      v-model="showModal"
      centered
      size="sm"
      title="Please Confirm"
  ><div>Are you sure, you want to delete data.</div>
    <template #modal-footer>
      <div>
        <b-button  @click="deleteFileDetails" pill variant="danger" class="mr-1" size="sm">
          Yes
        </b-button>
        <b-button pill @click="closeModal" size="sm">No</b-button>
      </div>
    </template>
  </b-modal>

</template>
<script>
import {
  BModal,BButton,
} from 'bootstrap-vue'
import { deleteFile  } from '@/views/pages/authentication/services/login'
export default {
  name: "show-delete-modal",
  components: {
    BModal,
    BButton,
  },
  props: {
    showDeleteModal: {
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
  beforeMount() {
    if(this.fileDetails){
      this.id=this.fileDetails.id
    }
    // if(this.folderDetails){
    //   this.id = this.folderDetails.id
    // }

    this.showModal=this.showDeleteModal
  },
  data() {
    return {
      showModal: false,
    }
  },
  methods:{
    deleteFileDetails(){
      const requestData=new FormData()
      requestData.set('id',this.fileDetails.id)
      deleteFile(requestData)
          .then((response)=>{
            if(response){
              this.$emit('delete-modal')
              console.log("data delete")
              this.$toast.success('File Deleted Successfully')
              this.$emit('close-modal')

            }
          }).catch(e=>{
        console.log(e)
      })
    },
    closeModal(){
      this.$emit('close-modal')
    }

  },
}
</script>