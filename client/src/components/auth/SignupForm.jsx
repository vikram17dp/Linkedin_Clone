import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { axiosInstance } from "../../lib/axois.js";


export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const {mutate:signUpMutation,isLoading} = useMutation({
    mutationFn:async (data)=>{
      const res = await axiosInstance.post("/auth/signup",data);
      return res.data;
    },
    onSuccess:()=>{
      toast.success("Account created successfully");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError:(err)=>{
      toast.error(err.response?.data?.message || "Something went wrong");
		
    }
  })



  const handleSignup = (e) => {
    e.preventDefault();
    signUpMutation({ name, username, email, password });
  };
  return (
    <form onSubmit={handleSignup}>
      <div className="flex flex-col gap-4 w-full  sm:w-1/2  mx-auto border-none md:w-full ">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>setName( e.target.value)}
          className="input input-bordered w-full bg-gray-200 text-black "
          required
        />
     
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered w-full bg-gray-200 text-black "
          required
        />
   
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full bg-gray-200 text-black"
          required
        />
     
        <input
          type="password"
          placeholder="Password(4 + charcters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full bg-gray-200 text-black"
          required
        />
        <button disabled={isLoading} type="submit" className="btn btn-primary w-full text-white" onSubmit={handleSignup}>
         {isLoading ? <Loader className="size-5 animate-spin"/> : " Agree & Join"}</button>
      </div>
    </form>
  );
}
