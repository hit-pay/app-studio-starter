export const HITPAY_ROLE = {
  owner: 'Owner',
  admin: 'Admin',
  manager: 'Manager',
  cashier: 'Cashier',
} as const

export type HitPayRoleTitle = (typeof HITPAY_ROLE)[keyof typeof HITPAY_ROLE]

export const HITPAY_ALL_ROLES = [
  HITPAY_ROLE.owner,
  HITPAY_ROLE.admin,
  HITPAY_ROLE.manager,
  HITPAY_ROLE.cashier,
] as const

export const HITPAY_MANAGER_ROLES = [
  HITPAY_ROLE.owner,
  HITPAY_ROLE.admin,
  HITPAY_ROLE.manager,
] as const
