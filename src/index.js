import listRegistry from "../build/listRegistry.json";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === "/") {
      const json = JSON.stringify(listRegistry, null, 2);
      return new Response(json, {
        headers: {
          "content-type": "application/json;charset=UTF-8",
          ...corsHeaders,
        },
      });
    }
    return new Response("Not Found", { status: 404 });
  },
};
