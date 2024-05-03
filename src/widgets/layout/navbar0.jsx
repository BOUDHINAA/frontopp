import React from "react";
import {
  Navbar as TNavbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom'
;import {
  Bars2Icon,
  
} from "@heroicons/react/24/solid";

 
 
export function Navbar0() {
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
Navbar0.displayName = "/src/widgets/layout/navbar0.jsx";
export default Navbar0;