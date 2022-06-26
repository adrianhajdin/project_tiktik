import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import axios from 'axios';

import VideoCard from '../components/HomeVideoCard';
import { BASE_URL } from '../utils';
import { Video } from '../types';

const Home: NextPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videosData = await axios.get(`${BASE_URL}/api/post`);
      setVideos(videosData.data);
    };

    fetchVideos();
  }, []);

  return (
    <div className='flex flex-col gap-10 videos'>
      {videos?.map((video: Video) => (
        <VideoCard videoData={video} key={video._id} />
      ))}
    </div>
  );
};

export default Home;
