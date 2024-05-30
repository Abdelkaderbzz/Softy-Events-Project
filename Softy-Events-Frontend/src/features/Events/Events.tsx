import HelmetTitle from '@src/components/HelmetTitle'
import { dispatch, useSelector } from '@src/store'
import { getAllPost } from '@src/store/slices/post/action'
import { useEffect } from 'react'
import HeroPostSection from './components/HeroPostSection'
import PostInfiniteScroll from '../Dashboard/components/PostInfiniteScroll'

const Events = () => {
  return (
    <div>
      <HelmetTitle title="Posts" />
      <HeroPostSection />
      <PostInfiniteScroll />
    </div>
  )
}

export default Events
