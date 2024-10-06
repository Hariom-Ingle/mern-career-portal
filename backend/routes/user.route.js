import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  updateEducation,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// User authentication routes
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// Profile management routes
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/profile/educationUpdate").post(isAuthenticated, updateEducation);

// Experience management routes
router.route("/profile/experience/add").post(isAuthenticated, addExperience);
router.route("/profile/experience/update").put(isAuthenticated, updateExperience); // Remove experienceId from URL, expect it in the body
router.route("/profile/experience/delete").delete(isAuthenticated, deleteExperience); 
export default router;
