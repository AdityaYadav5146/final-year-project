const API_BASE_URL = '/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
};

export const authAPI = {
  signup: async (email: string, password: string, name: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    return handleResponse(response);
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },
};

export const coursesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/courses`);
    return handleResponse(response);
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`);
    return handleResponse(response);
  },

  create: async (course: any) => {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    });
    return handleResponse(response);
  },

  update: async (id: string, course: any) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    });
    return handleResponse(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

export const enrollmentsAPI = {
  getByUser: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/enrollments/${userId}`);
    return handleResponse(response);
  },

  create: async (userId: string, courseId: string) => {
    const response = await fetch(`${API_BASE_URL}/enrollments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, courseId }),
    });
    return handleResponse(response);
  },
};
