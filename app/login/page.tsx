"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(res => res.json());
    console.log(res);
  };

  return (
   <div className="auth-wrapper ">
  <div className="auth-card w-full mx-auto max-w-md bg-white">


        <h1 className="text-3xl font-bold text-orange-600 text-center">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Login to continue
        </p>


        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit">Login</Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          New here?{" "}
          <Link href="/signup" className="text-orange-600 font-medium">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
