<!--<template>-->
<!--  <div class="chats">-->
<!--    <div-->
<!--        v-for="(message, index) in chatData"-->
<!--        :key="message.id + String(index)"-->
<!--        class="chat"-->
<!--        :class="{-->
<!--        'chat-left': message.userId !== loginUserData.id,-->
<!--      }"-->
<!--    >-->
<!--      <div class="chat-avatar">-->
<!--        <b-avatar-->
<!--            size="36"-->
<!--            class="avatar-border-2 box-shadow-1"-->
<!--            variant="light-primary"-->
<!--            :text="$fn.getAvatarText(message.userName)"-->
<!--        />-->
<!--      </div>-->
<!--      <div class="chat-body">-->
<!--        <div-->
<!--            class="chat-content"-->
<!--            :class="{-->
<!--            'normal-user-color': !message.isSystemUser,-->
<!--            'system-user-color': message.isSystemUser,-->
<!--          }"-->
<!--        >-->
<!--          <div class="message-header">-->
<!--            <div class="message-user d-flex">-->
<!--              <span>-->
<!--                {{ message.userName }}-->
<!--              </span>-->
<!--              <div class="ml-1" v-if="message.isDeletable">-->
<!--                <feather-icon-->
<!--                    v-if="!message.fileId"-->
<!--                    icon="Edit2Icon"-->
<!--                    size="15"-->
<!--                    class="align-middle cursor-pointer"-->
<!--                    :class="{-->
<!--                    'text-white': message.isSystemUser,-->
<!--                  }"-->
<!--                    @click="openEditMessageModal(message)"-->
<!--                />-->
<!--                <feather-icon-->
<!--                    icon="TrashIcon"-->
<!--                    size="15"-->
<!--                    class="align-middle cursor-pointer"-->
<!--                    :class="{-->
<!--                    'ml-1': !message.fileId,-->
<!--                    'text-white': message.isSystemUser,-->
<!--                  }"-->
<!--                    @click="openDeleteMessageModal(message.id)"-->
<!--                />-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="message-time d-flex">-->
<!--              <span>-->
<!--                {{ $fn.dateToMoment(message.createdAt, "MM/DD/YY h:mm A") }}-->
<!--              </span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div-->
<!--              v-if="message.type === getMessageTypeEnums.MESSAGE"-->
<!--              class="d-flex justify-content-between"-->
<!--          >-->
<!--            <p>-->
<!--              {{ message.message }}-->
<!--            </p>-->
<!--          </div>-->
<!--          <div v-else>-->
<!--            <div class="d-flex justify-content-between">-->
<!--              <div class="font-weight-bold">{{ message.message }}</div>-->
<!--              <div>-->
<!--                <feather-icon-->
<!--                    v-if="-->
<!--                    $fn.checkSupportedFileFormat(-->
<!--                      $fn.extractFileFormat(message.message)-->
<!--                    )-->
<!--                  "-->
<!--                    class="cursor-pointer mx-1"-->
<!--                    icon="EyeIcon"-->
<!--                    size="15"-->
<!--                    v-b-tooltip.hover="'View Docs'"-->
<!--                    @click="openFileContentModal(message)"-->
<!--                />-->
<!--                <feather-icon-->
<!--                    class="cursor-pointer"-->
<!--                    :class="-->
<!--                    !$fn.checkSupportedFileFormat(-->
<!--                      $fn.extractFileFormat(message.message)-->
<!--                    )-->
<!--                      ? 'mx-1'-->
<!--                      : ''-->
<!--                  "-->
<!--                    icon="DownloadIcon"-->
<!--                    size="15"-->
<!--                    v-b-tooltip.hover="'Download Docs'"-->
<!--                    @click="getDownloadFiles(message.fileId)"-->
<!--                />-->
<!--              </div>-->
<!--            </div>-->
<!--            <div>-->
<!--              <span class="font-weight-bold">Category :</span>-->
<!--              {{ message.category[0] }}-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    &lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; Modals -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--    &lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; View/Read File Modal -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--    <fp-read-file-content-modal-->
<!--        v-if="showReadFileContentModal"-->
<!--        :show-read-file-content-modal="showReadFileContentModal"-->
<!--        :view-file-details="viewFileDetails"-->
<!--        @close-modal="closeFileContentModal"-->
<!--    />-->
<!--    &lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; Edit Message Modal -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--    <fp-edit-message-modal-->
<!--        v-if="showEditMessageModal"-->
<!--        :show-edit-message-modal="showEditMessageModal"-->
<!--        :edit-message-id="editMessageId"-->
<!--        :edit-message="editMessage"-->
<!--        @close-modal="closeEditMessageModal"-->
<!--        @update-message-details="updateMessageDetails"-->
<!--    />-->
<!--    &lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; Delete Subscription Items -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--    <b-modal-->
<!--        v-model="showDeleteMessageModal"-->
<!--        centered-->
<!--        title="Delete Message"-->
<!--        @hide="closeDeleteMessageModal()"-->
<!--    >-->
<!--      <div>Are you sure you want to delete?</div>-->
<!--      <template #modal-footer>-->
<!--        <div class="row no-gutters">-->
<!--          <b-button-->
<!--              variant="outline-secondary"-->
<!--              class="mr-1"-->
<!--              @click="closeDeleteMessageModal"-->
<!--          >-->
<!--            No-->
<!--          </b-button>-->
<!--          <b-button-->
<!--              variant="primary"-->
<!--              @click="deleteMessage"-->
<!--              :disabled="disableButton"-->
<!--          >-->
<!--            <b-spinner v-if="disableButton" variant="light" small />-->
<!--            Yes-->
<!--          </b-button>-->
<!--        </div>-->
<!--      </template>-->
<!--    </b-modal>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import { computed } from "@vue/composition-api";-->
<!--import store from "@/store";-->
<!--import { getMessageTypeEnums } from "@/enums/message.enums";-->
<!--import { getDownloadFileById } from "@/services";-->
<!--import { extractFileFormat, formatError } from "@/helpers";-->
<!--import FpReadFileContentModal from "@/components/message/modal/ReadFileContent.vue";-->
<!--import FpEditMessageModal from "@/components/message/modal/EditMessageModal.vue";-->
<!--import { deleteMessages } from "@/services/message";-->
<!--export default {-->
<!--  computed: {-->
<!--    getMessageTypeEnums() {-->
<!--      return getMessageTypeEnums;-->
<!--    },-->
<!--  },-->
<!--  props: {-->
<!--    chatData: {-->
<!--      type: Array,-->
<!--      required: true,-->
<!--    },-->
<!--  },-->
<!--  components: {-->
<!--    FpReadFileContentModal,-->
<!--    FpEditMessageModal,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      loginUserData: store.getters["app/userData"],-->
<!--      $refs: {-->
<!--        FpReadFileContentModal,-->
<!--      },-->
<!--      showReadFileContentModal: false,-->
<!--      // For Edit Message-->
<!--      showEditMessageModal: false,-->
<!--      editMessageId: null,-->
<!--      editMessage: null,-->
<!--      // For Delete Message-->
<!--      disableButton: false,-->
<!--      deleteMessageId: null,-->
<!--      showDeleteMessageModal: false,-->
<!--      isLoading: true,-->
<!--      // For All Type of File View-->
<!--      displayImageData: ["jpeg", "jpg", "png", "gif", "ico"],-->
<!--      displayPdfData: ["pdf"],-->
<!--      textBasedFileType: [-->
<!--        "json",-->
<!--        "html",-->
<!--        "xml",-->
<!--        "csv",-->
<!--        "js",-->
<!--        "java",-->
<!--        "ts",-->
<!--        "py",-->
<!--        "txt",-->
<!--        "md",-->
<!--      ],-->
<!--      viewFileDetails: {-->
<!--        isFileImage: false,-->
<!--        isFilePdf: false,-->
<!--        isWebSupportedFile: false,-->
<!--        isFileText: false,-->
<!--        fileId: null,-->
<!--        fileExtensions: "",-->
<!--        isVideoFile: false,-->
<!--      },-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    // ********** Download Files API (getFileUrl) **********-->
<!--    getDownloadFiles(id) {-->
<!--      getDownloadFileById({ id })-->
<!--          .then((response) => {-->
<!--            window.open(response.data);-->
<!--          })-->
<!--          .catch((e) => {-->
<!--            this.$toast.error(formatError(e));-->
<!--          });-->
<!--    },-->
<!--    // Function for View Files in Modal-->
<!--    openFileContentModal(fileDetails) {-->
<!--      const fileExtension = extractFileFormat(fileDetails.message);-->
<!--      this.viewFileDetails.fileId = fileDetails.fileId;-->
<!--      if (this.displayImageData.includes(fileExtension)) {-->
<!--        this.viewFileDetails.isFileImage = true;-->
<!--        this.viewFileDetails.fileExtensions = fileExtension;-->
<!--      } else if (this.displayPdfData.includes(fileExtension)) {-->
<!--        this.viewFileDetails.isFilePdf = true;-->
<!--        this.viewFileDetails.fileExtensions = fileExtension;-->
<!--      } else if (this.textBasedFileType.includes(fileExtension)) {-->
<!--        this.viewFileDetails.isWebSupportedFile = true;-->
<!--        this.viewFileDetails.fileExtensions = fileExtension;-->
<!--      } else {-->
<!--        this.showReadFileContentModal = false;-->
<!--      }-->
<!--      this.showReadFileContentModal = true;-->
<!--    },-->
<!--    closeFileContentModal() {-->
<!--      this.showReadFileContentModal = false;-->
<!--      this.viewFileDetails = {-->
<!--        isFileImage: false,-->
<!--        isFilePdf: false,-->
<!--        isWebSupportedFile: false,-->
<!--        isFileText: false,-->
<!--        fileId: null,-->
<!--        fileExtensions: "",-->
<!--        isVideoFile: false,-->
<!--      };-->
<!--    },-->
<!--    // Edit Messages Modal Open/Close-->
<!--    openEditMessageModal(msg) {-->
<!--      this.editMessageId = msg.id;-->
<!--      this.editMessage = msg.message;-->
<!--      this.showEditMessageModal = true;-->
<!--    },-->
<!--    closeEditMessageModal() {-->
<!--      this.editMessageId = undefined;-->
<!--      this.editMessage = "";-->
<!--      this.showEditMessageModal = false;-->
<!--    },-->
<!--    // ********** Delete Message API (message/{id}) **********-->
<!--    deleteMessage() {-->
<!--      deleteMessages(this.deleteMessageId)-->
<!--          .then((response) => {-->
<!--            this.closeDeleteMessageModal();-->
<!--            this.updateMessageDetails();-->
<!--            this.$toast.success(response.message);-->
<!--          })-->
<!--          .catch((e) => {-->
<!--            this.$toast.error(formatError(e));-->
<!--          });-->
<!--    },-->
<!--    // Delete Messages Modal Open/Close-->
<!--    openDeleteMessageModal(msgId) {-->
<!--      this.deleteMessageId = msgId;-->
<!--      this.showDeleteMessageModal = true;-->
<!--    },-->
<!--    closeDeleteMessageModal() {-->
<!--      this.deleteMessageId = null;-->
<!--      this.showDeleteMessageModal = false;-->
<!--    },-->
<!--    // Reload Message Details After Message Delete-->
<!--    updateMessageDetails() {-->
<!--      this.$emit("update-message-details");-->
<!--    },-->
<!--  },-->
<!--  setup(props) {-->
<!--    const formattedChatData = computed(() => {-->
<!--      const contact = {-->
<!--        id: props.chatData.contact.id,-->
<!--        avatar: props.chatData.contact.avatar,-->
<!--      };-->
<!--      let chatLog = [];-->
<!--      if (props.chatData.chat) {-->
<!--        chatLog = props.chatData.chat.chat;-->
<!--      }-->
<!--      const formattedChatLog = [];-->
<!--      let chatMessageSenderId = chatLog[0] ? chatLog[0].senderId : undefined;-->
<!--      let msgGroup = {-->
<!--        sender: chatMessageSenderId,-->
<!--        messages: [],-->
<!--      };-->
<!--      chatLog.forEach((msg, index) => {-->
<!--        if (chatMessageSenderId === msg.senderId) {-->
<!--          msgGroup.messages.push({-->
<!--            msg: msg.message,-->
<!--            time: msg.time,-->
<!--          });-->
<!--        } else {-->
<!--          chatMessageSenderId = msg.senderId;-->
<!--          formattedChatLog.push(msgGroup);-->
<!--          msgGroup = {-->
<!--            senderId: msg.senderId,-->
<!--            messages: [-->
<!--              {-->
<!--                msg: msg.message,-->
<!--                time: msg.time,-->
<!--              },-->
<!--            ],-->
<!--          };-->
<!--        }-->
<!--        if (index === chatLog.length - 1) formattedChatLog.push(msgGroup);-->
<!--      });-->
<!--      return {-->
<!--        formattedChatLog,-->
<!--        contact,-->
<!--        profileUserAvatar: props.profileUserAvatar,-->
<!--      };-->
<!--    });-->
<!--    return {-->
<!--      formattedChatData,-->
<!--    };-->
<!--  },-->
<!--};-->
<!--</script>-->
<!--<style scoped lang="scss">-->
<!--.message-header {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  margin-bottom: 4px;-->
<!--}-->
<!--.message-user {-->
<!--  font-size: 15px;-->
<!--  font-weight: bold;-->
<!--  margin-right: 2em;-->
<!--}-->
<!--.message-time {-->
<!--  font-size: 12px;-->
<!--}-->
<!--.message-file {-->
<!--  box-shadow: inset 1px 1px 4px #b39c9c;-->
<!--  border-radius: 6px;-->
<!--  padding: 12px;-->
<!--}-->
<!--.normal-user-color {-->
<!--  background-image: linear-gradient(0deg, #ffffff, #ffffff) !important;-->
<!--  color: #6e6b7b !important;-->
<!--}-->
<!--.system-user-color {-->
<!--  background-image: linear-gradient(80deg, #7367f0, #9e95f5) !important;-->
<!--  color: #ffffff !important;-->
<!--}-->
<!--</style>-->
