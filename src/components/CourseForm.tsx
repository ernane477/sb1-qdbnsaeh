import React, { useState } from 'react';
import { Course, Teacher, Classroom } from '../types';

interface CourseFormProps {
  teachers: Teacher[];
  classrooms: Classroom[];
  onSubmit: (course: Omit<Course, 'id'>) => void;
  existingCourses: Course[];
}

export const CourseForm: React.FC<CourseFormProps> = ({
  teachers,
  classrooms,
  onSubmit,
  existingCourses,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    teacher: '',
    classroom: '',
    shift: 'morning',
    weekDays: [] as string[],
  });
  const [error, setError] = useState<string>('');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const checkAvailability = () => {
    const newStartDate = new Date(formData.startDate);
    const newEndDate = new Date(formData.endDate);

    const conflict = existingCourses.some(course => {
      const courseStartDate = new Date(course.startDate);
      const courseEndDate = new Date(course.endDate);

      const dateOverlap = !(newEndDate < courseStartDate || newStartDate > courseEndDate);
      const shiftConflict = course.shift === formData.shift;
      const weekDaysConflict = course.weekDays.some(day => formData.weekDays.includes(day));
      
      return dateOverlap && shiftConflict && weekDaysConflict && 
        (course.teacher === formData.teacher || course.classroom === formData.classroom);
    });

    return !conflict;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!checkAvailability()) {
      setError('Schedule conflict detected! The selected teacher or classroom is not available during this time.');
      return;
    }

    onSubmit({
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
    });

    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      teacher: '',
      classroom: '',
      shift: 'morning',
      weekDays: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Course Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            required
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            required
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Teacher</label>
        <select
          required
          value={formData.teacher}
          onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Classroom</label>
        <select
          required
          value={formData.classroom}
          onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a classroom</option>
          {classrooms.map((classroom) => (
            <option key={classroom.id} value={classroom.id}>
              {classroom.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Shift</label>
        <select
          required
          value={formData.shift}
          onChange={(e) => setFormData({ ...formData, shift: e.target.value as any })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Week Days</label>
        <div className="space-y-2">
          {weekDays.map((day) => (
            <label key={day} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.weekDays.includes(day)}
                onChange={(e) => {
                  const updatedDays = e.target.checked
                    ? [...formData.weekDays, day]
                    : formData.weekDays.filter((d) => d !== day);
                  setFormData({ ...formData, weekDays: updatedDays });
                }}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{day}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Course
      </button>
    </form>
  );
}