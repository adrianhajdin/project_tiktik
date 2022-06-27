import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchGoogleResponse = async (response: any, addUser: any) => {
  addUser(response?.profileObj);
    
  const user = { 
    _id: response?.profileObj?.googleId, 
    _type: 'user', 
    userName: response?.profileObj?.name, 
    image: response?.profileObj?.imageUrl 
  };
  
  if(response?.profileObj) {
    await axios.post(`${BASE_URL}/api/auth`, user);
  }
};
