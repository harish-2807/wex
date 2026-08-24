import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
});

function unwrap(response) {
  return response.data;
}

export const getHealth = () => api.get('/health').then(unwrap);

export const getSkills = () => api.get('/skills').then(unwrap);

export const getJobs = () => api.get('/jobs').then(unwrap);

export const getJobById = (id) => api.get(`/jobs/${encodeURIComponent(id)}`).then(unwrap);

export const getRecommendations = (skills = []) =>
  api
    .get('/recommendations', { params: { skills: skills.join(',') } })
    .then(unwrap);

export const getMissingSkills = (id, skills = []) =>
  api
    .get(`/jobs/${encodeURIComponent(id)}/missing-skills`, {
      params: { skills: skills.join(',') },
    })
    .then(unwrap);

export const getRelatedSkills = (id) =>
  api.get(`/skills/${encodeURIComponent(id)}/related`).then(unwrap);

export const getCareerPaths = (skills = []) =>
  api
    .get('/career-paths', { params: { skills: skills.join(',') } })
    .then(unwrap);

export const getOpportunities = (skills = []) =>
  api
    .get('/opportunities', { params: { skills: skills.join(',') } })
    .then(unwrap);

// Centralized, safe error normalization. Never leaks technical internals
// (Axios objects, stack traces, DB URIs, Neo4j details) to the UI.
export function normalizeError(error) {
  const response = error.response;
  const status = response?.status;
  const serverMessage = response?.data?.message;

  if (!response) {
    return {
      status: 0,
      isNotFound: false,
      message: "We couldn't reach the CareerGraph service. Please try again in a moment.",
    };
  }

  if (status === 404) {
    return {
      status: 404,
      isNotFound: true,
      message: serverMessage || "We couldn't find what you were looking for.",
    };
  }

  if (status >= 500) {
    return {
      status,
      isNotFound: false,
      message: "We couldn't load this information right now. Please try again.",
    };
  }

  return {
    status,
    isNotFound: false,
    message: serverMessage || "We couldn't load this information right now. Please try again.",
  };
}

export default api;
