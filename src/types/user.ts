import { UserRolesType } from "@/utils/user-roles";

export interface User {
  id: string;
  name: string;
  userRole: UserRolesType;
  email: string;
  password?: string;
}
