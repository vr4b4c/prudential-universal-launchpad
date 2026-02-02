/**
 * API Base URL configuration
 * 
 * Reads from environment variable VITE_API_BASE_URL
 * Falls back to 'http://localhost:3000' if not set
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
