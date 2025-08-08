import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { MapPin, Calendar, DollarSign, Edit, Trash2 } from "lucide-react";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  description: string;
  postedDate: string;
}

interface JobCardProps {
  job: Job;
  onEdit?: (job: Job) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export const JobCard = ({ job, onEdit, onDelete, showActions = false }: JobCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
            <p className="text-lg font-medium text-gray-600">{job.company}</p>
          </div>
          {showActions && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit?.(job)}
                className="h-8 w-8 border border-gray-300 rounded p-0 hover:bg-gray-50 flex items-center justify-center"
              >
                <Edit className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={() => onDelete?.(job.id)}
                className="h-8 w-8 border border-gray-300 rounded p-0 hover:bg-gray-50 flex items-center justify-center"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{job.postedDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4" />
            <span>{job.salary}</span>
          </div>
        </div>
        
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm mb-3">
          {job.type}
        </span>
        
        <p className="text-sm text-gray-600 line-clamp-3">
          {job.description}
        </p>
      </div>
      
      <div className="p-6 pt-0">
  <button className="w-full bg-[#072E4A] text-white py-2 rounded-md hover:bg-[#051e33]">
    View Details
  </button>
</div>

    </div>
  );
};