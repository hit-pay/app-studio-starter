import { getCurrentUser, type CurrentUser } from './get-current-user'

export async function requireRoles(allowedTitles: readonly string[]): Promise<CurrentUser> {
  const user = await getCurrentUser()
  const title = user.role?.title
  if (!title || !allowedTitles.includes(title)) {
    throw new Error('You do not have permission to do this.')
  }
  return user
}
