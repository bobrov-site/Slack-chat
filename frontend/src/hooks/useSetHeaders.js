const useSetHeaders = (headers) => {
  const token = localStorage.getItem('token');
  if (!token) {
    headers.set('Authorization', `Bearer ${null}`);
  } else {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

export default useSetHeaders;
