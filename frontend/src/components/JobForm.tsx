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
      "_id" | "postedDate" | "postedBy"
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
    setErrors((prev) => ({ ...prev, [field]: undefined })); 
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
      createdAt: job?.createdAt || new Date().toISOString(),
    });
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-lg border border-gray-200 rounded-lg overflow-hidden">
<CardHeader className="bg-gradient-to-r bg-gradient-to-r bg-gradient-to-r from-[#072E4A] to-[#a0aec0]
 text-white py-6 px-8 drop-shadow-md">
        <CardTitle className="text-2xl font-extrabold tracking-tight">
          {job ? "Edit Job" : "Post New Job"}
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="title" className="font-semibold text-gray-700 mb-1 block">
                Job Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className={`transition border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-600"
                } w-full`}
                required
              />
              {errors.title && <p className="text-red-600 mt-1 text-sm">{errors.title}</p>}
            </div>

            <div>
              <Label htmlFor="company" className="font-semibold text-gray-700 mb-1 block">
                Company
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="e.g. Tech Corp"
                className={`transition border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.company ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-600"
                } w-full`}
                required
              />
              {errors.company && <p className="text-red-600 mt-1 text-sm">{errors.company}</p>}
            </div>

            <div>
              <Label htmlFor="location" className="font-semibold text-gray-700 mb-1 block">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g. New York, NY"
                className={`transition border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.location ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-600"
                } w-full`}
                required
              />
              {errors.location && <p className="text-red-600 mt-1 text-sm">{errors.location}</p>}
            </div>

            <div>
              <Label htmlFor="jobType" className="font-semibold text-gray-700 mb-1 block">
                Job Type
              </Label>
              <Select
                value={formData.jobType}
                onValueChange={(value) => handleInputChange("jobType", value)}
              >
                <SelectTrigger className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600">
                  <SelectValue placeholder="Select job type" />
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
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 items-end">
            <div>
              <Label htmlFor="salaryMin" className="font-semibold text-gray-700 mb-1 block">
                Salary Min
              </Label>
              <Input
                id="salaryMin"
                type="number"
                value={formData.salaryMin}
                onChange={(e) => handleInputChange("salaryMin", e.target.value)}
                placeholder="e.g. 80000"
                min={0}
                className={`transition border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.salaryMin ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-600"
                } w-full`}
                required
              />
              {errors.salaryMin && <p className="text-red-600 mt-1 text-sm">{errors.salaryMin}</p>}
            </div>

            <div>
              <Label htmlFor="salaryMax" className="font-semibold text-gray-700 mb-1 block">
                Salary Max
              </Label>
              <Input
                id="salaryMax"
                type="number"
                value={formData.salaryMax}
                onChange={(e) => handleInputChange("salaryMax", e.target.value)}
                placeholder="e.g. 120000"
                min={0}
                className={`transition border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.salaryMax ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-600"
                } w-full`}
                required
              />
              {errors.salaryMax && <p className="text-red-600 mt-1 text-sm">{errors.salaryMax}</p>}
            </div>

            <div>
              <Label htmlFor="salaryCurrency" className="font-semibold text-gray-700 mb-1 block">
                Currency
              </Label>
              <Select
                value={formData.salaryCurrency}
                onValueChange={(value) => handleInputChange("salaryCurrency", value)}
              >
                <SelectTrigger className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600">
                  <SelectValue placeholder="Select currency" />
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
              <Label htmlFor="salaryPeriod" className="font-semibold text-gray-700 mb-1 block">
                Salary Period
              </Label>
              <Select
                value={formData.salaryPeriod}
                onValueChange={(value) => handleInputChange("salaryPeriod", value)}
              >
                <SelectTrigger className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600">
                  <SelectValue placeholder="Select period" />
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
            <Label htmlFor="status" className="font-semibold text-gray-700 mb-1 block">
              Job Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange("status", value)}
            >
              <SelectTrigger className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="font-semibold text-gray-700 mb-1 block">
              Job Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the role, responsibilities, and requirements..."
              rows={6}
              className={`resize-none border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-600"
              } w-full`}
              required
            />
            {errors.description && <p className="text-red-600 mt-1 text-sm">{errors.description}</p>}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
className="flex-1 bg-gradient-to-r from-[#072E4A] to-[#0a4a7e] text-white font-semibold rounded-md py-3 transition hover:brightness-110"
            >
              {job ? "Update Job" : "Post Job"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
className="flex-1 bg-gradient-to-r from-[#e0e7ff] to-[#c7d2fe] text-[#072E4A] font-semibold rounded-md py-3 transition hover:brightness-95"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
