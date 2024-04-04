import { useMutation } from 'react-query';
import axios from 'axios';

const API_BASE_URL = 'https://backcambamaster-production.up.railway.app'
const login = async (values ) => {


  const response = await axios.post(`${API_BASE_URL}/login`, values, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const useLoginMutation = () => {
  return useMutation(login);
};