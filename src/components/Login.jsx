import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Error from "./Error";
import * as Yup from "yup";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be atleast 6 characters long")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });
    } catch (error) {
      const newErrors = {};

      error?.inner?.forEach((e) => {
        newErrors[e.path] = e.message;
      });

      setErrors(newErrors);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-extrabold">Login</CardTitle>
        <CardDescription>
          Login to your account if you already have one
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            onChange={handleInputChange}
            className="h-12"
            name="email"
            type="email"
            placeholder="Enter Email"
          />
          {errors.email && <Error message={errors.email} />}
        </div>
      </CardContent>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            onChange={handleInputChange}
            className="h-12"
            name="password"
            type="password"
            placeholder="Enter Password"
          />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin} className="cursor-pointer">
          {false ? <Loader2 className="animate-spin" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
