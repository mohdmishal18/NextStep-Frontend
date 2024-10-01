// src/hooks/useFetchUsers.ts
import { useEffect, useState } from 'react';
import { searchMentee } from '../api/mentee';
import { MenteeProfile } from '../Types/menteeTypes';

const useFetchMentees = (query: string): MenteeProfile[] => {
  const [users, setUsers] = useState<MenteeProfile[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await searchMentee(query); // No need to type explicitly here

        // Check if response is defined and has status
        if (response && response.status) {
          setUsers(response.mentees); // Extract mentees from response
        } else {
          setUsers([]); // Set to empty array if status is false or response is undefined
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (query) {
      fetchUsers();
    } else {
      setUsers([]); // Clear users when query is empty
    }
  }, [query]);

  return users;
};

export default useFetchMentees;
