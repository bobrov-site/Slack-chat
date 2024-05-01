const useSetHeaders = (headers) => {
  const token = localStorage.getItem('token');
  headers.set('Authorization', `Bearer ${token}`);
  return headers;
};

export default useSetHeaders;
