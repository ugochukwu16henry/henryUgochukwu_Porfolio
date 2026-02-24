import { Certificate, MediaAsset, Profile, Project, ResumeAsset } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type RequestOptions = RequestInit & { token?: string };

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers
      },
      cache: 'no-store'
    });
  } catch {
    throw new Error('Network error: unable to reach backend. Check Railway service, NEXT_PUBLIC_API_URL, and CORS_ORIGIN.');
  }

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: `Request failed (${response.status})` }));
    throw new Error(error.message || `Request failed (${response.status})`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  getProfile: () => request<Profile | null>('/profile'),
  updateProfile: (payload: Partial<Profile>, token: string) =>
    request<Profile>('/profile', { method: 'PUT', token, body: JSON.stringify(payload) }),

  getProjects: () => request<Project[]>('/projects'),
  getProject: (idOrSlug: string) => request<Project>(`/projects/${idOrSlug}`),
  createProject: (payload: Partial<Project>, token: string) =>
    request<Project>('/projects', { method: 'POST', token, body: JSON.stringify(payload) }),
  updateProject: (id: string, payload: Partial<Project>, token: string) =>
    request<Project>(`/projects/${id}`, { method: 'PUT', token, body: JSON.stringify(payload) }),

  getCertificates: () => request<Certificate[]>('/certificates'),
  createCertificate: (payload: Partial<Certificate>, token: string) =>
    request<Certificate>('/certificates', { method: 'POST', token, body: JSON.stringify(payload) }),
  updateCertificate: (id: string, payload: Partial<Certificate>, token: string) =>
    request<Certificate>(`/certificates/${id}`, { method: 'PUT', token, body: JSON.stringify(payload) }),

  getMedia: () => request<MediaAsset[]>('/media'),
  createMedia: (payload: Partial<MediaAsset>, token: string) =>
    request<MediaAsset>('/media', { method: 'POST', token, body: JSON.stringify(payload) }),
  updateMedia: (id: string, payload: Partial<MediaAsset>, token: string) =>
    request<MediaAsset>(`/media/${id}`, { method: 'PUT', token, body: JSON.stringify(payload) }),

  getResumes: () => request<ResumeAsset[]>('/resumes'),
  createResume: (payload: Partial<ResumeAsset>, token: string) =>
    request<ResumeAsset>('/resumes', { method: 'POST', token, body: JSON.stringify(payload) }),
  updateResume: (id: string, payload: Partial<ResumeAsset>, token: string) =>
    request<ResumeAsset>(`/resumes/${id}`, { method: 'PUT', token, body: JSON.stringify(payload) }),

  login: (email: string, password: string) =>
    request<{ token: string; user: { email: string; role: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),
  verifyToken: (token: string) =>
    request<{ valid: boolean; user: { role: string; email: string } }>('/auth/verify', {
      method: 'GET',
      token
    })
};

export const uploadFile = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append('file', file);

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
  } catch {
    throw new Error('Upload failed: network/CORS issue while reaching backend upload endpoint.');
  }

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: `Upload failed (${response.status})` }));
    throw new Error(error.message || `Upload failed (${response.status})`);
  }

  return response.json() as Promise<{ fileName: string; fileUrl: string }>;
};
