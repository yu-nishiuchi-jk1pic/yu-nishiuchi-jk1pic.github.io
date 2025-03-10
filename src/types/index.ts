export interface Paper {
  id: string;
  title: string;
  titleJa: string;
  authors: string;
  authorsJa: string;
  journal: string;
  journalJa: string;
  year: string;
  month: string;
  doi: string;
  isMainWork: boolean;
}

export interface Presentation {
  id: string;
  title: string;
  titleJa: string;
  speakers: string;
  speakersJa: string;
  conference: string;
  conferenceJa: string;
  date: string;
  year: string;
  place: string;
  placeJa: string;
  isInvited: boolean;
}

export interface Misc {
  id: string;
  title: string;
  titleJa: string;
  authors: string;
  authorsJa: string;
  journal: string;
  journalJa: string;
  year: string;
  month: string;
  doi: string;
  isMainWork: boolean;
}

export interface Award {
  id: string;
  title: string;
  titleJa: string;
  awarder: string;
  awarderJa: string;
  year: string;
  month: string;
  description?: string;
}

export interface Grant {
  id: string;
  title: string;
  titleJa: string;
  subject: string;
  subjectJa: string;
  funder: string;
  funderJa: string;
  number: string;
  yearFrom: string;
  monthFrom: string;
  yearTo: string;
  monthTo: string;
  description?: string;
  descriptionJa?: string;
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
