import React, {  useState } from "react";
import { Img, Text, Heading, Button, Input } from "../../components";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, getCurrentUser } from "../../store/authSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function SIGNINPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(" ");

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(loginUser(data)).unwrap();
      const user = await dispatch(getCurrentUser()).unwrap();
      if (user && response) {
        navigate("/");
      }
    } catch (error) {
      setError("Invalid email or password");
      toast.error("Invalid email or password")
    }
  };

  return (
    <>
    
      <div className="w-full h-screen">
        <div className="flex md:flex-col h-full">
          <div className="w-full md:px-5  h-full ">
            <div className="bg-white-a700 p-[46px] h-full  md:p-0 ">
              <div className="mb-[336px] md:mb-0 flex flex-col gap-[50px] md:gap-5 h-full justify-center ">
                <Img
                  src="/poster/logo.png"
                  alt="Fashion Image"
                  className="h-[60px] w-[20%] md:w-full object-contain"
                />
                <div className="flex flex-col items-center gap-[22px]">
                  <div className="flex flex-col items-center gap-6 self-stretch">
                    <div className="flex flex-col items-start justify-center gap-7 self-stretch">
                      <Heading
                        size="heading3xl"
                        as="h1"
                        className="text-[26px] font-semibold md:text-[24px] sm:text-[22px]"
                      >
                        Sign in to your account
                      </Heading>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-8 self-stretch"
                      >
                        <div className="flex flex-col items-start justify-center gap-1.5">
                          <Text as="p" className="text-[18px] font-medium">
                            Email Address
                          </Text>
                          <Input
                            shape="round"
                            type="email"
                            name="Email Input"
                            placeholder={"Email Address"}
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Invalid email address",
                              },
                            })}
                            className="self-stretch rounded-md border border-solid border-blue_gray-100 px-[18px]"
                          />
                          {errors.email && (
                            <p className="text-red-600">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-5">
                          <div className="flex flex-col items-start justify-center gap-1.5 self-stretch">
                            <Text as="p" className="text-[18px] font-medium">
                              Password
                            </Text>
                            <Input
                              shape="round"
                              type="password"
                              name="Password Input"
                              placeholder={"Password"}
                              {...register("password", {
                                required: "Password is required",
                              })}
                              className="self-stretch rounded-md border border-solid border-blue_gray-100 px-[18px]"
                            />
                            {errors.password && (
                              <p className="text-red-600">
                                {errors.password.message}
                              </p>
                            )}
                          </div>
                          <a href="#">
                            <Heading
                              size="headingmd"
                              as="h2"
                              className="text-[16px] font-semibold"
                            >
                              Forgot Password?
                            </Heading>
                          </a>
                        </div>

                        <Button
                          color="blue_gray_900_01"
                          shape="round"
                          type="submit"
                          className="self-stretch rounded-md px-[34px] sm:px-5"
                        >
                          SIGN IN
                        </Button>
                      </form>
                      <a></a>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <a href="#">
                        <Text
                          size="textmd"
                          as="p"
                          className="text-[16px] font-normal"
                        >
                          Don't have an account?
                        </Text>
                      </a>
                      <a >
                        <button
                          size="headingmd"
                          as="h3"
                          className="text-[16px] font-bold"
                          onClick={()=>navigate('/signup')}
                        >
                          Sign Up
                        </button>
                      </a>
                    </div>
                  </div>
                  <div className="h-px w-full self-stretch bg-gray-200" />
                  <div className="flex flex-wrap gap-[22px]">
                    <a href="#">
                      <Text
                        size="textmd"
                        as="p"
                        className="text-[16px] font-normal !text-blue_gray-200"
                      >
                        Terms & Conditions
                      </Text>
                    </a>
                    <a href="#" className="self-end">
                      <Text
                        size="textmd"
                        as="p"
                        className="text-[16px] font-normal !text-blue_gray-200"
                      >
                        Privacy Policy
                      </Text>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:hidden md:px-5 h-full">
            <Img
              src="poster/art4.jpg"
              alt="Featured Image"
              className="h-full w-full object-cover md:h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}
