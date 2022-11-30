import React, { useState } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import axios from 'axios';
import { GoVerified } from 'react-icons/go';

import NoResults from '../../components/NoResults';
import VideoCard from '../../components/VideoCard';
import useAuthStore from '../../store/authStore';
import { BASE_URL } from '../../utils';
import { IUser, Video } from '../../types';

const Search = ({ videos }: { videos: Video[]}) => {
  const [ isAccounts, setIsAccounts ] = useState<boolean>(true);
  const router = useRouter();

  const { allUsers } = useAuthStore();
  const { searchQuery }: any = router.query;

  // clsx for better class management
  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'; 
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

  const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchQuery.toLowerCase()));

  console.log(allUsers)
  return (
    <div className='w-full'>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
          <p className={`text-xl font-semibold cursor-pointer ${accounts} mt-2`} onClick={() => setIsAccounts(true)}>
            Accounts
          </p>
          <p className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`} onClick={() => setIsAccounts(false)}>
            Videos
          </p>
        </div>
        {isAccounts ? (
          <div className='md:mt-16'>
            {searchedAccounts.length > 0 ? (
              searchedAccounts.map((user: IUser, index: number) => (
                  <Link key={index} href={`/profile/${user._id}`}>
                <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                  <div>
                    <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.image}/>
                  </div>
                  <div>
                    <div>
                      <p className='flex gap-1 items-center text-lg font-bold text-primary'>
                        {user.userName} <GoVerified className='text-blue-400' />
                      </p>
                      <p className='capitalize text-gray-400 text-sm'>
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              ))
            ) : <NoResults text={`No video results for ${searchQuery}`}/>}
          </div>
        ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
          {videos.length ? (
            videos.map((videos, index) => (
              <VideoCard post={videos} key={index} />
            ))
          ) : <NoResults text={`No video results for ${searchQuery}`}/>}
        </div>    
        )}
  </div>
  )
}

export default Search

export const getServerSideProps = async ({
  params: { searchQuery },
}: {
  params: { searchQuery: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchQuery}`);

  return {
    props: { videos: data }
  };
};