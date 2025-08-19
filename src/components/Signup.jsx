import React, { useEffect, useState } from "react";
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
import useFetch from "@/hooks/useFetch";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context/context";

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);
  const { fetchUser } = UrlState();

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (error == null && data) {
      navigate(`/dashboard${longLink ? `createNew${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(5, "Password must be atleast 5 characters long")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });

      await fnSignup();
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
        <CardTitle className="text-xl font-extrabold">Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven't yet
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            onChange={handleInputChange}
            className="h-12"
            name="name"
            type="text"
            placeholder="Enter Name"
          />
          {errors.name && <Error message={errors.name} />}
        </div>
      </CardContent>
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
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            onChange={handleInputChange}
            className="h-12"
            name="profile_pic"
            type="file"
            accept="image/*"
          />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup} className="cursor-pointer">
          {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
