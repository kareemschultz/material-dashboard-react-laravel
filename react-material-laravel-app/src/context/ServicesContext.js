import { createContext, useContext, useState, useCallback } from 'react';
import serviceAPI from 'services/serviceAPI';

const ServicesContext = createContext(null);

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await serviceAPI.getAllServices();
      setServices(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addService = useCallback(async (serviceData) => {
    setLoading(true);
    try {
      const response = await serviceAPI.createService(serviceData);
      setServices(prev => [...prev, response.data.data]);
      setError(null);
      return response.data.data;
    } catch (err) {
      setError('Failed to add service');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateService = useCallback(async (id, serviceData) => {
    setLoading(true);
    try {
      const response = await serviceAPI.updateService(id, serviceData);
      setServices(prev => 
        prev.map(service => 
          service.id === id ? response.data.data : service
        )
      );
      setError(null);
      return response.data.data;
    } catch (err) {
      setError('Failed to update service');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteService = useCallback(async (id) => {
    setLoading(true);
    try {
      await serviceAPI.deleteService(id);
      setServices(prev => prev.filter(service => service.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete service');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const grantAccess = useCallback(async (serviceId, userData) => {
    setLoading(true);
    try {
      const response = await serviceAPI.grantAccess(serviceId, userData);
      // Update local state if needed
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to grant access');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const revokeAccess = useCallback(async (serviceId, userId) => {
    setLoading(true);
    try {
      await serviceAPI.revokeAccess(serviceId, userId);
      // Update local state if needed
      setError(null);
    } catch (err) {
      setError('Failed to revoke access');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    services,
    selectedService,
    loading,
    error,
    setSelectedService,
    fetchServices,
    addService,
    updateService,
    deleteService,
    grantAccess,
    revokeAccess,
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};