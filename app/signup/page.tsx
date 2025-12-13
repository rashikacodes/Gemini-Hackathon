"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    console.log(res)
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md p-8">

    
        <h1 className="text-3xl font-bold text-orange-600 text-center">
          Create Account
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Join the future
        </p>

       
        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <Input label="Username" name="username" onChange={handleChange} />
          <Input label="Email" name="email" onChange={handleChange} />
          <Input label="Password" type="password" name="password" onChange={handleChange} />
          <Input label="Confirm Password" type="password" name="confirmPassword" onChange={handleChange} />
          <Button type="submit">Create Account</Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-600 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
