import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='mb-36  hidden  sm:block'>
        <Carousel className="w-full max-w-xl mx-auto my-20">
          <CarouselContent>
            {category.map((cat, index) => (
              <CarouselItem className="md:basis-1/3 lg:basis-1/3 sm:1/5">
                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="bg-white border-[#264653] text-[#264653] hover:bg-[#E9C46A] hover:text-white rounded-full">
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    )
}

export default CategoryCarousel