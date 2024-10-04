import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CategoryCarousel from '../components/CategoryCarousel'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import LatestJobs from '../components/LatestJobs'
import Navbar from '../components/Navbar'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home