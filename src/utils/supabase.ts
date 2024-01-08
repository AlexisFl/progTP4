
import {createClientComponentClient, Session, User, User as SupabaseUser} from '@supabase/auth-helpers-nextjs';
import { createClient, SupabaseClient} from "@supabase/supabase-js";

export async function getUser (supabaseClient: SupabaseClient) : Promise<User | null> {
    return (await supabaseClient.auth.getUser())?.data?.user ?? null;
}



export const signOut = async (supabase: SupabaseClient) => {
    await supabase.auth.signOut();
};
