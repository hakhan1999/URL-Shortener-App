import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { UrlState } from "@/context/context";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard${longLink ? `createNew${longLink}` : ""}`);
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="flex flex-col items-center h-[650px] justify-center gap-10">
      <h2 className="text-5xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold up! Let's login first"
          : "Login / Signup"}
      </h2>
      {searchParams.get("createNew") ? (
        ""
      ) : (
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger className="cursor-pointer" value="login">
              Login
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="signup">
              Signup
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Auth;
