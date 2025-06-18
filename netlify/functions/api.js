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

        // URL'i tamamen temizle
        let cleanUrl = request.url;

        // /.netlify/functions/api kısmını kaldır
        if (cleanUrl.startsWith('/.netlify/functions/api')) {
            cleanUrl = cleanUrl.replace('/.netlify/functions/api', '');
        }

        // /api/api/ -> /api/ düzelt
        if (cleanUrl.startsWith('/api/api/')) {
            cleanUrl = cleanUrl.replace('/api/api/', '/api/');
        }

        // Eğer boşsa health check
        if (!cleanUrl || cleanUrl === '/') {
            cleanUrl = '/api/health';
        }

        // Eğer /api ile başlamıyorsa ekle (sadece bir kez)
        if (!cleanUrl.startsWith('/api')) {
            cleanUrl = '/api' + cleanUrl;
        }

        request.url = cleanUrl;
        console.log('Final URL:', request.url);
    }
});

module.exports.handler = async (event, context) => {
    // Netlify context'i ayarla
    context.callbackWaitsForEmptyEventLoop = false;

    console.log('Function started');
    console.log('Environment check:', {
        NODE_ENV: process.env.NODE_ENV,
        MONGO_URI: process.env.MONGO_URI ? 'SET' : 'NOT SET',
        NETLIFY: process.env.NETLIFY ? 'SET' : 'NOT SET',
        // Cloudinary environment variables
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'NOT SET',
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET',
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET',
        CLOUDINARY_URL: process.env.CLOUDINARY_URL ? 'SET' : 'NOT SET'
    });

    try {
        const result = await handler(event, context);

        console.log('API response status:', result.statusCode);
        console.log('Response headers:', result.headers);

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
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
                timestamp: new Date().toISOString()
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    }
};
