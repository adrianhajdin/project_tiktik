import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchGoogleResponse = async (response: any, addUser: any) => {
  const { name, googleId, imageUrl } = response.profileObj;

  addUser(response.profileObj);
  
  const user = { _id: googleId, _type: 'user', userName: name, image: imageUrl };
  
  await axios.post(`${BASE_URL}/api/auth`, user);
};
