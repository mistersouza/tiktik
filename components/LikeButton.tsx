import React, { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { NextPage } from 'next';

import useAuthStore from '../store/authStore';

interface Props {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ handleDislike, handleLike, likes }: Props) => {
  const [liked, setLiked] = useState(false);
  const { userProfile }: any = useAuthStore();

  useEffect(() => {
    if (userProfile) {
      let filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id);
      // const isLiked = likes.find((like) => like.userId === userProfile._id);
      if (filterLikes.length > 0) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [likes]);

  return (
    <div className='flex gap-6'>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {liked ? (
          <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997]' onClick={handleDislike}>
            <MdFavorite className='text-lg md:text-2xl'/>
          </div>
        ) : (
          <div className='bg-primary rounded-full p-2 md:p-4' onClick={handleLike}>
            <MdFavorite className='text-lg md:text-2xl' />
          </div>  
        )}
        <p className='text-md font-semibold '>{likes?.length || 0}</p>
      </div>
    </div>
  )
}

export default LikeButton