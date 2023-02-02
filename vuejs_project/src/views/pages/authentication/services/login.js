import axios from 'axios'
// API to LOGIN

export const login = requestData => axios({

  url: 'http://192.168.0.14:8083/auth/signIn',

  method: 'post',

  data: requestData,

})
export const getAllUsers = (requestData,companyId) => axios({

  url: `http://192.168.0.14:8083/company/users/${companyId}`,

  method: 'get',

  params: {
    companyId: requestData.companyId,
    companyName:requestData.companyName,
    pageNo: requestData.pageNo,
    sortAs: requestData.sortAs,
    sortBy: requestData.sortBy,
    pageSize: requestData.pageSize,
    searchValue: requestData.searchValue,

  },
  headers: {
    Authorization: localStorage.getItem('token'),

  },

})

export const getAllCompany = requestData => axios({

  url: 'http://192.168.0.14:8083/org/all',

  method: 'get',

  params: {
    companyId: requestData.companyId,
    companyName: requestData.companyName,

  },
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})
export const getAllDocument = requestData => axios({

  url: 'http://192.168.0.14:8083/doc-lib/getListing',

  method: 'get',

  params: {
     id: requestData.id,
    pageNo: requestData.pageNo,
    sortAs: requestData.sortAs,
    sortBy: requestData.sortBy,
    pageSize: requestData.pageSize,
    searchValue: requestData.searchValue,
  },
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})
export const getAllFolder = requestData => axios({

  url: 'http://192.168.0.14:8083/doc-lib/folders/all',

  method: 'get',

  params: {
    id:requestData.id,
    pageNo: requestData.pageNo,
    pageSize: requestData.pageSize,
    searchValue: requestData.searchValue,
  },
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})
export const getFileById = requestData => axios({

  url: 'http://192.168.0.14:8083/doc-lib/getFile',

  method: 'get',
  params:requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})
export const getFolderById = requestData => axios({

  url: 'http://192.168.0.14:8083/doc-lib/getFolder',

  method: 'get',
  params:requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})
export const updateFile = (requestData) => {
  return axios({
    url: 'http://192.168.0.14:8083/doc-lib/updateFile',
    method: 'post',
    data: requestData,
    headers: {

      Authorization: localStorage.getItem('token'),
    },
  });
};
export const deleteFile = (requestData) => {
  return axios({
    url: 'http://192.168.0.14:8083/doc-lib/deleteFile',
    method: 'put',
    data: requestData,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
export const updateFolder = (requestData) => {
  return axios({
    url: 'http://192.168.0.14:8083/doc-lib/updateFolder',
    method: 'post',
    data: requestData,
    headers: {

      Authorization: localStorage.getItem('token'),
    },
  });
};
export const deleteFolder = (requestData) => {
  return axios({
    url: 'http://192.168.0.14:8083/doc-lib/deleteFolder',
    method: 'put',
    data: requestData,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
export const insertFolder = (requestData) => {
  return axios({
    url: 'http://192.168.0.14:8083/doc-lib/insertFolder',
    method: 'post',
    data: requestData,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
export const insertFile = (requestData) => {
  return axios({
    url: 'http://192.168.0.14:8083/doc-lib/insertFile',
    method: 'post',
    data: requestData,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
export const downloadFile = (requestData) => {
  return axios({
    url: 'http://192.168.0.14:8083/doc-lib/getFileUrl',
    method: 'get',
    params: requestData,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
export const getShareLink = (requestData) => {
  return axios({
    url: 'http://192.168.0.14:8083/doc-lib/getShareLink',
    method: 'get',
    params: requestData,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
export const oneTimeUrlShare = (requestData) => {
  return axios({
    url: 'http://192.168.0.14:8083/doc-lib/oneTimeUrlShare',
    method: 'get',
    params: requestData,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
export const readFileContent = (fileId) => {
  return axios({
    url: `http://192.168.0.14:8083/doc-lib/readFileContent/${fileId}`,
    method: 'get',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
export const sendMessage = (requestData) => {
  return axios({
    url: 'http://192.168.0.14:8083/message/send',
    method: 'post',
    data: requestData,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
export const fetchMessage = (requestData) => {
  return axios({
    url: 'http://192.168.0.14:8083/message/getAll',
    method: 'get',
    params: {
      filterBy:requestData.filterBy,
      pageNo:requestData.pageNo,
      pageSize:requestData.pageSize
    },
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
export const deleteMessage = (messageId ) => {
  return axios({
    url: `http://192.168.0.14:8083/message/${messageId}`,
    method: 'delete',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
export const editMessage = (requestData,messageId ) => {
  return axios({
    url: `http://192.168.0.14:8083/message/${messageId}`,
    method: 'put',
    data:requestData,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
export const countMessage = (requestData) => {
  return axios({
    url: 'http://192.168.0.14:8083/message/count',
    method: 'get',
    data: requestData,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};

