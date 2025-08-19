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
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context/context";

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

  const { data, error, loading, fn: fnLogin } = useFetch(login, formData);
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

  const handleLogin = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(5, "Password must be atleast 5 characters long")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });

      await fnLogin();
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
        {error && <Error message={error.message} />}
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
          {loading ? <Loader2 className="animate-spin" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
