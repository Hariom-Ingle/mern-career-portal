import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

/*********************  USER REGISTER ********************/

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,    
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
      education: {},
      experience: [],
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

/*********************  USER LOGIN ********************/

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      education: user.education,
      experience: user.experience,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

/*********************  USER LOGOUT ********************/

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

/*********************  USER UPDATEPROFILE ********************/

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    // cloudinary
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume comes later here...
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    console.log(
      fullname,
      email,
      phoneNumber,
      bio,
      skills,
      user.profile.resume,
      user.profile.resumeOriginalName
    );

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

/*********************  USER EDUCATION ********************/

export const updateEducation = async (req, res) => {
  try {
    const { degree, instituteName, duration, location } = req.body;

    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    if (degree) user.education.degree = degree;
    if (instituteName) user.education.instituteName = instituteName;
    if (duration) user.education.duration = duration;
    if (location) user.education.location = location;

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      education: user.education,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

/*********************  USER ADD/UPDATE EXPERIENCE ********************/
export const addExperience = async (req, res) => {
  try {
    const userId = req.id;
    const { experience } = req.body; // Receive the array of experiences

    if (!experience || !Array.isArray(experience) || experience.length === 0) {
      return res.status(400).json({
        message: "Experience data is required.",
        success: false,
      });
    }

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    experience.forEach((exp) => {
      const { companyName, jobRole, duration, location } = exp;

      // Check if experience already exists (case-insensitive)
      const existingExperienceIndex = user.experience.findIndex(
        (existingExp) =>
          existingExp.companyName.toLowerCase() ===
          companyName.toLowerCase().trim()
      );

      if (existingExperienceIndex !== -1) {
        // Update existing experience
        user.experience[existingExperienceIndex].jobRole =
          jobRole || user.experience[existingExperienceIndex].jobRole;
        user.experience[existingExperienceIndex].duration =
          duration || user.experience[existingExperienceIndex].duration;
        user.experience[existingExperienceIndex].location =
          location || user.experience[existingExperienceIndex].location;
      } else {
        // Add new experience if it doesn't exist
        user.experience.push({
          companyName: companyName.trim(),
          jobRole,
          duration,
          location,
        });
      }
    });

    await user.save(); // Save user with updated experience

    return res.status(200).json({
      message: "Experience(s) added/updated successfully.",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while adding/updating experience.",
      success: false,
      error: error.message,
    });
  }
};

/*********************  USER UPDATE SPECIFIC EXPERIENCE ********************/
export const updateExperience = async (req, res) => {
  try {
    const userId = req.id; // Assuming userId is extracted from the authenticated user's session or token
    const { experienceId, companyName, jobRole, duration, location } = req.body; // Get experienceId from the body

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // Find the specific experience by experienceId
    const experienceIndex = user.experience.findIndex(
      (exp) => exp._id.toString() === experienceId
    );

    if (experienceIndex === -1) {
      return res.status(404).json({
        message: "Experience not found.",
        success: false,
      });
    }

    // Update fields if provided
    if (companyName) user.experience[experienceIndex].companyName = companyName;
    if (jobRole) user.experience[experienceIndex].jobRole = jobRole;
    if (duration) user.experience[experienceIndex].duration = duration;
    if (location) user.experience[experienceIndex].location = location;

    await user.save(); // Save user with updated experience

    return res.status(200).json({
      message: "Experience updated successfully.",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating experience.",
      success: false,
      error: error.message,
    });
  }
};

/*********************  USER DELETE EXPERIENCE ********************/
export const deleteExperience = async (req, res) => {
  try {
    const userId = req.id;
    const { experienceId } = req.params; // Get the experience ID from the request params

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // Find the specific experience by experienceId and remove it
    const updatedExperience = user.experience.filter(
      (exp) => exp._id.toString() !== experienceId
    );

    if (updatedExperience.length === user.experience.length) {
      return res.status(404).json({
        message: "Experience not found.",
        success: false,
      });
    }

    user.experience = updatedExperience; // Update user's experience array

    await user.save(); // Save user with updated experience

    return res.status(200).json({
      message: "Experience deleted successfully.",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while deleting experience.",
      success: false,
      error: error.message,
    });
  }
};

 
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({
          message: "No users found.",   
          success: false
      });
  }
    return res.status(200).json({ users, success: true });
  } catch (error) { 
    console.log(error);
  } 

}
