import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

const Auth = () => {
  const [searchParams] = useSearchParams();
  return (
    <div className="mt-15 flex flex-col items-center gap-10">
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
