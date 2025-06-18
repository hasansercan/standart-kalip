// API Configuration
const getApiBaseUrl = () => {
    // Check for environment variable first
    const envApiUrl = import.meta.env.VITE_API_BASE_URL;

    console.log('Environment API URL:', envApiUrl); // Debug

    if (envApiUrl) {
        console.log('Using environment API URL:', envApiUrl); // Debug
        return envApiUrl;
    }

    // Fallback logic based on current environment
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        console.log('Current hostname:', hostname); // Debug

        // If running on Netlify
        if (hostname.includes('netlify.app')) {
            console.log('Detected Netlify environment'); // Debug
            return '/.netlify/functions/api';
        }

        // If running locally
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            console.log('Detected local environment'); // Debug
            return 'http://localhost:5000';
        }
    }

    // Default fallback
    console.log('Using default fallback URL'); // Debug
    return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => {
    const baseUrl = API_BASE_URL;
    const apiEndpoint = endpoint.startsWith('/api/') ? endpoint : `/api${endpoint}`;
    const fullUrl = `${baseUrl}${apiEndpoint}`;
    console.log('Building API URL:', { baseUrl, endpoint, apiEndpoint, fullUrl }); // Debug
    return fullUrl;
};

export default API_BASE_URL;
