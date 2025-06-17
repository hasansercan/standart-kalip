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

        // API base path'i düzelt
        if (request.url.startsWith('/.netlify/functions/api')) {
            request.url = request.url.replace('/.netlify/functions/api', '');
        }

        if (!request.url.startsWith('/api') && request.url !== '/') {
            request.url = '/api' + request.url;
        }
    }
});

module.exports.handler = async (event, context) => {
    // Netlify context'i ayarla
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const result = await handler(event, context);

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
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    }
};
