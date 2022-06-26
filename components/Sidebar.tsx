import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
import useUsersStore from '../store/usersStore';
import useAuthStore from '../store/authStore';
import { fetchGoogleResponse } from '../utils';

const Sidebar: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);

  const { pathname } = useRouter();
  const { fetchSuggestedAccounts, suggestedAccounts }: any = useUsersStore();
  const { addUser, userProfile } = useAuthStore();

  const activeLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

  const normalLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';

  return (
    <div>
      <div
        className='block xl:hidden m-2 ml-4 mt-3 text-xl'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 '>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href='/'>
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='capitalize text-xl hidden xl:block'>
                  For You
                </span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className='px-2 py-4 hidden xl:block'>
              <p className='text-gray-400'>
                Log in to like and comment on videos.
              </p>
              <div className='pr-4'>
                <GoogleLogin
                  clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
                  render={(renderProps) => (
                    <button
                      className='bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3'
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
            </div>
          )}

          <Discover />
          <SuggestedAccounts
            fetchSuggestedAccounts={fetchSuggestedAccounts}
            suggestedAccounts={suggestedAccounts}
          />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
