/* eslint-disable @typescript-eslint/no-namespace */

export namespace Roles {
  export const Roles = {
    owner: 'owner',
    admin: 'admin',
    user: 'user',
    viewer: 'viewer',
  } as const

  export const Nejsem = {
    kokot: 'kokot',
    nejsem: 'nejsem',
  }

  export const adminRoles = [Roles.admin, Roles.owner] as string[]

  export const isAdmin = (role: string | null | undefined) => adminRoles.includes(role)
}
