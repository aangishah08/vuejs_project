<template>

  <div>
    <show-breadcrumb
        :current-folder-id="currentFolderId"
        :breadcrumb-details="breadcrumbDetails"
        :is-root-dir="isRootDir"
        @fetch-documents="getAllList"
        @remove-breadcrumb-after-id="removeBreadcrumbsAfterFolderId"
    />
    <!-- Table Container Card-->
    <b-card
        no-body
        class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
              cols="12"
              md="6"
              class="d-flex align-items-center justify-content-start mb-1 mb-md-0 cursor-pointer"
          >
            <label>Show</label>
            <v-select
                v-model="requestData.pageSize"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="perPageOptions"
                :clearable="false"
                class="per-page-selector d-inline-block mx-50 cursor-pointer"
                @input="changePerPage"
            />
          </b-col>

          <!-- Search -->
          <b-col
              cols="12"
              md="6"
          >

            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                  v-model="requestData.searchValue"
                  class="mr-1"
                  placeholder="Search..."
                  @input="getSearch"
              />
              <feather-icon
                  icon="UploadIcon"
                  @click="toggleShowFileModal"
                  class="mr-1 cursor pointer"
                  size="30"

              />
              <feather-icon
                  icon="FolderIcon"
                  @click="toggleShowFolderModal"
                  class="cursor pointer"
                  size="30"
              />
            </div>

          </b-col>
        </b-row>
      </div>

      <b-table
          ref="refUserListTable"
          class="position-relative"
          :items="tableData"
          responsive
          :fields="tableColumns"

          primary-key="id"
          show-empty
          no-local-sorting
          empty-text="No matching records found"
      >

        <!-- Column: User -->
        <template #cell(name)="data">
          <div
              class="cursor-pointer"
              @click="getFolderData(data.item)"
          >
            {{ data.item.name }}
          </div>

          <!--          <div v-if="data.item.docType.includes('file')"-->
          <!--               @click="openFileContentModal(data.item)"-->
          <!--               class="cursor-pointer"-->
          <!--          >-->
          <!--            {{ data.item.name }}-->
          <!--          </div>-->
        </template>
        <template #cell(userName)="data">
          {{ data.item.userName }}
        </template>
        <template #cell(ACTION)="data">
          <b-dropdown
              v-if="data.item.userName"
              variant="link"
          >
            <template #button-content>
              <feather-icon

                  icon="MoreVerticalIcon"
                  size="16"
                  class="align-middle text-body"
              />
            </template>
            <b-dropdown-item v-if="data.item.userId=== requestData.userId">
              <feather-icon icon="EditIcon"
                            class="cursor-pointer"
                            v-if="data.item.docType.includes('file')"
                            @click="openEditFileModal(data.item.id,data.item.docType)"
                            size="16"
              />
              <span
                  v-if="data.item.docType.includes('file')"
                  @click="openEditFileModal(data.item.id,data.item.docType)"
                  class="align-middle ml-50"
              >Edit File</span>

              <feather-icon icon="EditIcon"
                            class=" cursor pointer"
                            v-if="data.item.docType.includes('folder')"
                            @click="openEditFolderModal(data.item.id,data.item.docType)"
                            size="16"
              />
              <span
                  v-if="data.item.docType.includes('folder')"
                  @click="openEditFolderModal(data.item.id,data.item.docType)"
                  class="align-middle ml-50"
              >Edit Folder</span>
            </b-dropdown-item>
            <b-dropdown-item v-if="data.item.userId=== requestData.userId">
              <feather-icon icon="TrashIcon"
                            v-if="data.item.docType.includes('file')"
                            @click="openDeleteFileModal(data.item.id,data.item.docType)"
                            class="cursor-pointer"
                            size="16"
              />
              <span
                  v-if="data.item.docType.includes('file')"
                  @click="openDeleteFileModal(data.item.id,data.item.docType)"
                  class="align-middle ml-50"
              >Delete</span>
              <feather-icon icon="TrashIcon"
                            v-if="data.item.docType.includes('folder')"
                            @click="openDeleteFolderModal(data.item.id,data.item.docType)"
                            class=" cursor-pointer"
                            size="16"
              />
              <span
                  v-if="data.item.docType.includes('folder')"
                  @click="openDeleteFolderModal(data.item.id,data.item.docType)"
                  class="align-middle ml-50"
              >Delete</span>
            </b-dropdown-item>
            <b-dropdown-item v-if="data.item.docType.includes('file')">
              <feather-icon icon="DownloadIcon"

                            @click="downloadFileData(data.item.id)"
                            class="cursor-pointer"
                            size="16"
              />
              <span
                  v-if="data.item.docType.includes('file')"
                  @click="downloadFileData(data.item.id)"
                  class="align-middle ml-50"
              >Download</span>

            </b-dropdown-item>

            <b-dropdown-item v-if="data.item.docType.includes('file')">

              <feather-icon icon="SendIcon"

                            @click="getLink(data.item.id)"
                            class="cursor-pointer"
                            size="16"
              />
              <span v-if="data.item.docType.includes('file')"
                    @click="getLink(data.item.id)"
                    class="align-middle ml-50"
              >Share</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span
                class="text-muted"
            >Showing {{ totalRecords === 0 ? 0 : pageStart }} to
              {{ pageEnd }}
              of {{ totalRecords }} Users
            </span>
          </b-col>

          <!-- Pagination -->
          <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
                v-model="requestData.pageNo"
                :total-rows="totalRecords"
                :per-page="requestData.pageSize"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
                @input="nextPage"
            >
              <template #prev-text>
                <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>

    <show-edit-modal
        v-if="showEditModal"
        :show-edit-modal="showEditModal"
        :file-details="fileDetails"
        @close-modal="toggleShowEditModal"
        @update-modal="getAllList"
    />

    <show-edit-folder-modal
        v-if="showEditFolderModal"
        :show-edit-folder-modal="showEditFolderModal"
        :folder-details="folderDetails"
        :current-folder-id="currentFolderId"
        @update-folder-modal="getAllList"
        @close-modal="toggleShowEditFolderModal"
    />


    <show-delete-modal
        v-if="showDeleteModal"
        :show-delete-modal="showDeleteModal"
        :file-details="fileDetails"
        @delete-modal="getAllList"
        @close-modal="toggleShowDeleteModal"
    />
    <show-delete-folder-modal
        v-if="showDeleteFolderModal"
        :show-delete-folder-modal="showDeleteFolderModal"
        :folder-details="folderDetails"
        @delete-folder-modal="getAllList"
        @close-modal="toggleShowDeleteFolderModal"
    />

    <show-folder-modal
        v-if="showFolderModal"
        :show-folder-modal="showFolderModal"
        :current-folder-id="currentFolderId"
        @insert-folder-modal="getAllList"
        @close-modal="toggleShowFolderModal"
    />

    <show-file-modal
        v-if="showFileModal"
        :show-file-modal="showFileModal"
        :current-folder-id="currentFolderId"
        @insert-file-modal="getAllList"
        @close-modal="toggleShowFileModal"
    />

    <show-get-share-link-modal
        v-if="showGetShareLinkModal"
        :show-get-share-link-modal="showGetShareLinkModal"
        :share-link-details="shareLinkDetails"
        :file-id="fileId"
        @close-modal="toggleShowGetShareLinkModal"
    />
    <show-read-file-modal
        v-if="showReadFileModal"
        :show-read-file-modal="showReadFileModal"
        :view-file-details="viewFileDetails"
        :file-id="fileId"
        @close-modal="toggleShowReadFileModal"
    />
  </div>

</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BTable,
  BPagination,
  BButton,
  BModal,
  BBreadcrumb,
  BBreadcrumbItem,
  BDropdown,
  BDropdownItem
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import {
  getAllDocument,
  getFileById,
  getFolderById,
  downloadFile,
  getShareLink,

} from '@/views/pages/authentication/services/login'
import showEditModal from '@/views/apps/document/editFileModal.vue'
import showDeleteModal from '@/views/apps/document/deleteFileModal.vue'
import showFolderModal from '@/views/apps/document/folderInsertModal.vue'
import showFileModal from '@/views/apps/document/fileInsertModal.vue'
import showEditFolderModal from '@/views/apps/document/editFolderModal.vue'
import showDeleteFolderModal from '@/views/apps/document/deleteFolderModal.vue'
import showGetShareLinkModal from '@/views/apps/document/getShareLinkModal.vue'
import showReadFileModal from '@/views/apps/document/readFileModal.vue'
import { extractFileFormat } from '@/helper/vue-helper'
import showBreadcrumb from '@/views/apps/document/Breadcrumb.vue'


export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BPagination,
    BButton,
    BModal,
    BBreadcrumb,
    BBreadcrumbItem,
    BDropdown,
    BDropdownItem,
    showBreadcrumb,
    showEditModal,
    showDeleteModal,
    showFolderModal,
    showFileModal,
    showEditFolderModal,
    showDeleteFolderModal,
    showGetShareLinkModal,
    showReadFileModal,

    vSelect,
  },
  data() {

    return {
      $refs: {
        showEditModal,
        showDeleteModal,
        showFolderModal,
        showFileModal,
        showEditFolderModal,
        showDeleteFolderModal,
        showGetShareLinkModal,
        showReadFileModal,
        showBreadcrumb,
      },
      requestData: {
        pageNo: 1,
        pageSize: 10,
        sortAs: 'ASC',
        searchValue: '',
        id: 0,
        userId: parseInt(localStorage.getItem('userId'))
      },
      displayImageFile: ['png', 'jpg', 'ico'],
      displayPdfFile: ['pdf'],
      displayTextFile: ['txt', 'html', 'csv', 'xml', 'json'],
      breadcrumbDetails: [],
      isRootDir: true,
      showEditModal: false,
      showDeleteModal: false,
      showFolderModal: false,
      showFileModal: false,
      showEditFolderModal: false,
      showDeleteFolderModal: false,
      showGetShareLinkModal: false,
      showReadFileModal: false,
      fileDetails: null,
      folderDetails: null,
      shareLinkDetails: null,
      viewFileDetails: {
        fileId: null,
        isImageFile: false,
        isPdfFile: false,
        isTextFile: false,
        isWebSupportedFile: false,
        fileExtension: '',
      },
      fileId: 0,
      docType: '',
      name: '',
      folderId: 0,
      currentFolderId: 0,
      folderName: '',
      fileName: '',
      shareableLink: '',
      tableData: [],
      totalRecords: 0,
      perPageOptions: [10,20,30,50,],

      tableColumns: [
        {
          key: 'name',
          label: 'Name'
        },
        {
          key: 'userName',
          label: 'UserName'
        },
        {
          key: 'ACTION',
          label: 'action'
        },
      ],

    }
  },
  computed: {
    pageStart() {
      return this.requestData.pageSize * (this.requestData.pageNo - 1) + 1
    },
    pageEnd() {
      return this.totalRecords
      > this.requestData.pageSize * this.requestData.pageNo
          ? this.requestData.pageSize * this.requestData.pageNo
          : this.totalRecords
    },
  },
  mounted() {
    this.getAllList()
  },
  methods: {
    getAllList(parentFolderId = 0, clearBreadcrumb = false) {
      this.isRootDir = parentFolderId === 0 ? true : false
      getAllDocument({
        ...this.requestData,
        pageNo: this.requestData.pageNo - 1,
        id: parentFolderId,
      })
          .then(response => {
            if (response?.data) {
              console.log(' All data', response.data.data.data.content)
              this.tableData = response.data.data.data.content
              this.totalRecords = response.data.data.data.totalElements
              this.currentFolderId = response.data.data.currentFolderId
              this.folderName = response.data.data.folderName
              if (clearBreadcrumb) {
                this.breadcrumbDetails = []
                this.isRootDir = true
              }
            }
          })
          .catch(e => {
            console.log(e)
          })
    },
    getFolderData(data) {
      if (data.docType.includes('folder')) {
        this.isRootDir = false
        getAllDocument({
          ...this.requestData,
          id: data.id,
          pageNo: this.requestData.pageNo - 1
        })
            .then(response => {
              if (response?.data) {
                if (!this.checkExistingFolderBreadcrumbs(data.id)) {
                  this.updateBreadcrumbActiveStatus(false)
                  this.breadcrumbDetails.push({
                    id: data.id,
                    folderName: data.name,
                    isActive: true,
                  })
                }
                this.tableData = response.data.data.data.content
                this.totalRecords = response.data.data.data.totalElements
                this.currentFolderId = response.data.data.currentFolderId
              }
            })
            .catch(e => {
              console.log(e)
            })
      } else {
        this.openFileContentModal(data)
      }
    },
    checkExistingFolderBreadcrumbs(folderId) {
      return this.breadcrumbDetails.find((folder) => folder.id === folderId)
    },
    updateBreadcrumbActiveStatus(status) {
      this.breadcrumbDetails.map((folder) => (folder.isActive = status))
    },
    removeBreadcrumbsAfterFolderId(folderId) {
      let index = this.breadcrumbDetails.findIndex(
          (data) => data.id === folderId
      )
      this.updateBreadcrumbActiveStatus(false)
      const breadcrumbList = this.breadcrumbDetails.slice(0, index + 1)
      if (breadcrumbList && breadcrumbList.length) {
        breadcrumbList[breadcrumbList.length - 1].isActive = true
        this.breadcrumbDetails = [...breadcrumbList]
      }
    },
    toggleShowEditModal() {
      this.showEditModal = false
    },
    toggleShowEditFolderModal() {
      this.showEditFolderModal = false
    },
    toggleShowDeleteModal() {
      this.showDeleteModal = !this.showDeleteModal
    },
    toggleShowDeleteFolderModal() {
      this.showDeleteFolderModal = !this.showDeleteFolderModal
    },
    toggleShowFolderModal() {
      this.showFolderModal = !this.showFolderModal
    },
    toggleShowFileModal() {
      this.showFileModal = !this.showFileModal
    },
    toggleShowGetShareLinkModal() {
      this.showGetShareLinkModal = !this.showGetShareLinkModal
    },
    toggleShowReadFileModal() {
      this.showReadFileModal = false,
          this.viewFileDetails.isTextFile = false,
          this.viewFileDetails.isPdfFile = false,
          this.viewFileDetails.isImageFile = false,
          this.viewFileDetails.isWebSupportedFile = false
    },
    openEditFileModal(id, docType) {
      if (docType === 'file') {
        console.log('before file data')
        getFileById({ id })
            .then(response => {
              console.log('after file data')
              if (response?.data) {
                this.fileDetails = response.data.data
                this.showEditModal = true
                console.log(this.fileDetails)
              }
            })
            .catch(e => {
              console.log(e)
            })
      }
    },
    openEditFolderModal(id, docType) {
      if (docType.includes('folder')) {
        getFolderById({ id })

            .then(response => {
              if (response?.data) {
                this.folderDetails = response.data.data
                this.showEditFolderModal = true
                console.log(this.folderDetails)
              }
            })
            .catch(e => {
              console.log(e)
            })
      }

    },
    openDeleteFileModal(id, docType) {
      if (docType === 'file') {
        getFileById({ id })
            .then(response => {
              console.log('after file data')
              if (response?.data) {
                this.fileDetails = response.data.data
                this.showDeleteModal = true
                console.log(this.fileDetails)
              }
            })
            .catch(e => {
              console.log(e)
            })

      }
    },
    openDeleteFolderModal(id, docType) {
      if (docType.includes('folder')) {
        getFolderById({ id })
            .then(response => {
              if (response?.data) {
                this.folderDetails = response.data.data
                this.showDeleteFolderModal = true
                console.log(this.folderDetails)
              }
            })
            .catch(e => {
              console.log(e)
            })

      }
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
    getLink(id) {
      getShareLink({ id })
          .then(response => {
            if (response?.data) {
              this.shareLinkDetails = response.data.data
              this.fileName = response.data.data.fileName
              this.fileId = id
              this.shareableLink = response.data.data.shareableLink
              this.showGetShareLinkModal = true

            }
          })
          .catch(e => {
            console.log(e)
          })

    },
    openFileContentModal(fileDetails) {
      this.viewFileDetails.fileId = fileDetails.id
      this.viewFileDetails.fileName = fileDetails.name
      const fileExtension = extractFileFormat(fileDetails.name)
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
    changePerPage(val) {
      this.requestData.pageSize = val
      this.requestData.pageNo = 1
      this.getAllList()
    },
    getSearch(val) {
      this.requestData.searchValue = val
      this.getAllList()
    },

    nextPage() {
      this.getAllList()
    },

  }
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
