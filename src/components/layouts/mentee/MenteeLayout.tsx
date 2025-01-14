// import { Outlet, useLocation } from 'react-router-dom';
// import Sidebar from '../../mentee/SideBar';
// import Header from '../../mentee/Header';
// import ProfileContent from '../../mentee/ProfileContent';

// const Layout = () => {
//   const location = useLocation();
//   const isAccountSection = location.pathname.startsWith('/settings');

//   return (
//     <div className="flex flex-col justify-center bg-white">
//       <div className="flex flex-col justify-center px-3.5 py-4 w-full bg-zinc-900 max-md:max-w-full">
//         <div className="px-3 pt-1.5 pb-3.5 bg-zinc-800 rounded-[60px] max-md:max-w-full">
//           <div className="flex gap-5 max-md:flex-col">
//             <Sidebar/>
//             <div className="flex flex-col ml-5 w-[79%] max-md:ml-0 max-md:w-full">
//               <div className="flex flex-col grow pt-12 pb-4 pl-8 w-full bg-zinc-900 rounded-[60px] max-md:mt-4 max-md:max-w-full">
//                 <Header />
//                 {isAccountSection ? <ProfileContent /> : <Outlet />}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// };

// export default Layout;

// import { useState, useEffect } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import NTBBIcon from '../../../assets/Next Step BlackBlue.svg'
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Bell,
//   LogOut,
//   User,
//   Home,
//   Settings,
//   Heart,
//   Box,
//   Menu,
//   ChevronsLeft,
//   House,
//   LayoutDashboard ,
//   MessagesSquare ,
//   GraduationCap ,
//   Bookmark ,
//   RotateCcw ,
//   History ,
//   Search
// } from "lucide-react";
// import moment from "moment";
// import ProfileContent from "../../mentee/ProfileContent";

// const Layout = () => {
//   const location = useLocation();
//   const isAccountSection = location.pathname.startsWith("/settings");
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarCollapsed(!isSidebarCollapsed);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       setIsMobile(width <= 768);
//       setIsTablet(width > 768 && width <= 1024);
//       setIsSidebarCollapsed(width <= 1024);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const navigationItems = [
//     { name: "Dashboard", icon: <House className="h-6 w-6" />, path: "/mentee" },
//     { name: "My Feed", icon: <LayoutDashboard className="h-6 w-6" />, path: "/mentee/myfeed" },
//     {
//       name: "Messages",
//       icon: <MessagesSquare className="h-6 w-6" />,
//       path: "mentee/messages"
//     },
//     {
//       name: "My Mentors",
//       icon: <GraduationCap className="h-6 w-6" />,
//       path: "mentee/mentors"
//     },
//     {
//       name: "Saved Mentors",
//       icon: <Bookmark className="h-6 w-6" />,
//       path: "mentee/saved-mentors"
//     },
//     {
//       name: "Requested Mentors",
//       icon: <RotateCcw className="h-6 w-6" />,
//       path: "mentee/requested-mentors"
//     },
//     {
//       name: "Session History",
//       icon: <History className="h-6 w-6" />,
//       path: "mentee/session-history"
//     },
//     {
//       name: "Search",
//       icon: <Search className="h-6 w-6" />,
//       path: "/mentee/search"
//     },
//   ];

//   return (
//     <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
//       {/* Updated Navbar */}
//       <header className="border-b bg-white dark:bg-gray-800">
//         <div className="flex h-20 items-center px-6">
//           {/* Larger Logo */}
//           <img src={NTBBIcon} alt="Logo" className="w-40 h-12 mr-8" />

//           {/* Reduced width Search Bar similar to daily.dev */}
//           <div className="flex-1 flex justify-center max-w-xl mx-auto">
//             <div className="w-full relative group">
//               <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-xl transition-all duration-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-600" />
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500" />
//               <Input
//                 placeholder="Search..."
//                 className="w-full h-12 pl-14 pr-4 bg-transparent border-none ring-0 focus:ring-0 text-base placeholder:text-gray-500"
//               />
//             </div>
//           </div>

//           {/* Larger Navigation Icons */}
//           <div className="flex items-center gap-8 ml-8">
//             <Button variant="ghost" size="lg" className="h-12 w-12">
//               <Bell className="h-7 w-7" />
//             </Button>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   className="relative h-12 w-12 rounded-full p-0"
//                 >
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage
//                       src="https://via.placeholder.com/48"
//                       alt="Profile"
//                     />
//                     <AvatarFallback>UN</AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-64 p-2">
//                 <DropdownMenuItem className="p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
//                   <User className="mr-4 h-6 w-6" />
//                   <span className="text-lg font-medium">Profile</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator className="my-2" />
//                 <DropdownMenuItem className="p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
//                   <LogOut className="mr-4 h-6 w-6" />
//                   <span className="text-lg font-medium">Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Updated Sidebar with repositioned toggle button */}
//         <aside
//           className={`hidden lg:flex bg-white dark:bg-gray-800 border-r transition-all duration-300 ${
//             isSidebarCollapsed ? "w-16" : "w-64"
//           } flex-col py-4 relative`}
//         >
//           {/* Toggle button moved above navigation items */}
//           <button
//             onClick={toggleSidebar}
//             className={`
//     absolute top-2 left-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
//     transition-all duration-300
//     ${isSidebarCollapsed ? "left-4" : "left-4"}
//   `}
//           >
//             <ChevronsLeft
//               className={`h-6 w-6 transition-transform duration-300 ${
//                 isSidebarCollapsed ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {/* Navigation items with increased top padding to accommodate toggle */}
//           <div className="flex flex-col space-y-1 px-3 mt-8">
//             {navigationItems.map((item, index) => (
//               <div key={index} className="relative w-full h-12">
//                 <Link to={item.path}
//                   className={`
//                     absolute inset-0 flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
//                     transition-all duration-300
//                   `}
//                 >
//                   <div className="flex items-center min-w-[24px] justify-center">
//                     {item.icon}
//                   </div>
//                   {!isSidebarCollapsed && (
//                     <span className="ml-3 text-base font-medium whitespace-nowrap overflow-hidden">
//                       {item.name}
//                     </span>
//                   )}
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-4">
//           {isAccountSection ? <ProfileContent /> : <Outlet />}
//         </main>
//       </div>

//       {/* Mobile Navigation */}
//       {isMobile && (
//         <nav className="fixed bottom-0 w-full bg-white dark:bg-gray-800 border-t py-2 px-4">
//           <div className="flex justify-around">
//             {navigationItems.map((item, index) => (
//               <Button key={index} variant="ghost" size="icon">
//                 {item.icon}
//               </Button>
//             ))}
//           </div>
//         </nav>
//       )}
//     </div>
//   );
// };

// export default Layout;

import Layout from "../Layout";
import {
  House,
  LayoutDashboard ,
  MessagesSquare ,
  GraduationCap ,
  Bookmark ,
  RotateCcw ,
  History ,
  Search
} from "lucide-react";
import { useDispatch } from "react-redux";
import ProfileContent from "../../mentee/ProfileContent";
import { rootState } from '@/store/store';
import { MenteeProfile } from '@/Types/menteeTypes';
import { useSelector } from 'react-redux';
import { menteeLogin, menteeLogout } from "@/store/slices/menteeAuthSlice";
import { logout } from '@/api/mentee';

const  menteeNavigation = [
  { name: "Dashboard", icon: <House className="h-6 w-6" />, path: "/mentee" },
    { name: "My Feed", icon: <LayoutDashboard className="h-6 w-6" />, path: "/mentee/myfeed" },
    {
      name: "Messages",
      icon: <MessagesSquare className="h-6 w-6" />,
      path: "mentee/messages"
    },
    {
      name: "My Mentors",
      icon: <GraduationCap className="h-6 w-6" />,
      path: "mentee/mentors"
    },
    {
      name: "Saved Mentors",
      icon: <Bookmark className="h-6 w-6" />,
      path: "mentee/saved-mentors"
    },
    {
      name: "Requested Mentors",
      icon: <RotateCcw className="h-6 w-6" />,
      path: "mentee/requested-mentors"
    },
    {
      name: "Session History",
      icon: <History className="h-6 w-6" />,
      path: "mentee/session-history"
    },
    {
      name: "Search",
      icon: <Search className="h-6 w-6" />,
      path: "/mentee/search"
    },
];

const MenteeLayout = () => {

  const dispatch = useDispatch();
  const mentee: MenteeProfile | null = useSelector(
    (state: rootState) => state.mentee.menteeData
  );
  const handleLogout = async () => {
      const response = await logout();
      console.log(response, 'logout response');
      dispatch(menteeLogin(null));
      dispatch(menteeLogout());
    };

  return (
    <Layout
      navigationItems={menteeNavigation}
      profileContent={<ProfileContent />}
      role="Mentee"
      userData={mentee}
      profileUrl='/mentee/account'
      onLogout={handleLogout}
    />
  );
};

export default MenteeLayout