export const paths = {
  home: '/',

  'auth.custom.sign-in': '/auth/custom/sign-in',
  'auth.custom.sign-up': '/auth/custom/sign-up',
  'auth.custom.reset-password': '/auth/custom/reset-password',

  'auth.supabase.callback': '/auth/supabase/callback',
  'auth.supabase.sign-in': '/auth/supabase/sign-in',
  'auth.supabase.sign-up': '/auth/supabase/sign-up',
  'auth.supabase.sign-up-confirm': '/auth/supabase/sign-up-confirm',
  'auth.supabase.reset-password': '/auth/supabase/reset-password',
  'auth.supabase.recover-link-sent': '/auth/supabase/recover-link-sent',
  'auth.supabase.update-password': '/auth/supabase/update-password',

  dashboard: '/dashboard',

  'dashboard.blank': '/dashboard/blank',
  'dashboard.analytics': '/dashboard/analytics',
  'dashboard.crypto': '/dashboard/crypto',
  'dashboard.logistics': '/dashboard/logistics',
  'dashboard.smart-home': '/dashboard/smart-home',
  'dashboard.devices': '/dashboard/devices',
  'dashboard.settings': '/dashboard/settings',
  'dashboard.customers': '/dashboard/customers',
  'dashboard.customers.create': '/dashboard/customers/create',
  'dashboard.customers.details': (customerId) => `/dashboard/customers/${customerId}`,
  'dashbaord.tennats': '/dashbaord/tennats',
  'dashbaord.users': '/dashbaord/users',
  'dashbaord.devices': '/dashbaord/devices',
  'dashbaord.permissions': '/dashbaord/permissions',
  'dashboard.invoices': '/dashboard/invoices',
  'dashboard.invoices.create': '/dashboard/invoices/create',
  'dashboard.invoices.details': (invoiceId) => `/dashboard/invoices/${invoiceId}`,

  'dashboard.orders': '/dashboard/orders',
  'dashboard.orders.create': '/dashboard/orders/create',
  'dashboard.orders.create.modal': '/dashboard/orders/create/modal',
  'dashboard.orders.details': (orderId) => `/dashboard/orders/${orderId}`,

  'dashboard.products': '/dashboard/products',
  'dashboard.products.create': '/dashboard/products/create',
  'dashboard.products.details': (productId) => `/dashboard/products/${productId}`,

  'dashboard.team': '/dashboard/team',
  'dashboard.team.members': '/dashboard/team/members',
  'dashboard.team.members.invite': '/dashboard/team/members/invite',
  'dashboard.team.members.details': (memberId) => `/dashboard/team/members/${memberId}`,
  'dashboard.team.permissions': '/dashboard/team/permissions',

  'dashboard.tasks': '/dashboard/tasks',

  'dashboard.account': '/dashboard/account',
  'dashboard.account.billing': '/dashboard/account/billing',
  'dashboard.account.security': '/dashboard/account/security',
};
