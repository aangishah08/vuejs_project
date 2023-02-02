import store from '@/store'

export default [
  {
    title: 'Dashboard',
    icon: 'HomeIcon',
    route: 'dashboard-ecommerce',
    tagVariant: 'light-warning',
  },
  {
    title: 'Messages',
    icon: 'MessageSquareIcon',
    route: 'app-chat',
  },
  {
    title: 'Users',
    icon: 'UsersIcon',
    route: {name:'apps-users-list' ,params: { companyId:store.state.companyId }},
  },
  {
    title: 'Document',
    icon: 'FileTextIcon',
    route: 'apps-invoice-list',
  },

]

