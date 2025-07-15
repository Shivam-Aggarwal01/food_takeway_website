import React, { useState } from 'react'
import Header from '../components/Header';
import ExploreMenu from '../components/ExploreMenu'
import DisplayFood from '../components/DisplayFood';
import { assets } from '../new assests/frontend_assets/assets';
const Home = () => {
  const [category, setCategory] = useState("All");


  return (
    <>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <DisplayFood category={category} />
    </>
  )
}

export default Home