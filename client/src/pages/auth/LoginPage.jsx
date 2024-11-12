import { Link, Loader } from "lucide-react";
import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import img from "../../../dist/small-logo.png";
import { useNavigate } from "react-router-dom";

export default function SiginForm() {
  const navigate = useNavigate();
  const handleJoinNow = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-40 w-auto" src={img} alt="LinkedIn" />
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
          
        </div>
      </div>
    </div>
  );
}
