import { UrlState } from "@/context/context";
import { Loader2 } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && loading === false) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading]);
  if (loading) return <Loader2 className="animate-spin" />;

  if (isAuthenticated) return children;
};

export default RequireAuth;
