import { DefaultUser } from "next-auth";

export type Present = {
  name: string;
  description: string;
  image: string;
  cost: number;
  pointsCost: number;
  onHand: number;
  dayType: "christmas" | "birthday";
}
export type Budget = {
  kidId: string;
  christmasBudget: number;
  birthdayBudget: number;
  christmasPresents: number;
  birthdayPresents: number;
};
export type MagicContribution = {
  amount: number;
  date: Date;
  sponsorId?: string;
};

export type Magic = {
  kidId: string;
  amount: number;
  contributions: MagicContribution[];
};
export type Kid = {
  id: string;
  name: string;
  age: string;
  totalPoints?: number;
  naughtyNicePoints: number;
  niceScore?: number;
  christmasPresents?: Present[];
  birthdayPresents?: Present[];
  budget?: Budget;
  magic?: Magic;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "parent";
      name?: string | null;
      email?: string | null;
      image?: string | null;
      kids?: Kid[];
    };
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
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
