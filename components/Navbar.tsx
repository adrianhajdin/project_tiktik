import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogout, GoogleLogin } from 'react-google-login';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

import useAuthStore from '../store/authStore';
import { IUser } from '../types';
import { fetchGoogleResponse } from '../utils';
import Logo from '../utils/tiktik-logo.png';

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(`/search/${searchValue}`);
  };

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[100px] md:w-[129px] md:h-[30px] h-[38px]'>
          <Image
            className='cursor-pointer'
            src={Logo}
            alt='logo'
            layout='responsive'
          />
        </div>
      </Link>

      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 -left-20 bg-white'
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
            placeholder='Search accounts and videos'
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href='/upload'>
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' />{' '}
                <span className='hidden md:block'>Upload </span>
              </button>
            </Link>
            {user?.imageUrl && (
              <Link href={`/profile/${user?.googleId}`}>
                <Image
                  className='rounded-full cursor-pointer'
                  src={user.imageUrl}
                  alt='user'
                  width={40}
                  height={40}
                />
              </Link>
            )}
            <GoogleLogout
              clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type='button'
                  className=' border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <AiOutlineLogout color='red' fontSize={21} />
                </button>
              )}
              onLogoutSuccess={() => removeUser()}
              // @ts-ignore
              cookiePolicy='single_host_origin'
            />
          </div>
        ) : (
          <div>
            <GoogleLogin
              clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  className='bg-[#F51997] text-lg text-white font-semibold px-6 py-1 rounded-md outline-none'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Log in
                </button>
              )}
              onSuccess={(res) => fetchGoogleResponse(res, addUser)}
              onFailure={(res) => fetchGoogleResponse(res, addUser)}
              cookiePolicy='single_host_origin'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
