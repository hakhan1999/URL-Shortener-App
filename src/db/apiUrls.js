import { UAParser } from "ua-parser-js";
import supabase, { supabaseUrl } from "./supabase";

// Get URL API 
export async function getUrls(user_id) {
    const { data, error } = await supabase.from("urls").select("*").eq("user_id", user_id)
    if (error) {
        console.error(error.message);
        throw new Error('Unable to load URLs')
    }

    return data
}

// Delete URL API 
export async function deleteUrl(id) {
    const { data, error } = await supabase.from("urls").delete().eq("id", id)
    if (error) {
        console.error(error.message);
        throw new Error('Unable to delete URL')
    }

    return data
}


// Generating QR Code API
export async function createUrl({ title, longUrl, customUrl, user_id }, qrcode) {
    const shortUrl = Math.random().toString(36).substring(2, 6)
    const fileName = `qr-${shortUrl}`
    const { error: storageError } = await supabase.storage.from('qrs').upload(fileName, qrcode)

    if (storageError) throw new Error(storageError.message)

    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`

    const { data, error } = await supabase.from("urls").insert([
        {
            title, original_url: longUrl, custom_url: customUrl, user_id, shortUrl, qr
        }
    ]).select()

    if (error) {
        console.error(error.message);
        throw new Error('Error creating short URL')
    }

    return data
}


// Long URL API 
export async function getLongUrl(id) {
    let { data: shortLinkData, error: shortLinkError } = await supabase
        .from("urls")
        .select("id, original_url")
        .or(`short_url.eq.${id},custom_url.eq.${id}`)
        .single();

    if (shortLinkError && shortLinkError.code !== "PGRST116") {
        console.error("Error fetching short link:", shortLinkError);
        return;
    }

    return shortLinkData;
}


// Single URL Page API 
export async function getUrl({ id, user_id }) {
    let query = supabase.from("urls").select("*").eq("id", id);

    if (user_id) {
        query = query.eq("user_id", user_id);
    }

    const { data, error } = await query.single();

    if (error) {
        console.error(error);
        throw new Error("Short Url not found");
    }

    return data;
}
