import React, { useState } from "react";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = (e) => {
    e.preventDefault();
    console.log(name, email, username, password);
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
        <button className="btn btn-primary w-full text-white" onSubmit={handleSignup}>Agree & Join</button>
      </div>
    </form>
  );
}
