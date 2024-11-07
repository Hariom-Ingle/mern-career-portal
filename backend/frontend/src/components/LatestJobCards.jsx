import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div
        onClick={() => navigate(`/description/${job._id}`)}
        className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition-transform hover:scale-105 md:flex md:flex-col lg:flex-col gap-4"
    >
        {/* Company Name and Location */}
        <div className="mb-2 lg:mb-0">
            <h1 className="font-medium text-lg lg:text-xl">{job?.company?.name}</h1>
            <p className="text-sm lg:text-base text-gray-500">India</p>
        </div>
    
        {/* Job Title and Description */}
        <div className="flex-1 my-2 lg:my-0">
            <h1 className="font-bold text-lg lg:text-2xl my-2">{job?.title}</h1>
            <p className="text-sm lg:text-base text-gray-600 line-clamp-3">
                {job?.description}
            </p>
        </div>
    
        {/* Job Details (Position, Type, Salary) */}
        <div className="flex flex-wrap items-center gap-2 mt-4 lg:mt-0">
            <Badge className="text-blue-700 font-bold text-xs lg:text-sm" variant="ghost">
                {job?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold text-xs lg:text-sm" variant="ghost">
                {job?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold text-xs lg:text-sm" variant="ghost">
                {job?.salary} LPA
            </Badge>
        </div>
    </div>
    
    )
}

export default LatestJobCards