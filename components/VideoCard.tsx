import React from 'react';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';

import { Video } from '../types';

interface IProps {
  post: Video;
  profile: Boolean;
}

const VideoCard = ({ post, profile }: IProps) => {
  return (
    <div>
      <Link href={`/detail/${post._id}`}>
        <video
          loop
          src={post?.video.asset.url}
          className='w-210 h-280 rounded-xl cursor-pointer'
        ></video>
      </Link>
      {profile ? (
        <>
          <div className='flex gap-2 -mt-8 items-center ml-4'>
            <p className='text-white text-lg font-medium flex gap-1 items-center'>
              <BsPlay className='text-2xl' />
              {post?.likes?.length || 0}
            </p>
          </div>
        </>
      ) : (
        <Link href={`/profile/${post.postedBy._id}`}>
          <div className='flex gap-2 -mt-12 items-center ml-1 cursor-pointer'>
            <Image
              className='rounded-full'
              width={30}
              height={30}
              src={post.postedBy.image}
              alt='user-profile'
            />
            <p className='text-white text-xs font-medium flex gap-1 items-center w-16'>
              {post.postedBy.userName} <GoVerified className='text-blue-400' />
            </p>
          </div>
        </Link>
      )}
      <Link href={`/detail/${post._id}`}>
        <p className='mt-5 text-md text-gray-800 cursor-pointer w-210'>
          {post.caption}
        </p>
      </Link>
    </div>
  );
};

export default VideoCard;
