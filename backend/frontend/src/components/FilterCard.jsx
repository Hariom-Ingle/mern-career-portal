import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
// import { FiFilter } from 'react-icons/fi'; // Icon for filter button (you can change it)
import { Filter } from 'lucide-react';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Sidebar open/close state
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className=" border border-gray-300  rounded-xl"> 
            {/* Filter Button */}
            <button
                onClick={toggleSidebar}
                className="fixed top-16 right-4 z-50 p-2 bg-blue-600 text-white rounded-md md:hidden"
            >
                <Filter size={20} />
                
            </button>

            {/* Sidebar Panel */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-50  rounded-xl p-5 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 md:relative md:w-64 md:static`}>
                <h1 className="font-bold text-lg">Filter Jobs</h1>
                <hr className="mt-3" />

                {/* Close Button (for small screens) */}
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 right-4 md:hidden text-gray-500"
                >
                    ✕
                </button>

                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                    {
                        filterData.map((data, index) => (
                            <div key={index} className="mt-2 border-b-2">
                                <h1 className="font-bold text-lg">{data.filterType}</h1>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`;
                                        return (
                                            <div className="flex items-center space-x-2 my-2" key={itemId}>
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label htmlFor={itemId}>{item}</Label>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        ))
                    }
                </RadioGroup>
            </div>

            {/* Overlay for small screens when sidebar is open */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
                />
            )}
        </div>
    );
};

export default FilterCard;
