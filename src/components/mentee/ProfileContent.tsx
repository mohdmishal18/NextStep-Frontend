import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserCircle, FileText } from "lucide-react";

const ProfileContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const routes = [
    {
      label: "My Profile",
      path: "/mentee/account",
      icon: <UserCircle className="h-5 w-5" />
    },
    {
      label: "My Posts",
      path: "/mentee/account/myposts",
      icon: <FileText className="h-5 w-5" />
    }
  ];

  return (
    <main className="mt-20 container max-md:mt-10">
      <div className="flex gap-5 max-md:flex-col">
        {/* Desktop Navigation - Sticky Sidebar */}
        <nav className="hidden md:flex flex-col w-[22%] sticky top-20 h-fit">
          <h1 className="text-4xl text-gray-900 font-semibold mb-8">Profile</h1>
          <div className="flex flex-col space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
            {routes.map((route) => (
              <Button
                key={route.path}
                variant={currentPath === route.path ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  currentPath === route.path
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-gray-100"
                )}
                asChild
              >
                <Link to={route.path}>
                  {route.icon}
                  <span className="ml-2">{route.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </nav>

        {/* Mobile Navigation - Horizontal Tabs */}
        <div className="md:hidden w-full mb-6">
          <h1 className="text-3xl text-gray-900 font-semibold mb-4">Profile</h1>
          <Tabs
            defaultValue={currentPath}
            className="w-full"
            onValueChange={(value) => navigate(value)}
          >
            <TabsList className="w-full bg-gray-50 border border-gray-200">
              {routes.map((route) => (
                <TabsTrigger
                  key={route.path}
                  value={route.path}
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary"
                >
                  <span className="flex items-center">
                    {route.icon}
                    <span className="ml-2">{route.label}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 md:w-[78%] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default ProfileContent;