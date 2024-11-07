import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import AppliedJobTable from "@/components/AppliedJobTable";

import {
  CalendarDays,
  Contact,
  GraduationCap,
  Mail,
  MapPin,
  Pen,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import UpdateProfileDialog from "../components/UpdateProfileDialog.jsx";
import UpdateEducationDialog from "../components/UpdateEducationDialog.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import AddExperienceDialog from "../components/AddExperienceDialog";
import UpdateExperienceDialog from "../components/UpdateExprienceDialog";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [openProfiledialog, setOpenProfiledialog] = useState(false);
  const [openEducationdialog, setOpenEducationdialog] = useState(false);
  const [openAddExperienceDialog, setOpenAddExperienceDialog] = useState(false);
  const [openUpdateExperienceDialog, setOpenUpdateExperienceDialog] = useState(false);
  const [openRemoveExperienceDialog, setOpenRemoveExperienceDialog] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null); // for updating the experience
  const { user } = useSelector((store) => store.auth);

  const handleUpdateExperience = (experience) => {
    setCurrentExperience(experience);
    setOpenUpdateExperienceDialog(true);
  };
 
  const [selectedTab, setSelectedTab] = useState("profile");

  console.log(user);

  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-5">
        <div className="flex flex-col md:flex-row">
        
          {/* Sidebar */}
          <nav className="md:w-1/4 bg-white h-full p-5 rounded-xl border border-gray-200 mb-5 md:mb-0">
            <div className="w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-2 border-green-300 overflow-hidden mx-auto">
              <img
                src={user?.profile?.profilePhoto}
                alt={`${user?.fullname}'s Profile`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center my-3">
              <h1 className="text-lg font-bold text-black">{user?.fullname}</h1>
            </div>

            {/* Sidebar Navigation */}
            <div className="flex justify-between md:flex-col overflow-x-auto md:overflow-visible gap-5 text-black text-center my-5 md:gap-2 md:space-y-2">
              {["profile", "bookmarks", "applications", "account"].map((tab) => (
                <div
                  key={tab}
                  className={`cursor-pointer p-2 hover:bg-slate-100 hover:transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110   duration-300 ... rounded whitespace-nowrap ${
                    selectedTab === tab ? "bg-slate-300 shadow-xl shadow-zinc-400 " : ""
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </div>
              ))}
            </div>
          </nav>

          {/* Right Content Area */}
          <div className="md:w-3/4 px-5 rounded-xl ml-0 md:ml-5 h-screen overflow-y-auto  " >
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl  ">
              {/* Profile Section */}
              {selectedTab === "profile" && (
                <>
                  <div>
                    <div className="flex  flex-col gap-2 text-left border-b-2 p-5  ">
                      <h1 className="text-2xl font-bold ">Profile </h1>
                      <p className="font-small text-md  mb-5">
                        Elevate your Job Finder experience by managing your
                        employment information, and unlock new career
                        opportunities.
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-5 p-5">
                      <div>
                        <h1 className=" text-xl font-medium mb-2">
                          {user?.fullname}
                        </h1>
                        <p className="text-small">{user?.profile?.bio}</p>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              onClick={() => setOpenProfiledialog(true)}
                              variant="outline"
                            >
                              <Pen />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="border-2 text-pink-700 p-1">
                              Update profile
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="my-5 px-5">
                      <div className="flex items-center gap-3 my-2">
                        <Mail />
                        <span>{user?.email}</span>
                      </div>
                      <div className="flex items-center gap-3 my-2">
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                      </div>
                    </div>

                    <div className="my-5 px-5">
                      <h1 className="text-xl font-medium mb-2">Skills</h1>
                      <div className="flex flex-wrap gap-2">
                        {user?.profile?.skills.length ? (
                          user?.profile?.skills.map((item, index) => (
                            <Badge variant="outline" className="  bg-slate-200" key={index}>{item}</Badge>
                          ))
                        ) : (
                          <span>NA</span>
                        )}
                      </div>
                    </div>

                    <div className="my-5 px-5">
                      <h1 className="text-xl font-medium mb-2">Resume</h1>
                      <div>
                        {isResume ? (
                          <a
                            target="blank"
                            href={user?.profile?.resume}
                            className="text-blue-500 hover:underline"
                          >
                            {user?.profile?.resumeOriginalName}
                          </a>
                        ) : (
                          <span>NA</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/************ EDUCATION UPDATE **************/}
                  <div className="border-t-2 mt-5">
                    <div className="flex  flex-col gap-2 text-left border-b-2 mt-5 p-5 ">
                      <h1 className="text-2xl font-bold">
                        Education Details{" "}
                      </h1>
                      <p className="font-small text-md  mb-5">
                        Elevate your Job Finder experience by managing your
                        employment information, and unlock new career
                        opportunities.
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3 py-1 px-5">
                      <div className="flex flex-col gap-2">
                        <h2>{user?.education?.instituteName}</h2>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              onClick={() => setOpenEducationdialog(true)}
                              variant="outline"
                            >
                              <Pen />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="border-2 text-pink-700 p-1">
                              Update Education
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="flex flex-row gap-2 py-1 px-5">
                      <GraduationCap />
                      <p>{user?.education?.degree}</p>
                    </div>

                    <div className="flex flex-row gap-2 py-1 px-5">
                      <CalendarDays />
                      <p>{user?.education?.duration}</p>
                    </div>

                    <div className="flex flex-row gap-2 py-1 px-5">
                      <MapPin />
                      <p>Yavatmal</p>
                    </div>
                  </div>
                  {/************ add JOB EXPRIENCE **************/}
                  <div className="border-t-2 mt-5">
                    <div className="flex justify-between items-center p-5">
                      <h1 className="text-2xl font-bold">
                        Experience Details
                      </h1>
                      <Button
                        onClick={() => setOpenAddExperienceDialog(true)}
                        variant="outline"
                      >
                        ADD+
                      </Button>
                    </div>

                    {/* List of Experiences */}
                    {user?.experience?.length > 0 ? (
                      user.experience.map((experience) => (
                        <div
                          key={experience?._id}
                          className="flex justify-between  mt-3 py-3 px-5 border-b"
                        >
                          <div className="flex flex-col gap-2">
                            <h2 className="font-medium text-lg">
                              {experience?.companyName}
                            </h2>
                            <div className="flex items-center gap-3">
                              <span>{experience?.jobRole}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <CalendarDays />
                              <span>{experience?.duration}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <MapPin />
                              <span>{experience?.location}</span>
                              <span></span>
                            </div>
                          </div>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  onClick={() =>
                                    handleUpdateExperience(experience)
                                  }
                                  variant="outline"
                                >
                                  <Pen />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="border-2 text-pink-700 p-1">
                                  Update Experience
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        
                        </div>
                      ))
                    ) : (
                      <p className="p-5">No experience added yet.</p>
                    )}
                  </div>
                </>
              )}

              {/* Bookmarks Section */}
              {selectedTab === "bookmarks" && (
                <div>
                  <h1 className="text-2xl font-bold p-5">Bookmarks</h1>
                  <p>Your bookmarked jobs will appear here.</p>
                </div>
              )}

              {/* Applications Section */}
              {selectedTab === "applications" && (
                <div>
                  <h1 className=" text-2xl font-bold p-5">Applications</h1>
                   <AppliedJobTable/>
                </div>
              )}

              {/* Account Section */}
              {selectedTab === "account" && (
                <div>
                  <h1 className="font-medium text-xl p-5">Account Settings</h1>
                  <p>Update your account details here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog
        open={openProfiledialog}
        setOpen={setOpenProfiledialog}
      />
      <UpdateEducationDialog
        open={openEducationdialog}
        setOpen={setOpenEducationdialog}
      />
      {/* Add Experience Dialog */}
      <AddExperienceDialog
        open={openAddExperienceDialog}
        setOpen={setOpenAddExperienceDialog}
      />

      {/* Update Experience Dialog */}
      {currentExperience && (
        <UpdateExperienceDialog
          open={openUpdateExperienceDialog}
          setOpen={setOpenUpdateExperienceDialog}
          experience={currentExperience} // Pass the selected experience
        />
      )}
 
    </div>
  );
};

export default Profile;
