import React, { Dispatch, SetStateAction, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'


import useAuthStore from '../store/authStore'
import NoResults from './NoResults'
import { IUser } from '../types'

interface Comment {
  comment: string
  length?: number
  _key: string
  postedBy: {
    _ref: string
    _id: string
  }
}

interface Props {
   isCommenting: boolean,
  comment: string,
  setComment: Dispatch<SetStateAction<string>>,
  addComment: (event: FormEvent) => void,
  comments: Comment[],
}

const Comments = ({ comment, setComment, addComment, comments, isCommenting }: Props) => {
  const { userProfile, allUsers } = useAuthStore()

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[457px]'>
        {comments?.length ? (
          <div>
            {comments.map((comment: Comment, index: number) => (
              <>
                {allUsers?.map((user: IUser) => 
                  user._id === (comment.postedBy._id) || (comment.postedBy._ref) && (
                    <div className='p-2 items-center' key={index}>
                      <Link href={`/profile/${user._id}`}>
                        <div className='flex items-start gap-3'>
                          <div className='w-12 h-12'>
                            <Image 
                              className='rounded-full cursor-pointer'
                              src={user.image}
                              width={48}
                              height={48}
                              alt='user-profile'
                              layout='responsive'
                            />
                          </div>
                           <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary'>
                            {user.userName}{' '}
                            <GoVerified className='text-blue-400' />
                          </p>
                        </div>
                      </Link>
                       <div>
                        <p className='-mt-5 ml-16 text-[16px] mr-8'>
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  ))}
              </>
            ))}
          </div>
        ) : (
           <NoResults text='No comments yet' />
        )}
      </div>
      {userProfile && (
        <div className='absolute bottom-0 left-0  pb-6 px-2 md:px-10'>
          <form className='flex gap-4' onSubmit={addComment}>
            <input 
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              placeholder='Add a public comment...'
            />
            <button className='text-md text-gray-400' onClick={addComment}>
              {isCommenting ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments