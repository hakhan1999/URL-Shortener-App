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
import { LinkIcon, LogOutIcon } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const user = true;
  return (
    <header className="py-4 flex justify-between items-center">
      <Link to="/">
        <img src="/logo.png" alt="logo" className="h-20" />
      </Link>
      <div>
        {!user ? (
          <Button className="cursor-pointer" onClick={() => navigate("/auth")}>
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer w-10 rounded-full overflow-hidden outline-none">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Hassan Ahmed Khan</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LinkIcon className="h-4 w-4" />
                <span>My Links</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 cursor-pointer">
                <LogOutIcon className="h-4 w-4 text-red-400" />
                <span className="text-red-400">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
