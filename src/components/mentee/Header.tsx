import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { rootState } from '../../store/store';
import { MenteeProfile } from '../../Types/menteeTypes';
import useDebounce from '../../hooks/useDebounce';
import useFetchPosts from '../../hooks/useFetchPosts';
import useFetchUsers from '../../hooks/useFetchMentees';

const Header: React.FC = () => {
  const mentee: MenteeProfile | null = useSelector(
    (state: rootState) => state.mentee.menteeData
  );

  // State to store search query, results, and loading state
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch posts and users based on the search query
  const posts = useFetchPosts(debouncedSearchQuery);
  const users = useFetchUsers(debouncedSearchQuery);
  console.log(users, "users")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(query.length > 0);
  };

  // Function to clear search input
  const handleClearSearch = () => {
    setSearchQuery('');
    setShowDropdown(false);
  };

  return (
    <header className="relative flex gap-5 justify-end self-center w-full max-w-[1016px] max-md:flex-wrap max-md:max-w-full">
      <div
        className={`relative flex gap-3 items-center px-4 py-4 my-auto text-lg font-light text-sky-50 rounded-3xl bg-zinc-800 w-full max-w-[400px] transition-all ${
          isInputFocused || showDropdown || searchQuery
            ? 'border border-zinc-700'
            : ''
        } ${showDropdown ? 'rounded-b-none' : ''}`}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/22f66787eff6ba848544e4cc595e050d82742c8d82db9d21ecd5a84c38164a18?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
          alt=""
          className="shrink-0 aspect-[1.04] w-[26px]"
        />
        <input
          type="text"
          placeholder="Search here ..."
          className="flex-grow bg-transparent border-none outline-none text-white"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => {
            setIsInputFocused(true);
            setShowDropdown(searchQuery.length > 0);
          }}
          onBlur={() => {
            setIsInputFocused(false);
          }}
        />
        {searchQuery && (
          <button onClick={handleClearSearch} className="text-white">
            &times;
          </button>
        )}

        {showDropdown && (
          <div className="absolute top-full left-0 w-full bg-zinc-800 text-white rounded-b-3xl shadow-lg z-50 border border-t-0 border-zinc-700">
            <div className="p-3">
              {posts.length === 0 && users.length === 0 ? (
                <div className="text-sm text-gray-400">No results found</div>
              ) : (
                <>
                  {users.length > 0 && (
                    <>
                      <h3 className="font-bold mb-2">Users</h3>
                      {users.map((user: any, index: number) => (
                        <Link
                          key={index}
                          to={`/mentee/user-mentee/${user._id}`} // Link to the mentee's profile
                          className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
                        >
                          <img
                            src={user.profilePicture || '/placeeHolderProfile.jpg'} // Display user's profile picture
                            alt={user.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <span>{user.name}</span>
                        </Link>
                      ))}
                    </>
                  )}

                  {posts.length > 0 && (
                    <>
                      <h3 className="font-bold mb-2">Posts</h3>
                      {posts.map((post: any, index: number) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-700 cursor-pointer"
                        >
                          <span>{post.title}</span>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Rest of the header component remains unchanged */}
      <div className="flex gap-5 justify-between items-center">
        <button className="flex justify-center items-center self-stretch px-3 py-2 my-auto rounded-xl bg-zinc-800">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c32ac65b452d162f04d5d8c16eced9e63ba5d92fdc142c60b63b980b202a0a5d?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
            alt="Notification"
            className="aspect-[1.04] w-[25px]"
          />
        </button>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/88f153ecdb718c61d0ee05962db712793e3838452dd132d92b7445251d57e31d?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
          alt="User avatar"
          className="shrink-0 self-stretch my-auto w-11 rounded-xl aspect-square"
        />
        <div className="flex flex-col justify-center self-stretch px-4 py-3 max-md:pr-5">
          <div className="flex gap-3">
            <div className="flex overflow-hidden relative flex-col justify-end items-start px-7 pt-7 w-10 aspect-square rounded-[200px]">
              <img
                loading="lazy"
                src={mentee?.profilePicture || "/placeeHolderProfile.jpg"}
                alt=""
                className="object-cover absolute inset-0 size-full"
              />
              <div className="relative shrink-0 bg-emerald-500 rounded-md border-2 border-white border-solid h-[11px]" />
            </div>
            <div className="flex flex-col flex-1 text-sm text-sky-50">
              <div className="font-light">{mentee?.name}</div>
              <div className="font-extralight">{mentee?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
