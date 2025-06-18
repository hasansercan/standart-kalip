// API Configuration
const getApiBaseUrl = () => {
    // Check for environment variable first
    const envApiUrl = import.meta.env.VITE_API_BASE_URL;

    if (envApiUrl) {
        return envApiUrl;
    }

    // Fallback logic based on current environment
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;

        // If running on Netlify
        if (hostname.includes('netlify.app')) {
            return '/.netlify/functions/api';
        }

        // If running locally
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:5000';
        }
    }

    // Default fallback
    return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => {
    const baseUrl = API_BASE_URL;
    const apiEndpoint = endpoint.startsWith('/api/') ? endpoint : `/api${endpoint}`;
    return `${baseUrl}${apiEndpoint}`;
};

export default API_BASE_URL;
