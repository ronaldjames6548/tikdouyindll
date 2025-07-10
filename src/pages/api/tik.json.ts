import type { APIRoute } from "astro";
import { Downloader } from "@tobyg74/tiktok-api-dl";

const APIFY_API_TOKEN = import.meta.env.APIFY_API_TOKEN;

export const prerender = false;
export const GET: APIRoute = async ({ request }) => {
  try {
    let url = new URL(request.url);
    let params = url.searchParams;
    let videoUrl = params.get("url") || "";
    if (!videoUrl) {
      return new Response(JSON.stringify({ error: "url is required" }), {
        status: 400,
        headers: {
          "content-type": "application/json",
        },
      });
    }

    if (videoUrl.includes("douyin.com")) {
      // Use Apify API for Douyin
      const apifyResponse = await fetch("[invalid url, do not cite] {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${APIFY_API_TOKEN}`,
        },
        body: JSON.stringify({
          input: {
            url: videoUrl,
          },
        }),
      });

      if (!apifyResponse.ok) {
        throw new Error("Apify API request failed");
      }

      const data = await apifyResponse.json();
      // Assuming the response has dataset items with download URLs
      if (data && data.items && data.items.length > 0 && data.items[0].downloadUrl) {
        return new Response(JSON.stringify({ downloadUrl: data.items[0].downloadUrl }), {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        });
      } else {
        return new Response(JSON.stringify({ error: "No download URL found for Douyin video" }), {
          status: 400,
          headers: {
            "content-type": "application/json",
          },
        });
      }
    } else {
      // Use existing TikTok downloader
      let data = await Downloader(videoUrl, {
        version: "v3",
      });

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
};
