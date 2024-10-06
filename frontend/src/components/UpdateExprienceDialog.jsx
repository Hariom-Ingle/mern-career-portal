import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

const UpdateExperienceDialog = ({
  open,
  setOpen,
  experience,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [updatedExperience, setUpdatedExperience] = useState({
    companyName: "",
    jobRole: "",
    duration: "",
    description: "",
  });
  const [inputErrors, setInputErrors] = useState({}); // Track input-specific errors
  const [globalError, setGlobalError] = useState(""); // For API errors

  // Populate the input fields with the selected experience data
  useEffect(() => {
    if (experience) {
      setUpdatedExperience({
        companyName: experience.companyName,
        jobRole: experience.jobRole,
        duration: experience.duration,
        description: experience.location,
      });
    }
  }, [experience]);

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear specific input error as soon as user starts typing
    setInputErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form fields before submission
  const validateForm = () => {
    const errors = {};
    if (!updatedExperience.companyName) errors.companyName = "Company name is required.";
    if (!updatedExperience.jobRole) errors.jobRole = "Job role is required.";
    if (!updatedExperience.duration) errors.duration = "Duration is required.";
    if (!updatedExperience.location) errors.location = "location is required.";
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle updating the experience through an API call
  const handleUpdateExperience = async () => {
    if (!validateForm()) return; // Stop if validation fails

    try {
      setLoading(true);
      setGlobalError(""); // Reset global error message
      const response = await axios.put(
        `${USER_API_END_POINT}/profile/experience/update`,
        {
          experienceId: experience._id,
          companyName: updatedExperience.companyName,
          jobRole: updatedExperience.jobRole,
          duration: updatedExperience.duration,
          location: updatedExperience.location,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch({
          type: "UPDATE_EXPERIENCE",
          payload: { id: experience._id, updatedExperience: response.data.user.experience },
        });
        setOpen(false); // Close dialog on success
      } else {
        setGlobalError("Failed to update experience. Please try again.");
      }
    } catch (error) {
      console.error("Error updating experience:", error);
      setGlobalError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveExperience = async () => {
    try {
      setLoading(true);
      setGlobalError(""); // Reset global error message

      const response = await axios.delete(
        `${USER_API_END_POINT}/profile/experience/delete`,
        {
          data: { experienceId: experience._id },
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch({
          type: "REMOVE_EXPERIENCE",
          payload: { id: experience._id },
        });
        setOpen(false); // Close dialog on success
      } else {
        setGlobalError("Failed to remove experience. Please try again.");
      }
    } catch (error) {
      console.error("Error removing experience:", error);
      setGlobalError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Experience</DialogTitle>
        </DialogHeader>

        {globalError && <div className="text-red-600">{globalError}</div>} {/* Global error message */}

        <div className="flex flex-col gap-3">
          <div>
            <Label>Company Name</Label>
            <Input
              name="companyName"
              value={updatedExperience.companyName}
              onChange={handleInputChange}
              disabled={loading}
            />
            {inputErrors.companyName && <div className="text-red-600">{inputErrors.companyName}</div>}
          </div>

          <div>
            <Label>Job Role</Label>
            <Input
              name="jobRole"
              value={updatedExperience.jobRole}
              onChange={handleInputChange}
              disabled={loading}
            />
            {inputErrors.jobRole && <div className="text-red-600">{inputErrors.jobRole}</div>}
          </div>

          <div>
            <Label>Duration</Label>
            <Input
              name="duration"
              value={updatedExperience.duration}
              onChange={handleInputChange}
              disabled={loading}
            />
            {inputErrors.duration && <div className="text-red-600">{inputErrors.duration}</div>}
          </div>

          <div>
            <Label>location</Label>
            <Input
              name="location"
              value={updatedExperience.location}
              onChange={handleInputChange}
              disabled={loading}
            />
            {inputErrors.location && <div className="text-red-600">{inputErrors.description}</div>}
          </div>
        </div>

        <DialogFooter>
            <div className=" flex flex-row  gap-3 justify-center  ">
            <Button onClick={handleUpdateExperience} disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Update"}
          </Button>

          <Button onClick={handleRemoveExperience} disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Remove"}
          </Button>
            </div>
        
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateExperienceDialog;
