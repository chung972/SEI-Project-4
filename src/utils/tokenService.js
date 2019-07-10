function setToken(token) {
    // Data saved in localStorage is persisted by domain until removed. If you want to save data for only the duration of the browser 
    // session, use sessionStorage instead.
    // Keeping the token string stored in localStorage allows users to remain logged in until the token expires. We will be logged in, 
    // even if we close the browser and come back tomorrow!
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }
  
  function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
      // Check if expired, remove if it is
      const payload = JSON.parse(atob(token.split('.')[1]));
      // JWT's exp is expressed in seconds, not milliseconds, so convert
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        token = null;
      }
    }
    return token;
  }
  
  function getUserFromToken() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
    // if token is NOT null, then call on .user on the parsed token; otherwise return null
  }
  
  function removeToken() {
    localStorage.removeItem('token');
  }
  
  export default {
    setToken,
    getToken,
    removeToken,
    getUserFromToken
  };