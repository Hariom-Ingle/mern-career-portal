import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

const RemoveExperienceDialog = ({
  open,
  setOpen,
  experience, // Passing the specific experience object to be removed
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State to hold error messages

  // Handle removing the experience through an API call
  const handleRemoveExperience = async () => {
    try {
      setLoading(true);
      setError(""); // Reset error message

      const response = await axios.delete(
        `${USER_API_END_POINT}/profile/experience/delete`,
        {
          data: { experienceId: experience._id }, // Pass the experienceId in the request body
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Dispatch action to remove experience in the Redux store
        dispatch({
          type: "REMOVE_EXPERIENCE",
          payload: { id: experience._id },
        });
        setOpen(false); // Close dialog upon success
      } else {
        setError("Failed to remove experience. Please try again."); // Handle server-side error
      }
    } catch (error) {
      console.error("Error removing experience:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Experience</DialogTitle>
        </DialogHeader>

        {error && <div className="text-red-600">{error}</div>} {/* Display error message */}

        <div className="flex flex-col gap-3">
          <p>Are you sure you want to remove this experience?</p>
          <p><strong>Company:</strong> {experience.companyName}</p>
          <p><strong>Job Role:</strong> {experience.jobRole}</p>
          <p><strong>Duration:</strong> {experience.duration}</p>
          <p><strong>Description:</strong> {experience.description}</p>
        </div>

        <DialogFooter>
          <Button onClick={handleRemoveExperience} disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveExperienceDialog;
