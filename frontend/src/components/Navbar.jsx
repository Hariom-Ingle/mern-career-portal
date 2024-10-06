import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <>
      {/* <div className="bg-white">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
          <div>
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#F83002]">Portal</span>
            </h1>
          </div>
          <div className="flex items-center gap-12">
            <ul className="flex font-medium items-center gap-5">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                  <LogOut />
                  <Button onClick={logoutHandler} variant="link">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li>
                    <Link to="/browse">Browse</Link>
                  </li>
                </>
              )}
            </ul>
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="">
                      <div className="flex gap-2 space-y-2">
                        <Avatar className="cursor-pointer">
                          <AvatarImage
                            src={user?.profile?.profilePhoto}
                            alt="@shadcn"
                          />
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{user?.fullname}</h4>
                          <p className="text-sm text-muted-foreground">
                            {user?.profile?.bio}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col my-2 text-gray-600">
                        {user && user.role === "student" && (
                          <div className="flex w-fit items-center gap-2 cursor-pointer">
                            <User2 />
                            <Button variant="link">
                              {" "}
                              <Link to="/profile">View Profile</Link>
                            </Button>
                          </div>
                        )}

                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                          <LogOut />
                          <Button onClick={logoutHandler} variant="link">
                            Logout
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            )}
          </div>
        </div>
      </div> */}

      <nav className="bg-white-400">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-2xl font-bold">
                  Job<span className="text-[#F83002]">Portal</span>
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {user && user.role === "recruiter" ? (
                    <>
                      <Link
                        to="/"
                        className="relative px-3 py-2 text-sm font-semibold text-[#161D6F] transition ease-linear duration-300 hover:text-blue-500 group"
                        aria-current="page"
                      >
                        Home
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                      </Link>
                      <Link
                        to="/admin/companies"
                        className="relative px-3 py-2 text-sm font-semibold text-[#161D6F] transition ease-linear duration-300 hover:text-blue-500 group"
                        aria-current="page"
                      >
                        Companies
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                      </Link>
                      <Link
                        to="/admin/jobs"
                        className="relative px-3 py-2 text-sm font-semibold text-[#161D6F] transition ease-linear duration-300 hover:text-blue-500 group"
                        aria-current="page"
                      >
                        Jobs
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                      </Link>
                      
 
                    </>
                  ) : (
                    <>
                      <Link
                        to="/"
                        className="relative px-3 py-2 text-sm font-semibold text-[#161D6F] transition ease-linear duration-300 hover:text-blue-500 group"
                        aria-current="page"
                      >
                        Home
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                      </Link>

                      <Link
                        to="/jobs"
                        className="relative px-3 py-2 text-sm font-semibold text-[#161D6F] transition ease-linear duration-300 hover:text-blue-500 group"
                      >
                        Jobs
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                      </Link>

                      <Link
                        to="/browse"
                        className="relative px-3 py-2 text-sm font-semibold text-[#161D6F] transition ease-linear duration-300 hover:text-blue-500 group"
                      >
                        Browse
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {user ? (
                <div className="relative ml-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="@shadcn"
                        />
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="">
                        <div className="flex gap-2 space-y-2">
                          <Avatar className="cursor-pointer">
                            <AvatarImage
                              src={user?.profile?.profilePhoto}
                              alt="@shadcn"
                            />
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{user?.fullname}</h4>
                            <p className="text-sm text-muted-foreground">
                              {user?.profile?.bio}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col my-2 text-gray-600">
                          {user && user.role === "student" && (
                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                              <User2 />
                              <Button variant="link">
                                {" "}
                                <Link to="/profile">View Profile</Link>
                              </Button>
                            </div>
                          )}

                          <div className="flex w-fit items-center gap-2 cursor-pointer">
                            <LogOut />
                            <Button onClick={logoutHandler} variant="link">
                              Logout
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                      Signup
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
            >
              Dashboard
            </Link>
            <Link
              to="/jobs"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Jobs
            </Link>
            <Link
              to="/browse"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Browse
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
