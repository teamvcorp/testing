import { DefaultUser } from "next-auth";

export type Kid = {
  id: string;
  name: string;
  age: string;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      kids?: Kid[];
    };
  }

  interface User extends DefaultUser {
    id: string;
    kids?: Kid[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    kids?: Kid[];
  }
}
