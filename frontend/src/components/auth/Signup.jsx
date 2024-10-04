import { setLoading } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //formdata object
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Navbar />
      {/* <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="patel"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="8080808080"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div> */}

      <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            
            <form
              onSubmit={submitHandler}
              class=" flex flex-col items-center"
            >
              <div class="w-full flex-1 mt-1">
                {/* <div class="flex flex-col items-center">
                  <button class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div class="bg-white p-2 rounded-full">
                      <svg class="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span class="ml-4">Sign In with Google</span>
                  </button>
                </div> */}

                <div class="mb-6 border-b text-center">
                  <div class="leading-none px-2 inline-block text-l text-[#011106] tracking-wide font-medium bg-white transform translate-y-1/2">
                     sign In 
                  </div>
                </div>

                <div class="mx-auto max-w-xs">
                  <div className="my-2">
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      value={input.fullname}
                      name="fullname"
                      onChange={changeEventHandler}
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="my-2">
                    <Label>Email</Label>
                    <Input
                      class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      value={input.email}
                      name="email"
                      onChange={changeEventHandler}
                      placeholder="patel@gmail.com"
                    />
                  </div>
                  <div className="my-2">
                    <Label>Phone Number</Label>
                    <Input
                      class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="text"
                      value={input.phoneNumber}
                      name="phoneNumber"
                      onChange={changeEventHandler}
                      placeholder="8080808080"
                    />
                  </div>
                  <div className="my-2">
                    <Label>Password</Label>
                    <Input
                      class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      value={input.password}
                      name="password"
                      onChange={changeEventHandler}
                      placeholder="patel@gmail.com"
                    />
                  </div>

                  <div className="flex flex-col items-right justify-between">
                    <RadioGroup className="flex items-center gap-4 my-5">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="radio"
                          name="role"
                          value="student"
                          checked={input.role === "student"}
                          onChange={changeEventHandler}
                          className="cursor-pointer"
                        />
                        <Label htmlFor="r1">Student</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="radio"
                          name="role"
                          value="recruiter"
                          checked={input.role === "recruiter"}
                          onChange={changeEventHandler}
                          className="cursor-pointer"
                        />
                        <Label htmlFor="r2">Recruiter</Label>
                      </div>
                    </RadioGroup>
                    <div className="flex items-center gap-2">
                      <Label>Profile</Label>
                      <Input
                        accept="image/*"
                        type="file"
                        onChange={changeFileHandler}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  {loading ? (
                    <Button
                      className="w-full my-4"
                      class="w-full my-4 mt-5 tracking-wide font-semibold bg-green-400 text-white-500 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      {" "}
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait{" "}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      class=" my-4 mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      Signup
                    </Button>
                  )}
                  <span className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600">
                      Login
                    </Link>
                  </span>

                  {/* <p class="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by Cartesian Kinetics
                    <a href="#" class="border-b border-gray-500 border-dotted">
                      Terms of Service
                    </a>
                    and its
                    <a href="#" class="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                  </p> */}
                </div>
              </div>
            </form>
          </div>

          <div class="flex-1 bg-green-100 text-center   justify-center align-middle hidden lg:flex">
            <div
              class="m-12 xl:m-16 w-full  flex align-center justify-center "
            >
                <h1 className=" text-5xl text-[#064119]">Better hiring, <br />
                 all-together.</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
