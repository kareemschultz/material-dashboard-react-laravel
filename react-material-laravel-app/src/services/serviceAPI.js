import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/v2`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const serviceAPI = {
  // Services
  getAllServices: () => api.get('/services'),
  getService: (id) => api.get(`/services/${id}`),
  createService: (data) => api.post('/services', data),
  updateService: (id, data) => api.patch(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),
  
  // Service Access
  grantAccess: (serviceId, data) => 
    api.post(`/services/${serviceId}/access`, data),
  revokeAccess: (serviceId, userId) => 
    api.delete(`/services/${serviceId}/access`, { data: { user_id: userId } }),
  updateAccess: (serviceId, userId, data) => 
    api.patch(`/services/${serviceId}/access/${userId}`, data),
  
  // Service Status
  getServiceStatus: (serviceId) => 
    api.get(`/services/${serviceId}/status`),
  
  // Bulk Operations
  importServices: (formData) => 
    api.post('/services/bulk/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  exportServices: () => 
    api.get('/services/bulk/export', { responseType: 'blob' }),
  
  // Platform-specific operations
  getIpamStatus: (serviceId) => 
    api.get(`/services/${serviceId}/platforms/ipam/status`),
  getGrafanaStatus: (serviceId) => 
    api.get(`/services/${serviceId}/platforms/grafana/status`),
  getVpnStatus: (serviceId) => 
    api.get(`/services/${serviceId}/platforms/vpn/status`),

  // Dashboard Stats
  getDashboardStats: () => api.get('/dashboard/stats'),
  getAccessSummary: () => api.get('/dashboard/access-summary'),
  getDepartmentSummary: () => api.get('/dashboard/department-summary'),
  getServiceUsage: () => api.get('/dashboard/service-usage'),
  getAccessTrends: () => api.get('/dashboard/access-trends'),
};

export default serviceAPI;