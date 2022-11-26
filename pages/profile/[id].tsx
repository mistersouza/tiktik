import { useState, useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'

import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'

interface Props {
  data: {
    user: IUser,
    userVideos: Video[]
    userLikedVideos: Video[]
  }
}


const Profile = ({ data }: Props) => {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const { user, userVideos, userLikedVideos } = data
  
  //  implement clsx etc. for better class management
  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'; 
  const likedVideos = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos)
    } else {
      setVideosList(userLikedVideos)
    }
  }, [showUserVideos, userVideos, userLikedVideos])


  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            width={120}
            height={120}
            layout='responsive'
            className='rounded-full'
            src={user.image}
            alt='user-profile'
          />
        </div>

        <div className='flex flex-col justify-center'>
          <p className='text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase'>
            <span>{user.userName.replace(/\s+/g, '')} </span>
            <GoVerified className='text-blue-400 md:text-xl text-md' />
          </p>
          <p className='text-sm font-medium'> {user.userName}</p>
        </div>
      </div>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
          <p className={`text-xl font-semibold cursor-pointer ${videos} mt-2`} onClick={() => setShowUserVideos(true)}>
            Videos
          </p>
          <p className={`text-xl font-semibold cursor-pointer ${likedVideos} mt-2`} onClick={() => setShowUserVideos(false)}>
            Liked
          </p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
          {!videosList || videosList.length > 0 
          ? (videosList && videosList.map((post: Video, index: number) => (
              <VideoCard key={index} post={post} />
            ))) 
          : (<NoResults text={`No ${showUserVideos ? '' : 'liked'} videos yet`}/>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { id }}: { params: { id: string }}) => {
  const  { data } = await axios.get(`${BASE_URL}/api/profile/${id}`)
  
  return {
    props: {
      data
    }
  }
}


export default Profile