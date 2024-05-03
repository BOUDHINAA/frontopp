import axios from 'axios'; // Import Axios library
import { Link, useNavigate } from "react-router-dom";
import {Profilecompany}from "@/pages";
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
import {
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
import { IoMdContact } from "react-icons/io";
// profile menu component
const profileMenuItems = [

  {
    label: "My Feed",
    icon: InboxArrowDownIcon,
    path:"/feed"

  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    path:""

  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    path:"/sign-in"

  },
];
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate(); // Add this line to use the navigate function
  const handleSignOut = async () => {
    

  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    // Set up headers with the access token
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };

    // Make a POST request to the logout endpoint with the access token in the headers
    const response = await axios.post('/user/logout', {}, { headers });

    if (response.status === 200) {
      // Clear any local storage or session storage related to authentication
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('userRole');

      // Redirect the user to the login page or any other desired page
      window.location.href = '/login';
    } else {
      console.error('Logout failed:', response.data.error);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
  

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={`http://localhost:3000/user/profileCompany_image/${localStorage.getItem('pId')}`}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={label === "Sign Out" ? handleSignOut : closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              <Link to={path} className="flex items-center gap-2">
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
// nav list menu
const navListMenuItems = [
 
  
 /*
  {
    label: "Evaluation",
    icon: KeyIcon,
    path:"/quizss"

  },
  {
    title: "Post a job offer",
    description:
"",      path:"Job_offer"
  },
  {
    title: "Offers",
    description:
      "",
      path:"/job_offers"

  },
  {
    title: "List of applications",
    description:
      "",
      path:"/applications"

  },
  {
    title: "Forgot password",
    description:
      "",
      path:"/Forgot"

  },
  
  {
    title: "Reset Password",
    description:
      "",
      path:"/passwordreset"

  },
  {
    title: "Evaluation",
    description:
      "",
      path:"/evaluation"

  },
  {
    title: "Dashboard",
    description:
      "",
      path:"/dashboard"

  },*/
];
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const renderItems = navListMenuItems.map(({ title, description ,path}) => (
    <a href={path} key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));
 
  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
              Pages{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
         
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
        Pages{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}
 
// nav list component
const navListItems = [
  {
    label: "Home",
    icon:HomeIcon,
    path:"/home"
  },
  {
    label: "Evaluation",
    icon: KeyIcon,
    path:"/evaluation"

  },
  {
    label: "Choose redirection",
    icon: KeyIcon,
    path:"/redirect-company"

  },
  {
    label: "My Profile",
    icon: IoMdContact,
    path: `/Profilecompany/${localStorage.getItem('pId')}` // Dynamically construct the path

  },
  
  
/*
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
 
export function Navbar() {
  
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
          <img  href='/home'src="/img/navbar logo.png" alt="logo"  style={{ width: '170px', height: '45px' }}  />

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
 
       
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </TNavbar>
  );
}
Navbar.displayName = "/src/widgets/layout/navbar.jsx";
export default Navbar;