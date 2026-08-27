/** Mock for the three HitPay proxy routes. Used only by `preview` + Playwright `screenshot`. */

export const previewRole = { id: 'role-preview', title: 'Owner' }

export const previewUser = {
  id: 'user-preview',
  email: 'preview@local',
  name: 'Preview User',
  role: previewRole,
}

export const previewMembers = [
  {
    id: previewUser.id,
    email: previewUser.email,
    name: previewUser.name,
    role_id: previewRole.id,
  },
]

export function hitpayPreviewPayload(pathname) {
  const match = pathname.match(/^\/api\/apps\/[^/]+\/(user\/info|roles|members)\/?$/)
  if (!match) return null
  if (match[1] === 'user/info') return previewUser
  if (match[1] === 'roles') return { roles: [previewRole] }
  return { members: previewMembers }
}
