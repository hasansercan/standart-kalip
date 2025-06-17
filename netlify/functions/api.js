const serverless = require('serverless-http');

// Backend server'ı import et
const app = require('../../backend/server.js');

// Netlify Functions için optimized handler
const handler = serverless(app, {
    binary: ['image/*', 'application/pdf', 'application/octet-stream'],
    request: function (request, event, context) {
        // Environment variables'ları ayarla
        if (!process.env.NODE_ENV) {
            process.env.NODE_ENV = 'production';
        }

        console.log('Original URL:', request.url);
        console.log('Event path:', event.path);

        // Netlify redirect ile gelen URL'i düzelt
        // /api/settings -> event.path'ten alınacak
        if (event.path) {
            request.url = '/api' + event.path;
        } else if (!request.url.startsWith('/api')) {
            request.url = '/api' + request.url;
        }

        console.log('Final URL:', request.url);
    }
});

module.exports.handler = async (event, context) => {
    // Netlify context'i ayarla
    context.callbackWaitsForEmptyEventLoop = false;

    console.log('Event details:', {
        path: event.path,
        httpMethod: event.httpMethod,
        headers: event.headers
    });

    console.log('Environment check:', {
        NODE_ENV: process.env.NODE_ENV,
        MONGO_URI: process.env.MONGO_URI ? 'SET' : 'NOT SET',
        NETLIFY: process.env.NETLIFY
    });

    try {
        const result = await handler(event, context);

        console.log('API response status:', result.statusCode);

        return {
            ...result,
            headers: {
                ...result.headers,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Max-Age': '86400',
                'Content-Type': result.headers['content-type'] || result.headers['Content-Type'] || 'application/json'
            }
        };
    } catch (error) {
        console.error('Netlify function error:', error);
        console.error('Error stack:', error.stack);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message,
                timestamp: new Date().toISOString(),
                path: event.path
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    }
};
