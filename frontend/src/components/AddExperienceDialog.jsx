import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader } from 'lucide-react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const AddExperienceDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);

    // Initial state for adding new experiences
    const [experiences, setExperiences] = useState([
        { companyName: '', jobRole: '', duration: '', location: '' }
    ]);

    // Update experience fields
    const changeEventHandler = (e, index) => {
        const { name, value } = e.target;
        const updatedExperiences = [...experiences];
        updatedExperiences[index][name] = value;
        setExperiences(updatedExperiences);
    };

    // Add new experience input
    const addExperienceHandler = () => {
        setExperiences([...experiences, { companyName: '', jobRole: '', duration: '', location: '' }]);
    };

    // Remove experience input
    const removeExperienceHandler = (index) => {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(updatedExperiences);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = { experience: experiences }; // Collecting new experience data

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/experience/add`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message); // Notify success
                setOpen(false); // Close dialog on success
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred'); // Notify error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Add New Experience</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className="grid gap-2 py-4 ">
                            {experiences.map((exp, index) => (
                                <div key={index} className="border p-4 rounded-md">
                                    <div className="grid grid-cols-4 items-center gap-4 mb-3">
                                        <Label htmlFor={`companyName-${index}`} className="text-right">
                                            Company Name
                                        </Label>
                                        <Input
                                            id={`companyName-${index}`}
                                            name="companyName"
                                            type="text"
                                            value={exp.companyName}
                                            onChange={(e) => changeEventHandler(e, index)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4 mb-3">
                                        <Label htmlFor={`jobRole-${index}`} className="text-right">
                                            Job Role
                                        </Label>
                                        <Input
                                            id={`jobRole-${index}`}
                                            name="jobRole"
                                            type="text"
                                            value={exp.jobRole}
                                            onChange={(e) => changeEventHandler(e, index)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4 mb-3">
                                        <Label htmlFor={`duration-${index}`} className="text-right">
                                            Duration
                                        </Label>
                                        <Input
                                            id={`duration-${index}`}
                                            name="duration"
                                            type="text"
                                            value={exp.duration}
                                            onChange={(e) => changeEventHandler(e, index)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4 mb-3">
                                        <Label htmlFor={`location-${index}`} className="text-right">
                                            location
                                        </Label>
                                        <Input
                                            id={`location-${index}`}
                                            name="location"
                                            type="text"
                                            value={exp.location}
                                            onChange={(e) => changeEventHandler(e, index)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    {index > 0 && (
                                        <Button variant="destructive" onClick={() => removeExperienceHandler(index)}>
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <Button type="button" variant="outline" className="w-full my-4" onClick={addExperienceHandler}>
                            Add Another Experience
                        </Button>

                        <DialogFooter>
                            {loading ? (
                                <Button className="w-full my-4" disabled>
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full my-4">
                                    Add Experience
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddExperienceDialog;
