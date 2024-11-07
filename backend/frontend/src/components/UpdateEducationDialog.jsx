import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { Input } from './ui/input';

// Dummy data for dropdowns
const degrees = [
  'B.E. (Bachelor of Engineering)',
  'B.Tech (Bachelor of Technology)',
  'BCA (Bachelor of Computer Applications)',
  'M.E. (Master of Engineering)',
  'M.Tech (Master of Technology)'
];

const institutes = [
  'College of Engineering Pune',
  'VJTI Mumbai',
  'SPCE Mumbai',
  'Walchand College of Engineering Sangli',
  'Government College of Engineering Amravati'
];

const locations = [
  'Pune',
  'Mumbai',
  'Nagpur',
  'Nashik',
  'Aurangabad'
];

const UpdateEducationDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    degree: user?.education?.degree || '',
    instituteName: user?.education?.instituteName || '',
    location: user?.education?.location || '',
    duration: user?.education?.duration || ''
  });

  const [degreeDropdownOpen, setDegreeDropdownOpen] = useState(false);
  const [instituteDropdownOpen, setInstituteDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const [degreeSearch, setDegreeSearch] = useState('');
  const [instituteSearch, setInstituteSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      degree: input.degree,
      instituteName: input.instituteName,
      location: input.location,
      duration: input.duration
    };

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/educationUpdate`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false); // Close dialog on success
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      toast.error(
        error.response?.data?.message || 'Error updating education details'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Education</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            {/* Degree Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="degree" className="text-right">
                Degree
              </Label>
              <div className="col-span-3">
                <div
                  className="border p-2 rounded cursor-pointer"
                  onClick={() => setDegreeDropdownOpen((prev) => !prev)}
                >
                  {input.degree || 'Select Degree'} {/* Show selected or placeholder text */}
                </div>
                {degreeDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full border bg-white rounded shadow-lg">
                    <Input
                      type="text"
                      placeholder="Search degree..."
                      value={degreeSearch}
                      onChange={(e) => setDegreeSearch(e.target.value)}
                      className="p-2 border-b"
                    />
                    {degrees
                      .filter((degree) =>
                        degree.toLowerCase().includes(degreeSearch.toLowerCase())
                      )
                      .map((degree, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setInput({ ...input, degree });
                            setDegreeDropdownOpen(false); // Close dropdown after selection
                          }}
                          className="cursor-pointer hover:bg-gray-100 p-2"
                        >
                          {degree}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Institute Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instituteName" className="text-right">
                Institute Name
              </Label>
              <div className="col-span-3">
                <div
                  className="border p-2 rounded cursor-pointer"
                  onClick={() => setInstituteDropdownOpen((prev) => !prev)}
                >
                  {input.instituteName || 'Select Institute'} {/* Show selected or placeholder text */}
                </div>
                {instituteDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full border bg-white rounded shadow-lg">
                    <Input
                      type="text"
                      placeholder="Search institute..."
                      value={instituteSearch}
                      onChange={(e) => setInstituteSearch(e.target.value)}
                      className="p-2 border-b"
                    />
                    {institutes
                      .filter((institute) =>
                        institute.toLowerCase().includes(instituteSearch.toLowerCase())
                      )
                      .map((institute, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setInput({ ...input, instituteName: institute });
                            setInstituteDropdownOpen(false); // Close dropdown after selection
                          }}
                          className="cursor-pointer hover:bg-gray-100 p-2"
                        >
                          {institute}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Location Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <div className="col-span-3">
                <div
                  className="border p-2 rounded cursor-pointer"
                  onClick={() => setLocationDropdownOpen((prev) => !prev)}
                >
                  {input.location || 'Select Location'} {/* Show selected or placeholder text */}
                </div>
                {locationDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full border bg-white rounded shadow-lg">
                    <Input
                      type="text"
                      placeholder="Search location..."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="p-2 border-b"
                    />
                    {locations
                      .filter((location) =>
                        location.toLowerCase().includes(locationSearch.toLowerCase())
                      )
                      .map((location, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setInput({ ...input, location });
                            setLocationDropdownOpen(false); // Close dropdown after selection
                          }}
                          className="cursor-pointer hover:bg-gray-100 p-2"
                        >
                          {location}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Duration Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Input
                id="duration"
                name="duration"
                type="text"
                placeholder="2021-present"
                value={input.duration}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEducationDialog;
