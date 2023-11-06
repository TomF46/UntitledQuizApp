import axiosClient from '../tools/axiosClient';

export function storeImage(image) {
  const data = new FormData();
  data.append('file', image);
  return axiosClient
    .post('/api/images', data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
