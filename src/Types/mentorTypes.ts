// export interface mentorApplicationData {
//     fullName: string;
//     education: string;
//     presentCompany: string;
//     country: string;
//     password: string;
//     confirmPassword: string;
//     shortBio: string;
//     email: string;
//     linkedInUrl: string;
//     presentRole: string;
//     place: string;
//     profilePicture?: File; 
// }

export interface MentorData {
    _id: string;
    profilePicture: string;
    coverPicture?: string;
    firstName: string
    lastName: string;
    password: string;
    email: string;
    jobTitle: string;
    company: string;
    location: string;
    skills: { name: string }[]
    bio: string;
    linkedInUrl: string;
    personalWebsiteUrl?: string;
    whyBecomeMentor: string;
    greatestAchievement: string;
    isBlocked: boolean;
    status: 'pending' | 'approved' | 'rejected';
    __v: number;
}


export interface MentorApplicationData {
    profilePicture: File | string;
    firstName: string
    lastName: string;
    password: string;
    email: string;
    jobTitle: string;
    company: string;
    location: string;
    // category: string;
    skills?: string[];
    bio: string;
    linkedInUrl: string;
    personalWebsiteUrl?: string;
    whyBecomeMentor?: string;
    greatestAchievement?: string;
}

export interface SearchFilters {
    search?: string;
    skills?: string[];
    jobTitle?: string;
    company?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
}

export interface SearchResult {
    mentors: Array<{
      id: string;
      firstName: string;
      lastName: string;
      jobTitle: string;
      company: string;
      location: string;
      skills: Array<{ id: string; name: string }>;
      profilePicture: string | null;
      rating: number;
      subscriptions: Array<{
        type: string;
        price: number;
      }>;
    }>;
    total: number;
}
  