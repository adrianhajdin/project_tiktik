import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { Video } from '../../types';
import { BASE_URL } from '../../utils';

interface IProps {
  videos: Video[];
}

const Discover = ({ videos }: IProps) => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <div className='w-full  '>
      <div className='flex gap-10 mb-10 bg-white w-full'>
        <div className='w-28 h-28 md:w-36 md:h-36'>
          <Image
            width={160}
            height={160}
            className=' rounded'
            src='https://p16-amd-va.tiktokcdn.com/obj/musically-maliva-obj/b512979c082726d9f4ce8a9851eaac5a.png'
            alt='img'
            layout='responsive'
          />
        </div>

        <div>
          <p className='text-2xl md:text-4xl font-bold tracking-wider'>
            #{topic}
          </p>
          <p className='text-md md:text-xl'>1.2B views</p>
        </div>
      </div>
      <p className='my-4 text-xl text-gray-400'>Enjoy {topic} videos</p>
      <div className='flex flex-wrap gap-6'>
        {videos.length > 0 ? (
          videos.map((post: any, idx: number) => (
            <VideoCard key={idx} post={post} profile={false} />
          ))
        ) : (
          <NoResults text={`No Video Results for ${topic}`} />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { topic },
}: {
  params: { topic: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/discover/${topic}`);

  return {
    props: { videos: res.data },
  };
};

export default Discover;
