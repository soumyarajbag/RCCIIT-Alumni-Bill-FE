import { User } from "@supabase/supabase-js";

export interface IUser extends User {
  phone: string;
  name: string;
  roll:string;
  email: string;
  gender: string;
  id: string;
}