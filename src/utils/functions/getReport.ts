import { supabase } from "@/lib/client";

export const getReport = async () => {
    try{
        const {data, error} = await supabase.from('bill').select('*').order("bill_no", { ascending: true });;
        return data;
    }
    catch(e){
        console.log(e);
    }
};