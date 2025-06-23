// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  Kids: [];
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};
export type Profile = { sub: string; name: string; email: string; picture?: string; given_name?: string; family_name?: string; locale?: string; email_verified?: boolean }

export type Kid = {
  name: string;
  age: string;
}