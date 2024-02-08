export const paths = {
  home: '/',

  'auth.custom.sign-in': '/',
  'auth.custom.sign-up': '/sign-up',
  'auth.custom.reset-password': '/reset-password',
  'auth.custom.reset-password-sent': '/reset-password-sent',
  'auth.custom.update-password': '/update-password',

  dashboard: '/dashboard',

  'dashboard.overview': '/dashboard',
  'dashboard.analytics': '/analytics',
  'dashboard.crypto': '/crypto',
  'dashboard.logistics': '/logistics',
  'dashboard.smart-home': '/smart-home',
  'dashboard.devices': '/devices',
  'dashboard.settings': '/settings',
  'dashboard.customers': '/customers',
  'dashboard.customers.create': '/customers/create',
  'dashboard.customers.details': (customerId) => `/customers/${customerId}`,
  'dashbaord.tennats': '/dashbaord/tennats',
  'dashbaord.users': '/dashbaord/users',
  'dashbaord.devices': '/dashbaord/devices',
  'dashbaord.permissions': '/dashbaord/permissions',
  'dashboard.invoices': '/invoices',
  'dashboard.invoices.create': '/invoices/create',
  'dashboard.invoices.details': (invoiceId) => `/invoices/${invoiceId}`,

  'dashboard.orders': '/orders',
  'dashboard.orders.create': '/orders/create',
  'dashboard.orders.create.modal': '/orders/create/modal',
  'dashboard.orders.details': (orderId) => `/orders/${orderId}`,

  'dashboard.products': '/products',
  'dashboard.products.create': '/products/create',
  'dashboard.products.details': (productId) => `/products/${productId}`,

  'dashboard.team': '/team',
  'dashboard.team.members': '/team/members',
  'dashboard.team.members.invite': '/team/members/invite',
  'dashboard.team.members.details': (memberId) => `/team/members/${memberId}`,
  'dashboard.team.permissions': '/team/permissions',

  'dashboard.tasks': '/tasks',

  'dashboard.account': '/account',
  'dashboard.account.billing': '/account/billing',
  'dashboard.account.security': '/account/security',

  'dashboard.admin': '/admin',
  'dashboard.admin.devices': '/admin/devices',
  'dashboard.admin.permissions': '/admin/permissions',
  'dashboard.admin.tennats': '/admin/tennants',
  'dashboard.admin.user': '/admin/users',
  'dashboard.admin.create.device': '/admin/devices/create',
  'dashboard.admin.create.user': '/admin/users/create',
  'dashboard.admin.create.tenant': '/admin/tennants/create',
  'dashboard.admin.update.tenant': (tenantId)=>`/admin/tennants/update/${tenantId}`
};
