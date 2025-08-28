import { UAParser } from "ua-parser-js";
import supabase from "./supabase";
import { createClient } from "@supabase/supabase-js";


// Clicks For All URL API 
export async function getClicksForUrls(urlIds) {
    const { data, error } = await supabase.from('clicks').select('*').in('url_id', urlIds)

    if (error) {
        console.error(error.message);
        throw new Error('Unable to load clicks')
    }

    return data
}


// Stats API 
// Supabase client from env
const supabaseKey = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
);

const parser = new UAParser();

export const storeClicks = async ({ id, originalUrl }) => {
    try {
        // detect device
        const res = parser.getResult();
        const device = res.device.type || "desktop";

        // 🌍 fetch location from ipinfo (replace with your token)
        const response = await fetch(
            "https://ipinfo.io/json?4abb5b666272be" // <-- get free token at ipinfo.io
        );

        let city = "Unknown";
        let country = "Unknown";

        if (response.ok) {
            const data = await response.json();
            city = data.city || "Unknown";
            country = data.country || "Unknown";
        }

        // insert into Supabase
        const { error } = await supabaseKey.from("clicks").insert({
            url_id: id,
            city,
            country,
            device,
        });

        if (error) throw error;

        // redirect after storing
        window.location.href = originalUrl;
    } catch (error) {
        console.error("Error recording click:", error);
        // still redirect even if error
        window.location.href = originalUrl;
    }
};

// Clicks For URL API 
export async function getClicksForUrl(url_id) {
    const { data, error } = await supabase
        .from("clicks")
        .select("*")
        .eq("url_id", url_id);

    if (error) {
        console.error(error);
        throw new Error("Unable to load Stats");
    }

    return data;
}