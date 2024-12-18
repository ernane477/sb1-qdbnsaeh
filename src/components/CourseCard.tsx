import React from 'react';
import { Calendar, Clock, User, Home } from 'lucide-react';
import { format } from 'date-fns';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  isEnding: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, isEnding }) => {
  return (
    <div className={`p-6 rounded-lg shadow-md ${isEnding ? 'bg-red-50 border-red-200' : 'bg-white'} transition-all hover:shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
        {isEnding && (
          <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full">
            Ending Soon
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {format(course.startDate, 'MMM dd, yyyy')} - {format(course.endDate, 'MMM dd, yyyy')}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <User className="w-4 h-4 mr-2" />
          <span className="text-sm">{course.teacher}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Home className="w-4 h-4 mr-2" />
          <span className="text-sm">{course.classroom}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm capitalize">{course.shift}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {course.weekDays.map((day) => (
            <span
              key={day}
              className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full"
            >
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}