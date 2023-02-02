<template>
  <b-modal
      v-model="showModal"
           centered
           size="sm"
           title="Edit-Data">
    <b-form>
      <b-form-group>
        <label for="name-input">message</label>
        <b-form-textarea
            id="name-input"
            v-model="requestData.message"
            required
        ></b-form-textarea>
      </b-form-group>
    </b-form>
<template #modal-footer>
  <div>
    <b-button  pill  @click="updateChatDetail" variant="primary" class="mr-1" size="sm">
      Update
    </b-button>
    <b-button pill @click="closeModal" size="sm">Close</b-button>
  </div>
</template>
  </b-modal>
</template>
<script>
import {
  BFormInput, BModal, BFormGroup, BForm, BButton,BFormTextarea
} from 'bootstrap-vue'
import {  editMessage } from '@/views/pages/authentication/services/login'

export default {
  name: 'show-edit-chat-modal',
  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,
    BButton,
    BFormTextarea
  },
  props: {
    showEditChatModal: {
      type: Boolean,
      required: true,
    },
    messageId: {
      type: Number,
      required: true,
    },
    messageData:{
      type:String,
      required:true,
    }

  },

  data() {
    return {
      showModal: false,
      requestData:{
        message:this.messageData
      }
    }

  },
  beforeMount() {
    this.showModal = this.showEditChatModal

  },
  methods: {
    updateChatDetail() {
      const requestData = new FormData()
      requestData.set('message',this.messageData)
      requestData.set('id',this.messageId)
      console.log(this.messageId)
      editMessage(this.requestData,this.messageId)
          .then((response) => {
            if (response) {
              console.log('in update',this.messageData)
              this.$emit('update-message')
              this.$toast.success('Message Updated SuccessFully')
              this.$emit('close-modal')

            }
          })
          .catch(e => {
            console.log(e)
          })
    },
    closeModal() {
      this.$emit('close-modal')
    },
  },
}
</script>