import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, Loader2, LogOutIcon } from "lucide-react";
import { UrlState } from "@/context/context";
import { logout } from "@/db/apiAuth";
import useFetch from "@/hooks/useFetch";

const Header = () => {
  const { loading, fn: fnLogout } = useFetch(logout);
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();
  return (
    <>
      <header className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="h-20" />
        </Link>
        <div>
          {!user ? (
            <Button
              className="cursor-pointer"
              onClick={() => navigate("/auth")}
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer w-10 rounded-full overflow-hidden outline-none">
                <Avatar>
                  <AvatarImage
                    className="object-contain"
                    src={user?.user_metadata?.profile_pic}
                  />
                  <AvatarFallback>
                    {user?.user_metadata?.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/dashboard">
                  <DropdownMenuItem className="cursor-pointer">
                    <LinkIcon className="h-4 w-4" />
                    <span>My Links</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="text-red-400 cursor-pointer">
                  <LogOutIcon className="h-4 w-4 text-red-400" />
                  <span
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/auth");
                      });
                    }}
                    className="text-red-400"
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>
      {loading && (
        <div className="bg-white/20 fixed top-0 left-0 w-full h-full">
          <div className="fixed top-1/2 left-1/2">
            <Loader2 className="animate-spin w-full flex items-center justify-center" />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
