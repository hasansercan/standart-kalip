import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

// Token yönetimi için helper functions
const TokenManager = {
    // Local storage'dan token'ı al (sadece geçici olarak)
    getStoredToken: () => {
        try {
            return localStorage.getItem('accessToken');
        } catch {
            return null;
        }
    },

    // Token'ı local storage'a kaydet (geçici)
    setStoredToken: (token) => {
        try {
            if (token) {
                localStorage.setItem('accessToken', token);
            } else {
                localStorage.removeItem('accessToken');
            }
        } catch (error) {
            console.error('Token storage error:', error);
        }
    },

    // Token'ın süresini kontrol et
    isTokenExpired: (token) => {
        if (!token) return true;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        } catch {
            return true;
        }
    },

    // User data'yı localStorage'dan al (güvenli değil ama geçici çözüm)
    getStoredUser: () => {
        try {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        } catch {
            return null;
        }
    },

    // User data'yı localStorage'a kaydet
    setStoredUser: (user) => {
        try {
            if (user) {
                // Hassas bilgileri çıkar
                const safeUser = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    avatar: user.avatar
                };
                localStorage.setItem('user', JSON.stringify(safeUser));
            } else {
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error('User storage error:', error);
        }
    },

    // Tüm auth data'yı temizle
    clearAuthData: () => {
        try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Clear auth data error:', error);
        }
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    // API request helper with automatic token refresh
    const apiRequest = async (url, options = {}) => {
        const currentToken = token || TokenManager.getStoredToken();

        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(currentToken && { Authorization: `Bearer ${currentToken}` }),
                ...options.headers,
            },
            credentials: 'include', // HttpOnly cookie için
        };

        try {
            let response = await fetch(`${apiUrl}${url}`, config);

            // Token expired - refresh attempt
            if (response.status === 401 && currentToken) {
                const refreshSuccess = await refreshToken();
                if (refreshSuccess) {
                    const newToken = TokenManager.getStoredToken();
                    config.headers.Authorization = `Bearer ${newToken}`;
                    response = await fetch(`${apiUrl}${url}`, config);
                }
            }

            return response;
        } catch (error) {
            // Only log non-auth related API errors
            if (!url.includes('/auth/')) {
                console.error('API request error:', error);
            }
            throw error;
        }
    };

    // Token refresh function
    const refreshToken = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.accessToken);
                TokenManager.setStoredToken(data.accessToken);
                return true;
            } else {
                // Refresh failed - logout silently
                return false;
            }
        } catch (error) {
            // Silent fail - this is expected when no valid refresh token exists
            return false;
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Set auth state
                setUser(data.user);
                setToken(data.accessToken);
                setIsAuthenticated(true);
                setLoading(false); // Ensure loading is false after successful login

                // Store in localStorage (temporary solution)
                TokenManager.setStoredUser(data.user);
                TokenManager.setStoredToken(data.accessToken);

                return { success: true, user: data.user };
            } else {
                return {
                    success: false,
                    error: data.error || 'Login failed',
                    code: data.code
                };
            }
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: 'Network error occurred',
                code: 'NETWORK_ERROR'
            };
        }
    };

    // Logout function
    const logout = async () => {
        try {
            // Call logout endpoint to clear httpOnly cookie (only if we have a token)
            if (token) {
                await fetch(`${apiUrl}/api/auth/logout`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        } catch (error) {
            // Silent fail - logout errors are expected when already logged out
            console.log('Logout API call failed (this is normal):', error.message);
        } finally {
            // Clear local state regardless of API call result
            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
            TokenManager.clearAuthData();
        }
    };

    // Get current user profile
    const getCurrentUser = async () => {
        try {
            const response = await apiRequest('/api/auth/me');

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                TokenManager.setStoredUser(data.user);
                return data.user;
            } else {
                logout();
                return null;
            }
        } catch (error) {
            console.error('Get current user error:', error);
            logout();
            return null;
        }
    };

    // Initialize auth state
    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedToken = TokenManager.getStoredToken();
                const storedUser = TokenManager.getStoredUser();

                if (storedToken && !TokenManager.isTokenExpired(storedToken)) {
                    // Valid token exists
                    setToken(storedToken);

                    if (storedUser) {
                        setUser(storedUser);
                        setIsAuthenticated(true);

                        // Verify token with server to make sure it's still valid
                        try {
                            const response = await fetch(`${apiUrl}/api/auth/me`, {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${storedToken}`,
                                    'Content-Type': 'application/json'
                                },
                                credentials: 'include'
                            });

                            if (!response.ok) {
                                // Token is invalid, clear auth data
                                TokenManager.clearAuthData();
                                setUser(null);
                                setToken(null);
                                setIsAuthenticated(false);
                            } else {
                                // Update user data if needed
                                const data = await response.json();
                                if (data.user) {
                                    setUser(data.user);
                                    TokenManager.setStoredUser(data.user);
                                }
                            }
                        } catch (error) {
                            console.error('Token verification failed:', error);
                            // If verification fails, clear auth data to be safe
                            TokenManager.clearAuthData();
                            setUser(null);
                            setToken(null);
                            setIsAuthenticated(false);
                        }
                    }
                } else {
                    // No valid token - clear any stale data
                    TokenManager.clearAuthData();
                    setUser(null);
                    setToken(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                TokenManager.clearAuthData();
                setUser(null);
                setToken(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    // Auto token refresh timer (disabled for now to avoid unnecessary API calls)
    useEffect(() => {
        if (!token || !isAuthenticated) return;

        // Disable auto refresh to prevent unnecessary API calls
        // const refreshInterval = setInterval(() => {
        //     if (TokenManager.isTokenExpired(token)) {
        //         refreshToken();
        //     }
        // }, 5 * 60 * 1000); // Her 5 dakikada kontrol et

        // return () => clearInterval(refreshInterval);
    }, [token, isAuthenticated]);

    const value = {
        user,
        token,
        loading,
        isAuthenticated,
        login,
        logout,
        getCurrentUser,
        refreshToken,
        apiRequest, // Authenticated API requests için
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
