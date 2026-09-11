export type WakeJson =
  | string
  | number
  | boolean
  | null
  | WakeJson[]
  | { [key: string]: WakeJson }

export type WakeReceiveStatus = 'received' | 'processed' | 'failed'
export type WakeDeliveryStatus = 'pending' | 'sent' | 'skipped' | 'failed'
export type WakeChannel = 'in_app' | 'discord' | 'resend' | 'twilio'

export type WakeEvent = {
  id: string
  key: string
  source: string
  frequency: string
  timezone: string
  triggered_at: string
  config: { [key: string]: WakeJson }
  data: WakeJson[]
  status: WakeReceiveStatus
  received_at: string
  processed_at: string | null
  error: string | null
}

export type WakeRow = {
  id: string
  event_id: string
  key: string
  source: string
  triggered_at: string
  payload: { [key: string]: WakeJson }
  status: WakeReceiveStatus
  delivery_status: WakeDeliveryStatus
  channel: string | null
  destination: string | null
  delivered_at: string | null
  delivery_error: string | null
}

export type WakeDestination = {
  id: string
  key: string
  channel: WakeChannel
  destination: string
  enabled: boolean
}
