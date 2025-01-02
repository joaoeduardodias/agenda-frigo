import "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
  }

  interface Session {
    id: string;
    role: string;
  }

  interface JWT {
    id: string;
    role: string;
  }
}
