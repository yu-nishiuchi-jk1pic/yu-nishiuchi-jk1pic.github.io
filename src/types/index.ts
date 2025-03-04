export interface Paper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  month: string;
  doi: string;
  isMainWork: boolean;
}

export interface Presentation {
  id: string;
  title: string;
  speakers: string;
  conference: string;
  date: string;
  year: string;
  place: string;
  isInvited: boolean;
}

export interface Award {
  id: string;
  title: string;
  awarder: string;
  date: string;
  description?: string;
}

export interface Grant {
  id: string;
  title: string;
  funder: string;
  number: string;
  period: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  languages: string[];
  languageColors: string[];
}

export interface CareerItem {
  id: string;
  position: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  description?: string;
  type: "education" | "work";
}

export interface YearsData {
  years: string[];
}
