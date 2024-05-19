const useAuth = {
  logOut: (() => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
  }),
  logIn: ((token, nickname) => {
    localStorage.setItem('token', token);
    localStorage.setItem('nickname', nickname);
  }),
};

export default useAuth;
