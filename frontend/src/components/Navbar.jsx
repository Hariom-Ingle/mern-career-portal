import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [navOpen, setNavOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-700 shadow-lg rounded-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="relative flex h-16 items-center justify-between">
          {/* Left Section: Logo and Menu Toggle */}
          <div className="flex flex-1 items-center justify-start gap-3 sm:items-stretch sm:justify-start">
            <div className="sm:hidden">
              <button
                onClick={() => setNavOpen(!navOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
              >
                {navOpen ? (
                  <X className="block h-6 w-6 transition-transform duration-300" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6 transition-transform duration-300" aria-hidden="true" />
                )}
              </button>
            </div>

            <div className="flex items-center">
              <h1 onClick={() => navigate("/")} className="text-2xl font-extrabold text-white">
                Job<span className="text-yellow-400">Portal</span>
              </h1>
            </div>
          </div>

          {/* Right Section: Links and Avatar */}
          <div className="hidden sm:flex sm:items-center sm:gap-4 mr-4">
            <Link to="/" className="text-white hover:text-yellow-300 transition-colors duration-300 ">
              Home
            </Link>
            <Link to="/jobs" className="text-white hover:text-yellow-300 transition-colors duration-300">
              Jobs
            </Link>

            {user && user.role === "recruiter" && (
              <>
                <Link to="/companies" className="text-white hover:text-yellow-300 transition-colors duration-300">
                  Companies
                </Link>
                <Link to="/addjob" className="text-white hover:text-yellow-300 transition-colors duration-300">
                  Add Job
                </Link>
              </>
            )}

            {user && user.role === "admin" && (
              <Link to="/admin/dashboard" className="text-white hover:text-yellow-300 transition-colors duration-300">
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Avatar and Logout */}
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-2 p-4 bg-gray-50 rounded-md">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <div className="flex items-center gap-2 text-gray-600 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      <Link to={user.role === "student" ? "/profile" : user.role === "admin" ? "/admin/dashboard" : user.role === "recruiter" ? "/recruiter/profile" : "/"}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="text-white border-white hover:bg-yellow-400">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-yellow-400 hover:bg-yellow-500">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <div className="sm:hidden bg-white shadow-md transition-all duration-300">
          <div className="px-4 py-2">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-md">
              Home
            </Link>
            <Link to="/jobs" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-md">
              Jobs
            </Link>
            {user && user.role === "student" && (
              <Link to="/browse" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-md">
                Browse
              </Link>
            )}
            {user && user.role === "recruiter" && (
              <>
                <Link to="/companies" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-md">
                  Companies
                </Link>
                <Link to="/addjob" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-md">
                  Add Job
                </Link>
              </>
            )}
            {user && user.role === "admin" && (
              <>
                <Link to="/admin/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-md">
                  Admin Dashboard
                </Link>
                <Link to="/admin/users" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-md">
                  Manage Users
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
