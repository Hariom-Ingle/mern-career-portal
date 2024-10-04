import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { Contact, Mail, Pen } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import UpdateProfileDialog from "../components/UpdateProfileDialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("profile");
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-5">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar - Image and Navigation */}
          <div className="md:w-1/4 bg-slate-500 h-full p-5 rounded-xl mb-5 md:mb-0">
            {/* Profile Image */}
            <div className="w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden mx-auto">
              <img
                src={user?.profile?.profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center my-3">
              <h2 className="text-lg font-bold text-white">{user?.fullname}</h2>
            </div>

            {/* Navigation Links - Horizontal Scroll on Mobile */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 text-white text-center my-5 md:my-0 md:gap-2 md:space-y-2">
              <div
                className={`cursor-pointer p-2 hover:bg-slate-700 rounded whitespace-nowrap ${
                  selectedTab === "profile" ? "bg-slate-600" : ""
                }`}
                onClick={() => setSelectedTab("profile")}
              >
                My Profile
              </div>
              <div
                className={`cursor-pointer p-2 hover:bg-slate-700 rounded whitespace-nowrap ${
                  selectedTab === "bookmarks" ? "bg-slate-600" : ""
                }`}
                onClick={() => setSelectedTab("bookmarks")}
              >
                Bookmarks
              </div>
              <div
                className={`cursor-pointer p-2 hover:bg-slate-700 rounded whitespace-nowrap ${
                  selectedTab === "applications" ? "bg-slate-600" : ""
                }`}
                onClick={() => setSelectedTab("applications")}
              >
                Applications
              </div>
              <div
                className={`cursor-pointer p-2 hover:bg-slate-700 rounded whitespace-nowrap ${
                  selectedTab === "account" ? "bg-slate-600" : ""
                }`}
                onClick={() => setSelectedTab("account")}
              >
                Account
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="md:w-3/4 p-5 rounded-xl ml-0 md:ml-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              {/* Profile Section */}
              {selectedTab === "profile" && (
                <div>
                  <div className="flex  flex-col gap-2 text-left border-b-2 ">
                    <h1 className="font-medium text-3xl">Profile </h1>
                    <p className="font-small text-md  mb-5">
                      Elevate your Job Finder experience by managing your
                      employment information, and unlock new career
                      opportunities.
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <div>
                      <h1 className="font-medium text-3xl mb-2">{user?.fullname}</h1>
                      <p className="text-small">{user?.profile?.bio}</p>
                    </div>


                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                            <Button onClick={() => setOpen(true)} variant="outline">
                      <Pen />
                    </Button>
                            </TooltipTrigger>
                            <TooltipContent>
      <p className="border-2 text-pink-700 p-1">Update profile</p>
    </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    
                  </div>

                  <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                      <Mail />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                      <Contact />
                      <span>{user?.phoneNumber}</span>
                    </div>
                  </div>

                  <div className="my-5">
                    <h1>Skills</h1>
                    <div className="flex flex-wrap gap-2">
                      {user?.profile?.skills.length ? (
                        user?.profile?.skills.map((item, index) => (
                          <Badge key={index}>{item}</Badge>
                        ))
                      ) : (
                        <span>NA</span>
                      )}
                    </div>
                  </div>

                  <div className="my-5">
                    <h1>Resume</h1>
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
              )}

              {/* Bookmarks Section */}
              {selectedTab === "bookmarks" && (
                <div>
                  <h1 className="font-medium text-xl">Bookmarks</h1>
                  <p>Your bookmarked jobs will appear here.</p>
                </div>
              )}

              {/* Applications Section */}
              {selectedTab === "applications" && (
                <div>
                  <h1 className="font-medium text-xl">Applications</h1>
                  <p>Your job applications will appear here.</p>
                </div>
              )}

              {/* Account Section */}
              {selectedTab === "account" && (
                <div>
                  <h1 className="font-medium text-xl">Account Settings</h1>
                  <p>Update your account details here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
