/**
 * API配置
 * 根据环境变量配置API基础URL
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  experts: `${API_BASE_URL}/api/experts`,
  upload: `${API_BASE_URL}/api/experts/upload`,
};

