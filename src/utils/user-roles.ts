export const userRoles = {
  adm: 'Administrador',
  user: 'user',

} as const

export type UserRolesType = keyof typeof userRoles
