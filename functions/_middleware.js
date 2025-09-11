export async function onRequest(context) {
    if (context.request.method === 'OPTIONS') {
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
    
    // Let static assets handle all other requests
    return context.next();
}