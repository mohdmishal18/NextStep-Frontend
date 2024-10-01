
import { useSelector } from 'react-redux';
import { rootState } from '../store/store';
import { MenteeProfile } from '../Types/menteeTypes';

const useMenteeData = (): MenteeProfile | null => {
  const mentee: MenteeProfile | null = useSelector((state: rootState) => state.mentee.menteeData);
  return mentee;
};

export default useMenteeData;
