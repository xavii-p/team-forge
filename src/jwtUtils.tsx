 
const jwtDecode = require('jwt-decode');


interface DecodedToken {
  name: string;
  
}

export const getUsernameFromJWT = (): string | null => {
  const token = localStorage.getItem('jwt');
  console.log('JWT Token:', token); // Log the token for debugging

  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.name;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};
