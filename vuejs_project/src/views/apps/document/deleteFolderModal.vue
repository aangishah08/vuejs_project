<template>
  <b-modal
      v-model="showModal"
      centered
      size="sm"
      title="Confirm?"
      @hide="closeModal"
  >
    <div>Are You Sure You Want to Delete Folder?</div>
    <template #modal-footer>
      <div>
        <b-button pill @click="deleteFolderDetails" variant="danger" class="mr-1" size="sm">
          Yes
        </b-button>
        <b-button pill @click="closeModal" size="sm">No</b-button>
      </div>
    </template>

  </b-modal>
</template>
<script>
import {
  BFormInput, BModal, BButton
} from 'bootstrap-vue'
import { deleteFolder } from '@/views/pages/authentication/services/login'


export default {
  name: 'show-delete-folder-modal',
  components: {
    BFormInput,
    BModal,
    BButton,
  },

  props: {
    showDeleteFolderModal: {
      type: Boolean,
      required: true,
    },
    folderDetails: {
      type: Object,
      required: true,
    }

  },
  data() {
    return {
      showModal: false,
    }
  },

  beforeMount() {
    if (this.folderDetails) {
      this.id = this.folderDetails.id
    }
    this.showModal = this.showDeleteFolderModal
  },
  methods:
      {
        deleteFolderDetails() {
          const requestData = new FormData()
          requestData.set('id', this.folderDetails.id)

          deleteFolder(requestData)
              .then((response) => {
                if (response) {
                  this.$emit('delete-folder-modal')
                  this.$toast.success('folder Deleted Successfully')
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
