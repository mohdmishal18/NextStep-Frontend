// src/hooks/useFetchPosts.ts
import { useEffect, useState } from 'react';

const useFetchPosts = (query: string) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/posts?search=${query}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const postsData = await response.json();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (query) {
      fetchPosts();
    } else {
      setPosts([]);
    }
  }, [query]);

  return posts;
};

export default useFetchPosts;
