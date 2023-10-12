import { API_URL } from '@/constants/api';
import axios from 'axios';

export const axiosAPI = axios.create({
  baseURL: API_URL,
});
