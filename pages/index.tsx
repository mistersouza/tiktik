import axios from 'axios';
import { NextPage } from 'next';

import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';

import { Video } from '../types';

interface Props {
  videos: Video[];
}

const Home: NextPage<Props> = ({ videos }) => {
  
  
  return (
    <div>
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text='No Videos' />
      )}
    </div>

  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);
  
  console.log(data);

  return {
    props: {
      videos: data // will be passed to the page component as props
    }
  }
}

export default Home;