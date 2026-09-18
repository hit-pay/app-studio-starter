export const PROVIDER = ['hitpay'] as const

export type Provider = (typeof PROVIDER)[number]
