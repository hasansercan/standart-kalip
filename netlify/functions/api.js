const serverless = require('serverless-http');
const app = require('../../backend/server.js');

// Netlify Functions için wrapper
const handler = serverless(app);

module.exports.handler = async (event, context) => {
    // CORS headers for Netlify
    const result = await handler(event, context);

    return {
        ...result,
        headers: {
            ...result.headers,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        }
    };
};
