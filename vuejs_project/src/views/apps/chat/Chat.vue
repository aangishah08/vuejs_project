<template>

  <div style="height: inherit">

    <!-- Main Area -->
    <section class="chat-app-window height">

      <!-- Start Chat Logo -->

      <!-- Chat Content -->
      <div class="active-chat">
        <!-- Chat Navbar -->
        <div class="chat-navbar">
          <header class="chat-header">

            <strong><h1>Messages</h1></strong>


            <!-- Contact Actions -->
            <div class="d-flex align-items-center">
              <feather-icon
                  icon="PaperclipIcon"
                  size="25"
                  class="cursor-pointer d-sm-block d-none mr-50"
                  @click="toggleShowFileChatModal"
              />
              <template>
                <div class="dropdown">
                  <b-dropdown
                      variant="link"
                      no-caret
                      toggle-class="p-0"
                      right
                  >
                    <template #button-content>
                      <feather-icon
                          icon="FilterIcon"
                          size="25"
                          class="mr-1 cursor-pointer align-middle text-body"
                      />
                    </template>
                    <b-dropdown-item
                        :active="requestData.filterBy===getFilterBy.ALL"
                        @click="filtersAll(getFilterBy.ALL)"
                        class="cursor-pointer"
                    >
                      All
                    </b-dropdown-item>

                    <b-dropdown-item :active="requestData.filterBy===getFilterBy.DOCUMENT"
                                     @click="filtersAll(getFilterBy.DOCUMENT)"
                                     class="cursor-pointer"
                    >
                      Documents
                    </b-dropdown-item>
                    <b-dropdown-item :active="requestData.filterBy===getFilterBy.MESSAGE"
                                     @click="filtersAll(getFilterBy.MESSAGE)"
                                     class="cursor-pointer"
                    >
                      Messages
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </template>
            </div>
          </header>
        </div>

        <!-- User Chat Area -->

<!--        <vue-perfect-scrollbar-->
<!--            ref="refChatLogPS"-->
<!--            v-model="requestData.pageNo"-->
<!--            :settings="perfectScrollbarSettings"-->
<!--            class="user-chats overflow-y-only">-->
        <!--        </vue-perfect-scrollbar>-->

        <section
            id="chat-box"
            class="user-chats scroll-area scroll-y"
            :class="chatInputMessage.length > 2000 ? 'character-error' : ''"
            infinite-wrapper
        >
          <infinite-loading
              ref="infiniteLoadingRef"
              direction="top"
              :identifier="scrollIdentifer"
              force-use-infinite-wrapper
              @infinite="loadMoreChatMessage"
          >
          </infinite-loading>


<!--            <infinite-loading direction="top" force-use-infinite-wrapper=".infinite-wrapper" @infinite="getAllMessage"/>-->
            <div class="chats"
                 v-for="(msg,index) in this.msgData"
                 :key="index"
            >

              <div
                  v-if="msg.userId===requestData.userId"
                  class="chat"
                  :class="{'chat-right': msgData}"
              >

                <div class="chat-avatar">
                  <b-avatar
                      size="30"
                      class="avatar-border-2 box-shadow-2 badge-primary mr-1 "
                      :text="$fn().splitUserName(msg.userName)"
                      variant="transparent"
                  ></b-avatar>
                </div>

                <div class="chat-body">
                  <div class="chat-content">

                    <p>{{ msg.userName }} <feather-icon
                        v-if="msg.isDeletable===true"
                        icon="Trash2Icon"
                        @click="openChatDeleteContentModal(msg.id)"
                        class="mr-1 cursor-pointer "
                        size="15"
                    />{{
                        $fn()
                            .dateToMoment(msg.createdAt, 'MM/DD/YY h:mm A')
                      }}</p>
                    <p>{{ msg.message }}
                      <feather-icon
                          v-if="msg.type==='DOCUMENT'"
                          @click="downloadFileData(msg.fileId)"
                          icon="DownloadIcon"
                          class="cursor-pointer ml-1"
                          size="15"
                      />
                      <feather-icon
                          v-if="msg.type==='DOCUMENT'"
                          icon="EyeIcon"
                          @click="openFileContentModal(msg)"
                          class=" cursor-pointer ml-1"
                          size="15"
                      />
<!--                      <feather-icon-->
<!--                          v-if="msg.isDeletable===true"-->
<!--                          icon="Trash2Icon"-->
<!--                          @click="openChatDeleteContentModal(msg.id)"-->
<!--                          class=" mr-1 cursor-pointer "-->
<!--                          size="15"-->
<!--                      />-->
                      <feather-icon
                          v-if="msg.type==='MESSAGE' && msg.isEditable===true"
                          icon="EditIcon"
                          @click="openChatEditContentModal(msg)"
                          class=" cursor-pointer ml-1"
                          size="15"
                      />
                    </p>



                  </div>

                </div>

              </div>
              <div
                  v-else
                  class="chat"
                  :class="{'chat-left': msgData}"

              >

                <div class="chat-avatar">
                  <b-avatar
                      size="30"
                      class="avatar-border-2 box-shadow-1 badge-secondary mr-1 "
                      :text="$fn().splitUserName(msg.userName)"
                      variant="transparent"
                  ></b-avatar>
                </div>

                <div class="chat-body">
                  <div class="chat-content">

                    <p>{{ msg.userName }} {{
                        $fn()
                            .dateToMoment(msg.createdAt, 'MM/DD/YY h:mm A')
                      }}</p>
                    <p>{{ msg.message }}
                      <feather-icon
                          v-if="msg.type==='DOCUMENT'"
                          @click="downloadFileData(msg.fileId)"
                          icon="DownloadIcon"
                          class="cursor-pointer ml-1"
                          size="15"
                      />
                      <feather-icon
                          v-if="msg.type==='DOCUMENT'"
                          @click="openFileContentModal(msg)"
                          icon="EyeIcon"
                          class=" cursor-pointer ml-1"
                          size="15"
                      />
                    </p>
                  </div>

                </div>
              </div>
            </div>
    </section>

          <!-- Message Input -->
          <b-form
              class="chat-app-form"
          >
            <b-input-group class="input-group-merge form-send-message mr-1">
              <b-form-input
                  v-model="chatInputMessage"
                  placeholder="Enter your message"
              />
            </b-input-group>
            <b-button
                variant="primary"
                @click="getSendMessage"
            >Send
            </b-button>
          </b-form>

      </div>
    </section>

    <show-file-chat-modal
        v-if="showFileChatModal"
        :show-file-chat-modal="showFileChatModal"
        :current-folder-id="currentFolderId"
        @insert-file-modal="getAllMessage"
        @close-modal="toggleShowFileChatModal"
    />
    <show-read-file-modal
        v-if="showReadFileModal"
        :show-read-file-modal="showReadFileModal"
        :view-file-details="viewFileDetails"
        :file-id="fileId"
        @close-modal="toggleShowReadFileModal"
    />
    <show-edit-chat-modal
        v-if="showEditChatModal"
        :message-data="messageData"
        :message-id="messageId"
        :show-edit-chat-modal="showEditChatModal"
        @update-message="getAllMessage"
        @close-modal="toggleShowEditChatModal"
    />
    <b-modal
        v-model="showModal"
        centered
        size="sm"
        title="Please Confirm"
    >
      <div>Are you sure, you want to delete message.</div>
      <template #modal-footer>
        <div>
          <b-button pill @click="deleteChat" variant="danger" class="mr-1" size="sm">
            Yes
          </b-button>
          <b-button pill @click="closeModal" size="sm">No</b-button>
        </div>
      </template>
    </b-modal>

  </div>
</template>

<script>
import {
  ref
} from '@vue/composition-api'
import {
  BAvatar,BDropdown, BDropdownItem, BForm, BInputGroup, BFormInput, BButton, BFormGroup, BFormTextarea
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import ChatLog from './ChatLog.vue'
import {
  deleteMessage,
  downloadFile, editMessage,
  fetchMessage,
  sendMessage
} from '@/views/pages/authentication/services/login'
import * as $fn from '@/helper/vue-helper'
import { getFilterBy } from '@/views/apps/chat/getFilterBy'
import showFileChatModal from '@/views/apps/chat/fileChatModal.vue'
import showReadFileModal from '@/views/apps/document/readFileModal.vue'
import showEditChatModal from '@/views/apps/chat/EditChatModal.vue'
import { extractFileFormat } from '@/helper/vue-helper'
import InfiniteLoading from 'vue-infinite-loading'


export default {
  computed: {
    getFilterBy() {
      return getFilterBy
    }
  },
  components: {

    // BSV
    BAvatar,
    BDropdown,
    BDropdownItem,
    BForm,
    BInputGroup,
    BFormInput,
    BButton,
    BFormGroup,
    BFormTextarea,
    VuePerfectScrollbar,
    ChatLog,
    showFileChatModal,
    showReadFileModal,
    showEditChatModal,
    InfiniteLoading,
    // showDeleteChatModal

  },

  data() {
    // const refChatLogPS = ref(null)
    // const activeChat = ref({})
    // const perfectScrollbarSettings = {
    //   maxScrollbarLength: 150,
    // }
    return {
      $refs: {
        showFileChatModal,
        showReadFileModal,
        showEditChatModal
      },
      showModal: false,
      requestData: {
        filterBy: getFilterBy.ALL,
        pageNo: 0,
        pageSize: 10,
        userId: parseInt(localStorage.getItem('userId')),
      },
      viewFileDetails: {
        fileId: null,
        isImageFile: false,
        isPdfFile: false,
        isTextFile: false,
        isWebSupportedFile: false,
        fileExtension: '',
      },
      lastPage:false,
      firstPage:false,
      isMessageLoading: true,
      checkForUnreadMessage:true,
      scrollIdentifer: new Date(),
      totalMessages: 0,
      currentFolderId: 0,
      messageId: 0,
      messageData: '',
      displayImageFile: ['png', 'jpg', 'ico'],
      displayPdfFile: ['pdf', 'jar'],
      displayTextFile: ['txt', 'html', 'csv', 'xml', 'json'],
      showFileChatModal: false,
      showReadFileModal: false,
      showDeleteChatModal: false,
      showEditChatModal: false,
      type: '',
      isDeletable:'',
      isEditable:'',
      fileId: '',
      msgData: [],
      chatInputMessage: '',
      userName: '',

    }
  },
  beforeMount() {
    // this.intervalId = setInterval(() => {
    //   fetchMessage({
    //     ...this.requestData,
    //     pageNo: 0,
    //   }).then((response) => {
    //     if (
    //         response.data.data &&
    //         response.data.data.totalElements !== this.totalMessages
    //     ) {
    //       this.requestData.pageNo = 0;
    //       this.lastPage = response.data.data.last;
    //       this.firstPage = response.data.data.first;
    //       this.msgData = response.data.data.content.reverse();
    //       this.scrollIdentifer = new Date();
    //       this.totalMessages = response.data.data.totalElements;
    //       const chatApp = document.getElementById("chat-box");
    //       this.setLoader();
    //       this.$nextTick(() => chatApp.scrollTo(0, chatApp.scrollHeight));
    //     }
    //   });
    // }, 30000);
  },


  methods: {
    $fn() {
      return $fn
    },
    setLoader() {
      if (this.lastPage && this.firstPage) {
        this.isMessageLoading = false;
      } else {
        this.isMessageLoading = true;
      }
    },
    loadMoreChatMessage($state) {
      if (!this.lastPage) {
          this.loadChatMessages($state);
        }
    },
    loadChatMessages($state) {
      fetchMessage(this.requestData)
          .then((response) => {
            if (response.data) {
              this.lastPage = response.data.data.last;
              this.requestData.pageNo += 1;
              this.totalMessages = response.data.data.totalElements;
              this.msgData.unshift(...response.data.data.content.reverse());
              const chatApp = document.getElementById("chat-box");
              this.setLoader();
              this.lastPage ? $state.complete() : $state.loaded();
              if (this.isUnreadMessageAvailable) {
                this.$nextTick(() => chatApp.scrollTo(0, 0));
                this.isUnreadMessageAvailable = false;
              } else if (this.lastPage && response.data.data.first) {
                this.$nextTick(() => chatApp.scrollTo(0, chatApp.scrollHeight));
              }
            }
          })
          .catch((e) => {
            console.log(e)
          });
    },
    toggleShowFileChatModal() {
      this.showFileChatModal = !this.showFileChatModal
    },
    toggleShowEditChatModal() {
      this.showEditChatModal = !this.showEditChatModal
    },
    openChatDeleteContentModal(messId) {
      this.showModal = true
      this.messageId = messId
    },
    openChatEditContentModal(data) {
      this.showEditChatModal = true
      this.messageId = data.id
      this.messageData = data.message
    },
    toggleShowReadFileModal() {
      this.showReadFileModal = false,
          this.viewFileDetails.isTextFile = false,
          this.viewFileDetails.isPdfFile = false,
          this.viewFileDetails.isImageFile = false,
          this.viewFileDetails.isWebSupportedFile = false
    },

    getSendMessage() {
      const requestData = {
        message: this.chatInputMessage,
      }
      sendMessage(requestData)
          .then(response => {
            this.chatInputMessage = ''
            this.getAllMessage()
            this.$toast.success('Send Message Successfully')

          })
          .catch(e => {
            console.log(e)
          })
    },
    getAllMessage() {
      this.requestData.pageSize = 10;
      this.requestData.pageNo = 0;
      fetchMessage(this.requestData)
          .then(response => {
            if (response.data) {
              // this.msgData = response.data.data.content.reverse();
              this.lastPage = response.data.data.last;
              this.firstPage = response.data.data.first;
              if (!this.lastPage) {
                this.requestData.pageNo += 1;
              }
              this.msgData = response.data.data.content.reverse();
              this.scrollIdentifer = new Date();
              this.totalMessages = response.data.data.totalElements;
              const chatApp = document.getElementById("chat-box");
              this.setLoader();
              this.$nextTick(() => chatApp.scrollTo(0, chatApp.scrollHeight));
            }
          })
          .catch((e) => {
            console.log(e)
          });
    },

    filtersAll(value) {
      this.requestData.filterBy = value
      this.requestData.pageNo=0
      this.getAllMessage()
    },
    downloadFileData(id) {
      downloadFile({ id })
          .then(response => {
            if (response?.data) {

              window.open(response.data.data)
              this.$toast.success('download File Successfully')
            }
          })
          .catch(e => {
            console.log(e)
          })
    },
    deleteChat() {
      deleteMessage(this.messageId)
          .then((response) => {
            if (response) {
              this.$toast.success('Message Deleted Successfully')
              this.showModal = false
              this.getAllMessage()

            }
          })
          .catch(e => {
            console.log(e)
          })
    },

    openFileContentModal(fileDetails) {
      this.viewFileDetails.fileId = fileDetails.fileId
      this.viewFileDetails.fileName = fileDetails.message
      const fileExtension = extractFileFormat(fileDetails.message)
      if (this.displayImageFile.includes(fileExtension)) {
        this.viewFileDetails.isImageFile = true
        this.viewFileDetails.fileExtension = fileExtension
        this.showReadFileModal = true
      } else if (this.displayPdfFile.includes(fileExtension)) {
        this.viewFileDetails.isPdfFile = true
        this.viewFileDetails.fileExtension = fileExtension
        this.showReadFileModal = true
      } else if (this.displayTextFile.includes(fileExtension)) {
        this.viewFileDetails.isTextFile = true
        this.viewFileDetails.fileExtensions = fileExtension
        this.showReadFileModal = true
      } else if (this.displayTextFile.includes(fileExtension)) {
        this.viewFileDetails.isWebSupportedFile = true
        this.viewFileDetails.fileExtension = fileExtension
        this.showReadFileModal = true
      } else {
        this.$toast.error('file not supported')
      }

    },
    closeModal() {
      this.showModal = false
    },
  },

}
</script>
<style lang="scss">
@import "~@core/scss/base/pages/app-chat.scss";
@import "~@core/scss/base/pages/app-chat-list.scss";
.scroll-y {
  overflow-y: scroll !important;
}
.infinite-status-prompt {
  padding: 10px 0px;
}
.height{
  height: 550px !important;
}
</style>
