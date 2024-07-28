import { supabase } from "@/lib/client";

export const logout = async () => {
    await supabase.auth.signOut();
};