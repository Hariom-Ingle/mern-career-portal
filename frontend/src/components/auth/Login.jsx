import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
       

      <div  className="  bg-gray-100 text-gray-900 flex justify-center">
        <div  className="max-w-screen-xl m-0 sm:mx-10 sm:mt-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div  className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <form
              onSubmit={submitHandler}
               className="mt-2 flex flex-col items-center"
            >
              <div  className="w-full flex-1 mt-1">
                 

                <div  className="my-12 border-b text-center">
                  <div  className="leading-none px-2 inline-block text-l text-[#011106] tracking-wide font-semibold uppercase bg-white transform translate-y-1/2">
                    sign In
                  </div>
                </div>

                <div  className="mx-auto max-w-xs">
                  <div className="my-2 font-semibold">
                    <Label className="  leading-none   inline-block text-l text-[#011106] tracking-wide font-semibold   bg-white transform translate-y-1/2">Email</Label>
                    <Input
                       className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      value={input.email}
                      name="email"
                      onChange={changeEventHandler}
                      placeholder="Email"
                    />
                  </div>
                  <div className="my-2">
                    <Label className="  leading-none   inline-block text-l text-[#011106] tracking-wide font-semibold   bg-white transform translate-y-1/2">Password</Label>
                    <Input
                       className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      value={input.password}
                      name="password"
                      onChange={changeEventHandler}
                      placeholder="Password"
                    />
                  </div>

                  <div className="flex   justify-between">
                    <RadioGroup className="flex items-center my-5">
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <Input
                            type="radio"
                            name="role"
                            value="student"
                            checked={input.role === "student"}
                            onChange={changeEventHandler}
                            className="cursor-pointer"
                          />
                          <span className="text-[#011106] ">Student</span>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <Input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={input.role === "admin"}
                            onChange={changeEventHandler}
                            className="cursor-pointer"
                          />
                          <span>admin</span>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <Input
                            type="radio"
                            name="role"
                            value="recruiter"
                            checked={input.role === "recruiter"}
                            onChange={changeEventHandler}
                            className="cursor-pointer"
                          />
                          <span>Recruiter</span>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                  {loading ? (
                    <Button className="w-full my-2">
                      {" "}
                      <Loader className="mr-2 h-5 w-5 animate-spin" />  {" "}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                       className=" my-2 mt-5 tracking-wide font-semibold bg-gradient-to-r from-blue-500 to-purple-700 shadow-lg text-white-500 w-full py-4 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      Login
                    </Button>
                  )}
                  <span className="text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600">
                      Signup
                    </Link>
                  </span>

                  
                </div>
              </div>
            </form>
          </div>

          <div className="flex-1 bg-green-100 text-center justify-center align-middle hidden lg:flex" style={{ fontFamily: "'Poppins', sans-serif" }}>
  <div className="m-12 xl:m-16 w-full flex align-center justify-center">
    <h1 className="text-3xl font-semibold text-[#011106]">
      Welcome Back,<br />
      Let’s Get You Hired
    </h1>
  </div>
</div>
        </div>
      </div>
    </>
  );
};

export default Login;
