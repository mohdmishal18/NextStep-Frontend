import React, { useState } from 'react';
// import { search } from '../../../api/mentee';

interface User {
  id: string;
  name: string;
  profilePicture: string; // Added profilePicture field
}

interface Post {
  id: string;
  title: string;
}

interface SearchResults {
  users: User[];
  posts: Post[];
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'users' | 'posts'>('users');
  const [results, setResults] = useState<SearchResults>({
    users: [],
    posts: [],
  });

  const handleSearch = async () => {
    try {
      const data = await search(query);
      console.log(data, "res from back");

      const responseData = data.data || {};

      const mappedUsers = responseData.users?.map((user) => ({
        id: user._id,
        name: user.name,
        profilePicture: user.profilePicture || '', // Map profilePicture
      })) || [];

      const mappedPosts = responseData.posts?.map((post) => ({
        id: post._id,
        title: post.title,
      })) || [];

      setResults({
        users: mappedUsers,
        posts: mappedPosts,
      });
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleTabClick = (tab: 'users' | 'posts') => {
    setActiveTab(tab);
  };

  const handleResultClick = (type: 'user' | 'post', id: string) => {
    if (type === 'user') {
      window.location.href = `/profile/${id}`;
    } else if (type === 'post') {
      window.location.href = `/post/${id}`;
    }
  };

  return (
    <div className="p-6 bg-zinc-800 rounded-[40px] w-11/12 ml-10">
      <div className="flex justify-between mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-zinc-600 p-3 rounded-lg w-full text-white bg-zinc-700"
          placeholder="Search..."
        />
        <button
          onClick={handleSearch}
          className="ml-4 bg-blue text-white py-3 px-6 rounded-lg"
        >
          Search
        </button>
      </div>
      <div className="flex justify-around mb-4">
        <button
          onClick={() => handleTabClick('users')}
          className={`py-2 px-4 rounded-lg ${
            activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-zinc-400'
          }`}
        >
          People
        </button>
        <button
          onClick={() => handleTabClick('posts')}
          className={`py-2 px-4 rounded-lg ${
            activeTab === 'posts' ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-zinc-400'
          }`}
        >
          Posts
        </button>
      </div>
      <div>
        {activeTab === 'users' && (
          <div>
            {results.users.length > 0 ? (
              results.users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center p-3 border-b border-zinc-600 cursor-pointer text-white"
                  onClick={() => handleResultClick('user', user.id)}
                >
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <span>{user.name}</span>
                </div>
              ))
            ) : (
              <div className="text-zinc-400">No people found.</div>
            )}
          </div>
        )}
        {activeTab === 'posts' && (
          <div>
            {results.posts.length > 0 ? (
              results.posts.map((post) => (
                <div
                  key={post.id}
                  className="p-3 border-b border-zinc-600 cursor-pointer text-white"
                  onClick={() => handleResultClick('post', post.id)}
                >
                  {post.title}
                </div>
              ))
            ) : (
              <div className="text-zinc-400">No posts found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
