export interface JobFormData {
  title: string;
  company: string;
  location: string;
  jobType: string;
  salaryMin: string;
  salaryMax: string;
  salaryCurrency: string;
  salaryPeriod: string;
  status: string;
  description: string;
}

export function validateJob(data: JobFormData): Partial<Record<keyof JobFormData, string>> {
  const errors: Partial<Record<keyof JobFormData, string>> = {};

  if (!data.title.trim()) {
    errors.title = "Job title cannot be empty or spaces only.";
  }

  if (!data.company.trim()) {
    errors.company = "Company cannot be empty or spaces only.";
  }

  if (!data.location.trim()) {
    errors.location = "Location cannot be empty or spaces only.";
  }

  if (!data.salaryMin.trim() || Number(data.salaryMin) < 0) {
    errors.salaryMin = "Minimum salary must be a non-negative number.";
  }

  if (!data.salaryMax.trim() || Number(data.salaryMax) < 0) {
    errors.salaryMax = "Maximum salary must be a non-negative number.";
  }

 if (
  data.salaryMin.trim() &&
  data.salaryMax.trim() &&
  Number(data.salaryMin) > Number(data.salaryMax)
) {
//   errors.salaryMin = "Minimum salary cannot be greater than maximum salary.";
  errors.salaryMax = "Maximum salary cannot be less than minimum salary.";
}


  if (!data.description.trim()) {
    errors.description = "Job description cannot be empty or spaces only.";
  }


  return errors;
}
