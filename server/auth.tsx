import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const API_BASE_URL = 'http://192.168.0.101:7788/api';
// export const API_BASE_URL = 'http://192.168.1.33:7788/api';
// export const API_BASE_URL = 'http://localhost:7788/api';

export const storeAuthToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync('token', token);
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Failed to store token:', error);
    throw new Error('Failed to save authentication token');
  }
};

export const getAuthToken = async (): Promise<string> => {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (!token) {
      throw new Error('No token found. User may not be authenticated.');
    }
    return token;
  } catch (error) {
    console.error('Failed to retrieve token:', error);
    throw error; 
  }
};

export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const token = await getAuthToken();
  return { 
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, { 
      email, 
      password 
    });
    
    if (!response.data?.token) {
      throw new Error('Authentication succeeded but no token received');
    }
    
    return response;
  } catch (error) {
    console.error('Login API error:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw error;
  }
};

export const clearAuthToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync('token');
};
export const signupUser = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) =>
  axios.post(`${API_BASE_URL}/auth/signup`, {
    name,
    email,
    password,
    confirmPassword,
  });

export const verifyOtp = (email: string, code: string) =>
  axios.post(`${API_BASE_URL}/auth/verify`, {
    email,
    code,
  });

export const resendOtp = (email: string) =>
  axios.post(`${API_BASE_URL}/auth/resend-otp`, {
    email,
  });

export const serverConnect = (
  deviceName: string,
  publicIp: string,
  passKey: string
) =>
  axios.post(`${API_BASE_URL}/devices/add`, {
    deviceName,
    publicIp,
    passKey,
  });

export const logout = () =>
  axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });

export const getAllUsers = async (): Promise<any[]> => {
  const headers = await getAuthHeaders();
  const response = await axios.get(`${API_BASE_URL}/users/`, { headers });
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to fetch users');
  }
  return response.data.data;
};
export const getUserById = async (userId: string): Promise<any> => {
  const headers = await getAuthHeaders();
  const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
    headers,
  });

  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to fetch user');
  }

  return response.data.data;
};

export const deleteUser = async (userId: string): Promise<any> => {
  const headers = await getAuthHeaders();
  const response = await axios.delete(`${API_BASE_URL}/users/${userId}`, {
    headers,
  });
  return response.data;
};

type FolderType = {
  name: string;
  type?: string;
  parentId?: string;
  parent?: string;
};

export const createFolder = async (folderData: FolderType): Promise<any> => {
  const { name, type, parentId, parent } = folderData;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('Folder name is required and must be a non-empty string');
  }

  const payload = {
    name: name.trim(),
    type: type ? type.toLowerCase() + 's' : 'documents',
    parentId: parentId || parent || null,
  };

  const headers = await getAuthHeaders();
  const response = await axios.post(`${API_BASE_URL}/folders/`, payload, {
    headers,
  });
  return response.data;
};

export const editFolder = async (
  folderId: string,
  name: string,
  type?: string
): Promise<any> => {
  if (!folderId || typeof folderId !== 'string') {
    throw new Error('Folder ID is required and must be a string');
  }
  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('Folder name is required and must be a non-empty string');
  }

  const payload: { name: string; type?: string } = {
    name: name.trim(),
  };

  if (type) payload.type = type.toLowerCase() + 's';

  const headers = await getAuthHeaders();
  const response = await axios.patch(
    `${API_BASE_URL}/folders/${folderId}`,
    payload,
    { headers }
  );
  return response.data;
};

export const allFolders = async (): Promise<any> => {
  const headers = await getAuthHeaders();
  const response = await axios.get(`${API_BASE_URL}/folders/`, { headers });
  return response.data;
};

export const deleteFolder = async (folderId: string): Promise<any> => {
  const headers = await getAuthHeaders();
  const response = await axios.delete(`${API_BASE_URL}/folders/${folderId}`, {
    headers,
  });
  return response.data;
};

export const getFolderById = async (folderId: string): Promise<any> => {
  if (!folderId) throw new Error('Folder ID is required');
  const headers = await getAuthHeaders();
  const response = await axios.get(`${API_BASE_URL}/folders/${folderId}`, {
    headers,
  });
  return response.data;
};

export const uploadFolder = async (
  folderId: string,
  files: any[]
): Promise<any> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const headers = await getAuthHeaders();
  const response = await axios.post(
    `${API_BASE_URL}/folders/upload/${folderId}`,
    formData,
    {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const uploadMultipleFolders = async (
  formData: FormData
): Promise<any> => {
  const headers = await getAuthHeaders();
  const response = await axios.post(
    `${API_BASE_URL}/folders/upload-multiple`,
    formData,
    {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const DownloadFolder = async (folderId: string): Promise<Blob> => {
  const headers = await getAuthHeaders();
  const response = await axios.get(
    `${API_BASE_URL}/folders/download/${folderId}`,
    {
      headers,
      responseType: 'blob',
    }
  );
  return response.data;
};

export const uploadDocument = async (
  formData: FormData,
  onUploadProgress?: (progressEvent: any) => void
): Promise<any> => {
  const headers = await getAuthHeaders();
  const response = await axios.post(
    `${API_BASE_URL}/documents/upload`,
    formData,
    {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    }
  );
  return response.data;
};

export const uploadMultipleDocuments = async (
  formData: FormData,
  onUploadProgress?: (progressEvent: any) => void
): Promise<any> => {
  const headers = await getAuthHeaders();
  const response = await axios.post(
    `${API_BASE_URL}/documents/multiple`,
    formData,
    {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    }
  );
  return response.data;
};

export const uploadImage = (
  formData: FormData,
  onUploadProgress?: (progressEvent: any) => void
) => {
  return axios.post(`${API_BASE_URL}/images/`, formData, {
    headers: getAuthHeaders(),
    onUploadProgress,
  });
};

export const uploadMultipleImages = (
  formData: FormData,
  onUploadProgress?: (progressEvent: any) => void
) => {
  return axios.post(`${API_BASE_URL}/images/multiple`, formData, {
    headers: getAuthHeaders(),
    onUploadProgress,
  });
};

export const DeleteImage = (imageId: string) =>
  axios.delete(`${API_BASE_URL}/images/${imageId}`, {
    headers: getAuthHeaders(),
  });

export const DeleteFile = (fileId: string) =>
  axios.delete(`${API_BASE_URL}/documents/${fileId}`, {
    headers: getAuthHeaders(),
  });

export const DownloadFile = async (fileId: string): Promise<Blob> => {
  const headers = await getAuthHeaders();
  const response = await axios.get(
    `${API_BASE_URL}/documents/Download/${fileId}`,
    {
      headers,
      responseType: 'blob',
    }
  );
  return response.data;
};

export const DownloadImage = async (imageId: string): Promise<Blob> => {
  const headers = await getAuthHeaders();
  const response = await axios.get(
    `${API_BASE_URL}/images/Download/${imageId}`,
    {
      headers,
      responseType: 'blob',
    }
  );
  return response.data;
};
