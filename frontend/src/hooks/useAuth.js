const useAuth = {
  logOut: (() => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
  }),
};

export default useAuth;
