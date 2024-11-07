import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAllCompaniesAdmin } from "../controllers/company.controller.js";
import { getAllUsers } from "../controllers/user.controller.js";
import { updateStatus } from "../controllers/company.controller.js";
 

const router = express.Router();

router.route("/companies").get(isAuthenticated,getAllCompaniesAdmin);
router.route("/users").get(isAuthenticated,getAllUsers);
router.route("/:id/update").post(isAuthenticated, updateStatus);
 
export default router;

