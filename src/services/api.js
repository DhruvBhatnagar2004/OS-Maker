import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; 
const api = {
 
  // Submit OS configuration
  submitConfiguration: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/configurations/submit`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting configuration:', error);
      throw error;
    }
  },
  
  submitConfigurationWithWallpaper: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/configurations/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting configuration with wallpaper:', error);
      throw error;
    }
  }
};

export default api;