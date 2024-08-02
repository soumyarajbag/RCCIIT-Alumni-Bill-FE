import { supabase } from "@/lib/client";

export const getRoles = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { data, error } = await supabase
      .from("roles")
      .select("*")
      .eq("id", session?.user.id);
    const roles = data?.map((obj: any) => obj.role);
    return roles;
  } catch (e) {
    console.log(e);
  }
};
