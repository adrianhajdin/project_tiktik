import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import VideoSidebar from './LikeComment';
import { Video } from './../types';

interface IProps {
  videoData: Video;
}

const VideoCard: NextPage<IProps> = ({
  videoData: { caption, postedBy, video, likes, comments, _id },
}) => {
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      if (null !== videoRef.current) videoRef.current.pause();
      setPlaying(false);
    } else {
      if (null !== videoRef.current) videoRef.current.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (null !== videoRef.current) videoRef.current.muted = videoMuted;
  }, [videoMuted]);

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${postedBy?._id}`}>
              <Image
                width={62}
                height={62}
                className=' rounded-full'
                src={postedBy?.image}
                alt='user-profile'
                layout='responsive'
              />
            </Link>
          </div>
          <div>
            <Link href={`/profile/${postedBy?._id}`}>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {postedBy.userName}{' '}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {postedBy.userName}
                </p>
              </div>
            </Link>
            <Link href={`/detail/${_id}`}>
              <p className='mt-2 font-normal '>{caption}</p>
            </Link>
          </div>
        </div>
      </div>

      <div className='lg:ml-24 ml-10 flex gap-4 relative'>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className='rounded-3xl'
        >
          <Link href={`/detail/${_id}`}>
            <video
              loop
              ref={videoRef}
              src={video.asset.url}
              className='lg:w-[295px] h-[300px] md:h-[340px] lg:h-[528px] rounded-2xl cursor-pointer bg-gray-100'
            ></video>
          </Link>

          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[283px] p-3'>
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-white text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-white text-2xl lg:text-4xl' />
                </button>
              )}
              {videoMuted ? (
                <button onClick={() => setVideoMuted(false)}>
                  <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setVideoMuted(true)}>
                  <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}
        </div>
        <Link href={`/detail/${_id}`}>
          <div className='self-end mr-2'>
            <VideoSidebar
              id={_id}
              likes={likes}
              comments={comments}
              flex=''
              handleLike={() => {}}
              handleDislike={() => {}}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VideoCard;
