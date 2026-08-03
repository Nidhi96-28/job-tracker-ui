interface User {
  full_name: string;
  email: string;
  password: string;
  role: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  educations?: Education[];
  workExperiences?: WorkExperience[];
}

interface LoginUser{
    username: string;
    password: string;
}

interface Education {
  degree: string;
  institution: string;
  startYear?: number;
  endYear?: number;
}

interface WorkExperience {
  title: string;
  company: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
}