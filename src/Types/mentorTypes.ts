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

export interface MentorApplicationData {
    profilePicture: File | string;
    firstName: string
    lastName: string;
    password: string;
    email: string;
    jobTitle: string;
    company: string;
    location: string;
    category: string;
    skills: string;
    bio: string;
    linkedInUrl: string;
    personalWebsiteUrl?: string;
    whyBecomeMentor: string;
    greatestAchievement: string;
  }