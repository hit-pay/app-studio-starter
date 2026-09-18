export const ROLES = ['Owner', 'Admin', 'Manager', 'Cashier'] as const

export type RoleTitle = (typeof ROLES)[number]
