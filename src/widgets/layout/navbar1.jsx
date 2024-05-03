import React from "react";
import {
  Navbar as TNavbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { IoSend } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { Link } from 'react-router-dom'
;import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
  HomeIcon,
  KeyIcon
} from "@heroicons/react/24/solid";

 
 
// nav list component
const navListItems = [
  {
    label: "Home",
    icon:HomeIcon,
    path:"/home"
  },
  {
    label: "Sign up",
    icon: UserCircleIcon,
    path:"/redirect-sign-up"
  },
  {
    label: "Sign In",
    icon: KeyIcon,
    path:"/sign-in"

  },
  {
    label: "Chat Bot",
    icon:  FaRobot,
    path:"/chat_bot"

  },/*
  {
    label: "Docs",
    icon: CodeBracketSquareIcon,
  },*/
];
 
function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon,path }, key) => (
        <Typography
          key={label}
          as="a"
          href={path}
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
 
export function Navbar1() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <TNavbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          <img src="/img/navbar logo.png" alt="logo" href='/home' style={{ width: '170px', height: '45px' }}  />

        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
 
       
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
      </MobileNav>
    </TNavbar>
  );
}
Navbar1.displayName = "/src/widgets/layout/navbar1.jsx";
export default Navbar1;