import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import type { Job } from "../types/IJob";
import type { JobType, JobStatus, SalaryPeriod } from "../types/jobStatus";
import { validateJob, type JobFormData } from "../utils/jobValidator";

interface JobFormProps {
  job?: Job;
  onSubmit: (
    job: Omit<
      Job,
      "id" | "postedDate" | "postedBy"
    >
  ) => void;
  onCancel: () => void;
}

export const JobForm = ({ job, onSubmit, onCancel }: JobFormProps) => {
    const [formData, setFormData] = useState<JobFormData>({
    title: job?.title || "",
    company: job?.company || "",
    location: job?.location || "",
    jobType: job?.jobType || "Full-Time",
    salaryMin: job?.salary?.min?.toString() || "",
    salaryMax: job?.salary?.max?.toString() || "",
    salaryCurrency: job?.salary?.currency || "INR",
    salaryPeriod: job?.salary?.period || "Monthly",
    status: job?.status || "Active",
    description: job?.description || "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof JobFormData, string>>>({});


  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined })); // clear error on change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateJob(formData);
   if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      title: formData.title,
      company: formData.company,
      location: formData.location,
      jobType: formData.jobType as JobType,
      salary: {
        min: Number(formData.salaryMin),
        max: Number(formData.salaryMax),
        currency: formData.salaryCurrency,
        period: formData.salaryPeriod as SalaryPeriod,
      },
      status: formData.status as JobStatus,
      description: formData.description,
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{job ? "Edit Job" : "Post New Job"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                required
              />
               {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}

            </div>

            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="e.g. Tech Corp"
                required
              />
 {errors.company && <p style={{ color: "red" }}>{errors.company}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="e.g. New York, NY"
                  required
                />
                      {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}

              </div>

              <div>
                <Label htmlFor="jobType">Job Type</Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value) => handleInputChange("jobType", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
             <SelectContent>
  <SelectItem value="Full-Time">Full-time</SelectItem>
  <SelectItem value="Part-Time">Part-time</SelectItem>
  <SelectItem value="Contract">Contract</SelectItem>
  <SelectItem value="Remote">Remote</SelectItem>
</SelectContent>

                </Select>
              </div>
            </div>

            {/* Salary inputs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
  <Label htmlFor="salaryMin">Salary Min</Label>
  <Input
    id="salaryMin"
    type="number"
    value={formData.salaryMin}
    onChange={(e) => handleInputChange("salaryMin", e.target.value)}
    placeholder="e.g. 80000"
    min={0}
    required
  />
  {errors.salaryMin && <p style={{ color: "red" }}>{errors.salaryMin}</p>}
</div>

<div>
  <Label htmlFor="salaryMax">Salary Max</Label>
  <Input
    id="salaryMax"
    type="number"
    value={formData.salaryMax}
    onChange={(e) => handleInputChange("salaryMax", e.target.value)}
    placeholder="e.g. 120000"
    min={0}
    required
  />
  {errors.salaryMax && <p style={{ color: "red" }}>{errors.salaryMax}</p>}
</div>


              <div>
                <Label htmlFor="salaryCurrency">Currency</Label>
                <Select
                  value={formData.salaryCurrency}
                  onValueChange={(value) => handleInputChange("salaryCurrency", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    {/* Add more currencies as needed */}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="salaryPeriod">Salary Period</Label>
                <Select
                  value={formData.salaryPeriod}
                  onValueChange={(value) => handleInputChange("salaryPeriod", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
              <SelectContent>
  <SelectItem value="Monthly">Monthly</SelectItem>
  <SelectItem value="Yearly">Yearly</SelectItem>
    <SelectItem value="Hourly">Hourly</SelectItem>

</SelectContent>

                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="status">Job Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Active'>Active</SelectItem>
                  <SelectItem value='Closed'>Closed</SelectItem>
                  {/* Add more statuses if applicable */}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the role, responsibilities, and requirements..."
                rows={6}
                required
              />
                    {errors.title && <p style={{ color: "red" }}>{errors.description}</p>}

            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" className="flex-1">
              {job ? "Update Job" : "Post Job"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
