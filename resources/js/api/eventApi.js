import axiosClient from '../tools/axiosClient';

export function saveEvent(event) {
  return event.id ? editEvent(event) : createEvent(event);
}

function editEvent(event) {
  return axiosClient
    .put(`/api/events/${event.id}`, event)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function createEvent(event) {
  return axiosClient
    .post('/api/events', event)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
export function getEvents() {
  return axiosClient
    .get('/api/events')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getLiveEvents() {
  return axiosClient
    .get('/api/events?live=true')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getEvent(id) {
  return axiosClient
    .get(`/api/events/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getEventForEdit(id) {
  return axiosClient
    .get(`/api/events/${id}/edit`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getEventLeaderboard(id) {
  return axiosClient
    .get(`/api/events/${id}/leaderboard`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function publishEvent(id) {
  return axiosClient
    .post(`/api/events/${id}/publish`, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function endEvent(id) {
  return axiosClient
    .post(`/api/events/${id}/end`, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
