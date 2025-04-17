import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import axios from "axios";
import { toast } from "react-toastify";

const MyEnrollments = () => {
	const {
		enrolledCourses,
		calculateCourseDuration,
		navigate,
		userData,
		fetchUserEnrolledCourses,
		backendUrl,
		getToken,
		calculateNoOfLectures,
	} = useContext(AppContext);

	const [progressArray, setProgressArray] = useState([]);
	const getCourseProgress = async () => {
		try {
			const token = await getToken();
			const tempProgressArray = await Promise.all(
				enrolledCourses.map(async (course) => {
					const { data } = await axios.post(
						`${backendUrl}/api/user/get-course-progress`,
						{ courseId: course._id },
						{ headers: { Authorization: `Bearer ${token}` } }
					);
					let totalLectures = calculateNoOfLectures(course);
					const lecturesCompleted = data.progressData
						? data.progressData.lectureCompleted.length
						: 0;
					return { totalLectures, lecturesCompleted };
				})
			);
			setProgressArray(tempProgressArray);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (userData) {
			fetchUserEnrolledCourses();
		}
	}, [userData]);
	useEffect(() => {
		if (enrolledCourses.length > 0) {
			getCourseProgress();
		}
	}, [enrolledCourses]);

	return (
		<div className="md:px-36 px-4 pt-10">
			<h1 className="text-2xl font-semibold mb-6">Enrollments</h1>
			<table className="w-full table-auto overflow-hidden border rounded-md">
				<thead className="text-gray-900 border-b border-gray-300 text-sm py-3 text-left max-sm:hidden">
					<tr>
						<th className="px-4 py-3 font-semibold truncate">
							Course Name
						</th>
						<th className="px-4 py-3 font-semibold truncate">
							Duration
						</th>
						<th className="px-4 py-3 font-semibold truncate">
							Completed
						</th>
						<th className="px-4 py-3 font-semibold truncate text-center">
							Status
						</th>
					</tr>
				</thead>
				<tbody className="text-gray-700">
					{enrolledCourses.map((course, index) => {
						const progress =
							progressArray[index] &&
							(progressArray[index].lectureCompleted * 100) /
								progressArray[index].totalLectures;

						return (
							<tr
								key={index}
								className="border-b border-gray-200"
							>
								{/* Course Name + Thumbnail + Progress */}
								<td className="px-4 py-4 w-9/4 max-sm:w-full">
									<div className="flex gap-4 items-start md:items-center flex-col md:flex-row">
										<img
											src={course.courseThumbnail}
											alt="Course Thumbnail"
											className="w-24 h-auto rounded-md object-cover"
										/>
										<div className="flex-1 w-full">
											<p
												className="font-semibold text-gray-800 
											sm:text-base mb-2 line-clamp-2"
											>
												{course.courseTitle}
											</p>
											<Line
												strokeWidth={3}
												trailWidth={3}
												percent={progress || 0}
												strokeColor="#3B82F6"
												trailColor="#E5E7EB"
												className="w-9/12 rounded-full"
											/>
										</div>
									</div>
								</td>

								{/* Duration */}
								<td className="px-4 py-4 max-sm:hidden">
									{calculateCourseDuration(course)}
								</td>

								{/* Completed */}
								<td className="px-4 py-4 max-sm:hidden">
									{progressArray[index]
										? `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures} Lectures`
										: "0 Lectures"}
								</td>

								{/* Status */}
								<td className="px-4 py-4 text-center max-sm:text-right">
									<button
										className="px-4 py-2 rounded bg-blue-600 text-white text-sm sm:text-base"
										onClick={() =>
											navigate("/Player/" + course._id)
										}
									>
										{progress === 100
											? "Completed"
											: "On Going"}
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default MyEnrollments;
