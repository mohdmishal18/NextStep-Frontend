import React, { useState, useEffect, ReactNode } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronsLeft, Search, Bell, LogOut, User, FileText, Users } from "lucide-react";
import { MenteeProfile } from "@/Types/menteeTypes";
import { usePosts, useMentees } from "@/hooks/useSearch";
import useDebounce from "@/hooks/useDebounce";
import NTBB from '../../assets/Next Step BlackBlack.svg';

// Updated interfaces to match your data structure
interface Post {
  _id: string;
  userid: string;
  title: string;
  content: string;
  image: string;
  likes: number;
  createdAt: string;
  tags: string[];
}

interface Mentee {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
  bio?: string;
}

interface SearchResponse<T> {
  total: number;
  [key: string]: T[] | number; // Either 'mentees' or 'posts' array
}

interface NavigationItem {
  name: string;
  icon: ReactNode;
  path: string;
}

interface LayoutProps {
  navigationItems: Array<{ name: string; icon: React.ReactNode; path: string }>;
  profileContent: React.ReactNode;
  role: string;
  userData?: MenteeProfile | null;
  profileUrl: string;
  onLogout: () => void;
}

const ITEMS_PER_PAGE = 5;

const Layout: React.FC<LayoutProps> = ({
  navigationItems,
  profileContent,
  role,
  userData,
  profileUrl,
  onLogout
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [currentPage, setCurrentPage] = useState(1);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { data: postsData, isLoading: isLoadingPosts } = usePosts({
    title: debouncedSearchQuery,
    page: currentPage,
    limit: ITEMS_PER_PAGE
  });

  const { data: menteesData, isLoading: isLoadingMentees } = useMentees({
    name: debouncedSearchQuery,
    page: currentPage,
    limit: ITEMS_PER_PAGE
  });

  const isAccountSection = location.pathname.startsWith("/settings");

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsSidebarCollapsed(width <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      setCurrentPage(1);
    }
  }, [debouncedSearchQuery]);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="flex h-20 items-center px-6">
          <img src={NTBB} alt="Logo" className="w-40 h-12 mr-8" />

          <div className="flex-1 flex justify-center max-w-xl mx-auto relative">
            <div className="w-full relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder={`Search as ${role}...`}
                className="w-full h-12 pl-14 pr-4 bg-transparent border-none ring-0 focus:ring-0 text-base placeholder:text-gray-500"
              />

              {isSearchFocused && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 max-h-[80vh] overflow-y-auto z-50">
                  {/* Users Section */}
                  <div className="p-4 border-b dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <h3 className="font-semibold">Users</h3>
                      </div>
                      {menteesData && (
                        <span className="text-sm text-gray-500">
                          {menteesData.total} results
                        </span>
                      )}
                    </div>
                    {isLoadingMentees ? (
                      <div className="p-4 text-center">Loading users...</div>
                    ) : menteesData?.mentees.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">No users found</div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          {menteesData?.mentees.map((mentee) => (
                            <Link
                              key={mentee._id}
                              to={`/mentee/user-mentee/${mentee._id}`}
                              className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={mentee.profilePicture} />
                                <AvatarFallback>{mentee.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{mentee.name}</p>
                                <p className="text-sm text-gray-500">{mentee.role}</p>
                                {mentee.bio && (
                                  <p className="text-sm text-gray-500 line-clamp-1">{mentee.bio}</p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                        {menteesData?.total > menteesData?.mentees.length && (
                          <Button
                            variant="ghost"
                            className="w-full mt-2"
                            onClick={handleLoadMore}
                          >
                            Load more users
                          </Button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Posts Section */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <h3 className="font-semibold">Posts</h3>
                      </div>
                      {postsData && (
                        <span className="text-sm text-gray-500">
                          {postsData.total} results
                        </span>
                      )}
                    </div>
                    {isLoadingPosts ? (
                      <div className="p-4 text-center">Loading posts...</div>
                    ) : postsData?.posts.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">No posts found</div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          {postsData?.posts.map((post) => (
                            <Link
                              key={post._id}
                              to={`/mentee/myfeed/${post._id}`}
                              className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                              <div className="flex gap-3">
                                {post.image && (
                                  <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                )}
                                <div className="flex-1">
                                  <p className="font-medium">{post.title}</p>
                                  <p className="text-sm text-gray-500 line-clamp-2">
                                    {post.content}
                                  </p>
                                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                    <span>{formatDate(post.createdAt)}</span>
                                    <span>• {post.likes} likes</span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        {postsData?.total > postsData?.posts.length && (
                          <Button
                            variant="ghost"
                            className="w-full mt-2"
                            onClick={handleLoadMore}
                          >
                            Load more posts
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Profile & Notifications */}
          <div className="flex items-center gap-8 ml-8">
            <Button variant="ghost" size="lg" className="h-12 w-12">
              <Bell className="h-7 w-7" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-lg p-0"
                >
                  <Avatar className="h-full w-full rounded-lg">
                    <AvatarImage
                      src={userData?.profilePicture}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                    <AvatarFallback className="h-full w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center font-medium">
                      {userData?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2">
                <Link to={profileUrl}>
                  <DropdownMenuItem className="p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <User className="mr-4 h-6 w-6" />
                    <span className="text-lg font-medium">Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem
                  className="p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-4 h-6 w-6" />
                  <span className="text-lg font-medium">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`hidden lg:flex bg-white dark:bg-gray-800 border-r transition-all duration-300 ${
            isSidebarCollapsed ? "w-16" : "w-64"
          } flex-col py-4 relative`}
        >
          <button
            onClick={toggleSidebar}
            className={`absolute top-2 left-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${
              isSidebarCollapsed ? "left-4" : "left-4"
            }`}
          >
            <ChevronsLeft
              className={`h-6 w-6 transition-transform duration-300 ${
                isSidebarCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>

          <div className="flex flex-col space-y-1 px-3 mt-8">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative w-full h-12">
                <Link
                  to={item.path}
                  className={`absolute inset-0 flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300`}
                >
                  <div className="flex items-center min-w-[24px] justify-center">
                    {item.icon}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="ml-3 text-base font-medium whitespace-nowrap overflow-hidden">
                      {item.name}
                    </span>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {isAccountSection ? profileContent : <Outlet />}
        </main>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 w-full bg-white dark:bg-gray-800 border-t py-2 px-4">
          <div className="flex justify-around">
            {navigationItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <Button variant="ghost" size="icon">
                  {item.icon}
                </Button>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;