import React from "react";
import { Mail, User } from "lucide-react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavigationSidebar from "../../components/NavigationSidebar";
import { useSelector } from "react-redux";

export default function MyAccountPersonalInformationPage() {

  const userData = useSelector((state) => state.auth.userData);
  
  return (
    <div className="flex w-full flex-col gap-[88px] bg-white-a700 md:gap-[66px] sm:gap-11 ">
      <div className="flex flex-col gap-6">
        <Header />
        <div className="flex flex-col items-center">
          <div className="container-xs flex flex-col gap-[22px] md:px-5">
            <div className="flex items-start gap-6  md:flex-col">
              <NavigationSidebar />
              <div className="flex flex-1  justify-center gap-[22px] md:flex-col md:self-stretch">
                <div className=" md:hidden h-[660px] w-px bg-gray-300 md:h-px md:w-[660px]" />
                <div className="flex flex-1 flex-col gap-5 md:self-stretch ">
                  <div className=" p-6 bg-white ">
                    <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
                      Personal Information
                    </h2>

                    <div className="flex items-center bg-gray-100 p-3 rounded-lg mb-3">
                      <User className="w-6 h-6 text-blue-500" />
                      <p className="text-xl font-semibold px-3 text-gray-700">
                        Full Name:
                      </p>
                      <p className="text-xl text-gray-900">
                        {userData.fullName}
                      </p>
                    </div>

                    <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-green-500" />
                      <p className="text-xl font-semibold px-3 text-gray-700">
                        Email:
                      </p>
                      <p className="text-xl text-gray-900">{userData.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
