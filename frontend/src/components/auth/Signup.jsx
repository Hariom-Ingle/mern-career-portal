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
    const formData = new FormData();
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
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <form onSubmit={submitHandler} className="flex flex-col items-center">
              <div className="w-full flex-1 mt-1">
              <div class="my-12 border-b text-center">
                  <div class="leading-none px-2 inline-block text-l text-[#011106] tracking-wide font-semibold uppercase bg-white transform translate-y-1/2">
                    sign up
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <div className="my-2">
                    <Label className="  leading-none   inline-block text-l text-[#011106] tracking-wide font-semibold uppercase bg-white transform translate-y-1/2">Full Name</Label>
                    <Input
                      type="text"
                      value={input.fullname}
                      name="fullname"
                      onChange={changeEventHandler}
                      placeholder="Full Name"
                      className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    />
                  </div>

                  <div className="my-2">
                    <Label className="  leading-none   inline-block text-l text-[#011106] tracking-wide font-semibold uppercase bg-white transform translate-y-1/2">Email</Label>
                    <Input
                      type="email"
                      value={input.email}
                      name="email"
                      onChange={changeEventHandler}
                      placeholder="email"
                      className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    />
                  </div>

                  <div className="my-2">
                    <Label className="  leading-none   inline-block text-l text-[#011106] tracking-wide font-semibold uppercase bg-white transform translate-y-1/2">Phone Number</Label>
                    <Input
                      type="text"
                      value={input.phoneNumber}
                      name="phoneNumber"
                      onChange={changeEventHandler}
                      placeholder="Phone No"
                      className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    />
                  </div>

                  <div className="my-2">
                    <Label className="  leading-none   inline-block text-l text-[#011106] tracking-wide font-semibold uppercase bg-white transform translate-y-1/2">Password</Label>
                    <Input
                      type="password"
                      value={input.password}
                      name="password"
                      onChange={changeEventHandler}
                      placeholder="password"
                      className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    />
                  </div>

                  <div className="flex flex-col justify-between my-5">
                    <RadioGroup className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="radio"
                          name="role"
                          value="student"
                          checked={input.role === "student"}
                          onChange={changeEventHandler}
                          className="cursor-pointer"
                        />
                        <Label   htmlFor="r1">Student</Label>
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
                        <Label   htmlFor="r2">Recruiter</Label>
                      </div>
                    </RadioGroup>

                    <div className="flex items-center gap-2 mt-4">
                      <Label  >Profile</Label>
                      <Input
                        accept="image/*"
                        type="file"
                        onChange={changeFileHandler}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  {loading ? (
                    <Button className="w-full my-4 mt-5 bg-green-400 text-white py-4 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full my-4 mt-5 bg-green-400 text-white py-4 rounded-lg hover:bg-green-700 transition-all"
                    >
                      Signup
                    </Button>
                  )}

                  <span className="text-sm mt-5">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600">
                      Login
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
