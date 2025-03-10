import React, { useState } from "react";
import {
  Img,
  Text,
  Heading,
  Button,
  Input,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "../../store/authSlice";
import { useForm } from "react-hook-form";

export default function SIGNUPPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(signupUser(data)).unwrap();
      const { email, password } = data;
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/");
    } catch (error) {
      setError(error.message || "An error occurred during signuup. ");
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex w-full   h-screen md:flex-col">
        <div className="w-full h-full">
          <div className="bg-white-a700 p-[46px] h-full md:p-5">
            <div className="mb-[296px] md:mb-0 flex flex-col gap-[50px] md:w-full sm:w-full md:gap-5 h-full justify-center  ">
              <Img
                 src="/poster/logo.png"
                alt="Fashion Image"
                className="h-[60px] w-[20%] md:w-full object-contain"
              />
              <div className="flex flex-col items-center gap-6">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col items-start justify-center gap-[30px] self-stretch"
                >
                  <Heading
                    size="heading3x1"
                    as="h1"
                    className="text-[26px] font-semibold md:text-[24px] sm:text-[22px]"
                  >
                    Sign up to create your account
                  </Heading>
                  <div className="flex flex-col items-center gap-6 self-stretch">
                    <div className="flex gap-6 self-stretch md: flex-col">
                      <div className="flex w-full flex-col items-start justify-center gap-1.5">
                        <Text as="p" className="text-[18px] font-medium">
                          Full Name
                        </Text>
                        <Input
                          
                          placeholder={" Enter your fullname"}
                          {...register("fullName", {
                            required: "FullName is required",
                          })}
                          className="self-stretch rounded-md border border-solid border-blue_gray-100 px-[18px]"
                        />
                        {errors.fullName && (
                          <p className="text-red-600">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1.5 self-stretch">
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
                        <p className="text-red-600">{errors.email.message}</p>
                      )}
                    </div>
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
                  </div>
                  <Button
                    color="blue_gray_900_01"
                    type="submit"
                    shape="round"
                    className="self-stretch rounded-md px-[34px] sm:px-5"
                  >
                    SIGN UP
                  </Button>
                </form>
                <div className="flex flex-wrap gap-1.5">
                  <Text
                    size="textmd"
                    as="p"
                    className="self-end text-[16px] font-normal"
                  >
                    Already have account?
                  </Text>
                  <a>
                    <button
                      size="headingmd"
                      as="h2"
                      onClick={()=>navigate('/')}
                      className="text-[20px] font-bold"
                    >
                      Sign In
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:hidden md:px-5 h-full">
          <Img
            src="poster/art3.jpg"
            alt="Featured Image"
            className="h-full w-full object-cover md:h-auto"
          />
        </div>
      </div>
    </>
  );
}
