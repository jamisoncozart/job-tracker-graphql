interface Country {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
  country: Country;
}

interface Company {
  id: string;
  name: string;
  websiteUrl: string;
  logoUrl: string;
}

interface Tag {
  id: string;
  name: string;
}

export interface Job {
  id: string;
  title: string;
  cities: City[];
  description: string;
  applyUrl: string;
  company: Company;
  tags: Tag[];
  userEmail: string;
  postedAt: Date;
  updatedAt: Date;
}

export interface JobsData {
  data: {
    jobs: Job[]
  }
}