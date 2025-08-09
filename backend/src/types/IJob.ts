export interface Salary {
  min: number;
  max: number;
  currency: string;
  period: string;
}

export interface Job {
  title: string;
  company: string;
  location: string;
  jobType: string;  
  salary: Salary;
  status: string;   
  description: string;
}
