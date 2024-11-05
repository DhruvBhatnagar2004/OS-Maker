import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = {
  // Get predefined configurations
  getPredefinedConfigs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/configurations/predefined/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching predefined configs:', error);
      throw error;
    }
  },

  // Submit OS configuration
  submitConfiguration: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/configurations/submit/`, data);
      return response.data;
    } catch (error) {
      console.error('Error submitting configuration:', error);
      throw error;
    }
  },

  // Get custom configuration options
  getCustomOptions: async (osType) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/configurations/custom-options/${osType}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching custom options:', error);
      throw error;
    }
  }
};

export default api;