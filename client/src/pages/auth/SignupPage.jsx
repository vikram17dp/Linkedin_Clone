import React from "react";
import SignupForm from "../../components/auth/SignupForm";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="min-h-screen justify-centre flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="/logo.svg"
          alt="LinkedIn"
          className="mx-auto h-36 w-auto cursor-pointer"
        />
        <h2 className="text-center text-3xl font-bold  text-gray-900">
          Make the most of your professional life
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <SignupForm />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already on LinkedIn?
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/login" className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black-600 bg-gray-600 '>
              sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
