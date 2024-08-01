import { supabase } from "@/lib/client";

export const getReport = async () => {
    try{
        const {data, error} = await supabase.from('bill').select('*');
        return data;
    }
    catch(e){
        console.log(e);
    }
};