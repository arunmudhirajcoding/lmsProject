import React, { useContext, useEffect, useState } from 'react';
import Loading from '../../components/students/Loading';
import { AppContext } from '../../context/AppContext';

const MyCourses = () => {
  const { currency, allCourses } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchEducatorCourses = async () => {
      setCourses(allCourses.filter(course => course.educator === 'educator-001'));
    };

    fetchEducatorCourses();
  }, [allCourses]);

  return courses ? (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className="pb-4 text-lg font-medium">My Courses</h2>
        <table className='md:table-auto table-fixed w-full overflow-hidden'>
          <thead className="border-b border-gray-500/20 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">All Courses</th>
              <th className="px-4 py-3 font-semibold truncate">Earnings</th>
              <th className="py-3 font-semibold truncate">Students</th>
              <th className="px-4 py-3 font-semibold truncate">Published On</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {courses.map((course) => (
              <tr className="border-b border-gray-500/20" key={course._id}>
                <td className="md:px-4 pl-2 md:p-4 py-3 flex items-center space-x-3 truncate">
                  <img alt="Course Image" className="w-10 h-10 object-cover rounded" src={course.courseImage} />
                  <span className="truncate hidden md:block">{course.courseTitle}</span>
                </td>
                <td className="px-4 py-3">{currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - (course.discount * course.coursePrice) / 100))}</td>
                <td className="px-4 py-3">{course.enrolledStudents.length}</td>
                <td className="px-4 py-3">{new Date(course.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
          </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;

