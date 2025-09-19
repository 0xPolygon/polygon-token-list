export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle OPTIONS requests first
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Handle root redirect to listRegistry.json
    if (url.pathname === '/') {
      // Fetch listRegistry.json content and return it directly
      try {
        if (env.ASSETS) {
          const listRegistryRequest = new Request(new URL('/listRegistry.json', url.origin), {
            method: 'GET',
            headers: request.headers,
          });
          const response = await env.ASSETS.fetch(listRegistryRequest);
          
          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: {
              ...response.headers,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
              'Access-Control-Max-Age': '86400',
            },
          });
        } else {
          // Fallback for local development
          const response = await fetch(new URL('/listRegistry.json', url.origin));
          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: {
              ...response.headers,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
              'Access-Control-Max-Age': '86400',
            },
          });
        }
      } catch (error) {
        console.error('Error fetching listRegistry.json:', error);
        return new Response('Internal Server Error', { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
            'Access-Control-Max-Age': '86400',
          },
        });
      }
    }

    // For all other requests, let Cloudflare serve static assets
    // and add CORS headers to the response
    let response;
    
    try {
      if (env.ASSETS) {
        response = await env.ASSETS.fetch(request);
      } else {
        // Fallback for local development
        response = await fetch(request);
      }
    } catch (error) {
      console.error('Error fetching asset:', error);
      response = await fetch(request);
    }
    
    // Clone the response to add CORS headers
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...response.headers,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
        'Access-Control-Max-Age': '86400',
      },
    });

    return newResponse;
  },
};
