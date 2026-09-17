export const ROLE = {
  owner: 'Owner',
  admin: 'Admin',
  manager: 'Manager',
  cashier: 'Cashier',
} as const

export type RoleTitle = (typeof ROLE)[keyof typeof ROLE]

export const ALL_ROLES = [
  ROLE.owner,
  ROLE.admin,
  ROLE.manager,
  ROLE.cashier,
] as const

export const MANAGER_ROLES = [
  ROLE.owner,
  ROLE.admin,
  ROLE.manager,
] as const
