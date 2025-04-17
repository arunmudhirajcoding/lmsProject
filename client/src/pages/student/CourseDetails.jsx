import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import humanizeDuration from "humanize-duration";
import { FaClock, FaRegClock } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import image from "../../assets/image.jpeg";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlayCircle } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import axios from "axios";

const CourseDetails = () => {
	const { id } = useParams();
	const [courseData, setCourseData] = useState(null);
	const [openSection, setOpenSection] = useState({});
	const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(true);
	const [playerData, setPlayerData] = useState(null);
	const {
		allCourses,
		calculateRating,
		calculateChapterTime,
		currency,
		calculateCourseDuration,
		calculateNoOfLectures,
		backendUrl,
		userData,
		getToken,
	} = useContext(AppContext);

	const fetchCourseData = async () => {
		try {
			const { data } = await axios.get(backendUrl + `/api/course/${id}`);

			if (data.success) {
				setCourseData(data.courseData);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const enrollCourse = async () => {
		try {
			if (!userData) {
				return toast.warn("login to Enroll");
			}
			if (isAlreadyEnrolled) {
				return toast.warn("Already Enrolled");
			}
			if (!courseData || !courseData._id) {
				return toast.error("Course ID is missing or invalid");
			}

			const token = await getToken();

			const { data } = await axios.post(
				backendUrl + "/api/user/purchase",
				{ courseId: courseData._id },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (data.success) {
				const { session_url } = data;
				window.location.replace(session_url);
			} else {
				toast.error(data.message);
				// toast.error("hii")
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (allCourses.length > 0) {
			fetchCourseData();
		}
	}, [allCourses]);
	useEffect(() => {
		if (userData && courseData) {
			setIsAlreadyEnrolled(
				userData.enrolledCourses.includes(courseData._id)
			);
		}
	}, [userData, courseData]);

	const toggleSection = (index) => {
		setOpenSection((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};
	return !courseData ? (
		<>
			<Loading />
		</>
	) : (
		<>
			<div>
				<div className="absolute top-13 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>
				<div className="flex flex-col justify-center items-center w-full">
					<div className="flex md:flex-row flex-col-reverse relative gap-10  justify-between items-center md:px-12 px-8 md:pt-30 pt-20 text-left md:gap-44 w-full">
						{/* left column */}
						<div className="max-w-3xl z-10 text-gray-500">
							<h1 className="md:text-course-details-heading-large text-course-deatails-heading-small font-semibold text-gray-800">
								{courseData.courseTitle}
							</h1>
							<p className="pt-4 md:text-base text-sm">
								{courseData.courseDescription}
							</p>

							{/*review and ratings */}
							<div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
								<p>{calculateRating(courseData).toFixed(1)}</p>
								<div className="flex">
									{[...Array(5)].map((_, i) => (
										<div key={i}>
											{i <
											Math.floor(
												calculateRating(courseData)
											) ? (
												<FaStar />
											) : (
												<CiStar />
											)}
										</div>
									))}
								</div>
								<p className="text-blue-600">
									({courseData.courseRatings.length}
									{courseData.courseRatings.length > 1
										? "ratings"
										: "rating"}
									)
								</p>
								<p>
									{courseData.enrolledStudents.length}
									{courseData.enrolledStudents.length > 1
										? "students"
										: "student"}
								</p>
							</div>
							<p className="text-sm">
								Course by{" "}
								<span className="text-blue-600">
									{/* {courseData.educator.name} */}
								</span>
							</p>

							<div className="pt-8 text-gray-800">
								<h2 className="text-xl font-semibold">
									Course Structure
								</h2>
								{courseData.courseContent.map(
									(chapter, index) => (
										<div
											key={index}
											className="border border-gray-300 bg-white mb-2 rounded"
										>
											<div
												className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
												onClick={() => {
													toggleSection(index);
												}}
											>
												<div className="flex items-center gap-2">
													<IoIosArrowDown
														className={`transform transition-transform ${
															openSection[index]
																? "rotate-180"
																: ""
														}`}
													/>
													<p className="font-medium md:text-base text-sm">
														{chapter.chapterTitle}
													</p>
												</div>
												<p className="text-sm md:text-default">
													{
														chapter.chapterContent
															.length
													}{" "}
													lectures -{" "}
													{calculateChapterTime(
														chapter
													)}
												</p>
											</div>
											<div
												className={`overflow-hidden transition-all duration-300 ${
													openSection[index]
														? "max-h-96"
														: "max-h-0"
												}`}
											>
												<ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
													{chapter.chapterContent.map(
														(lecture, index) => (
															<li
																key={index}
																className="flex items-start gap-2 py-1"
															>
																<FaPlayCircle className="w-4 h-4 mt-1" />
																<div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
																	<p>
																		{
																			lecture.lectureTitle
																		}
																	</p>
																	<div className="flex gap-2">
																		{lecture.isPreviewFree && (
																			<p
																				className="text-blue-500 cursor-pointer"
																				onClick={() =>
																					setPlayerData(
																						{
																							videoId:
																								lecture.lectureUrl
																									.split(
																										"/"
																									)
																									.pop(),
																						}
																					)
																				}
																			>
																				free
																				preview
																			</p>
																		)}
																		<p>
																			{humanizeDuration(
																				lecture.lectureDuration *
																					60 *
																					1000,
																				{
																					units: [
																						"h",
																						"m",
																					],
																				}
																			)}
																		</p>
																	</div>
																</div>
															</li>
														)
													)}
												</ul>
											</div>
										</div>
									)
								)}
							</div>
							<div className="py-2 text-sm md:text-default">
								<h3 className="text-xl font-semibold text-gray-800">
									Course Description
								</h3>
								<p className="pt-4 md:text-base text-sm">
									{courseData.courseDescription}
								</p>
							</div>
						</div>

						{/* right column */}
						<div>
							<div className="max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[100px] sm:min-w-[400px]">
								{playerData ? (
									<YouTube
										videoId={playerData.videoId}
										opts={{ playerVars: { autoplay: 1 } }}
										iframeClassName="w-full aspect-video"
									/>
								) : (
									<>
										<img
											src={image}
											alt=""
											className="w-full"
										/>
									</>
								)}

								<div className="pt-5">
									<div className="flex items-center gap-2">
										<FaRegClock />
										<p className="text-red-500 ">5 days</p>
										<span className="font-medium">
											left at this price!
										</span>
									</div>
									<div className="flex items-center gap-3 pt-2">
										<p className="text-gray-800 md:text-4xl text-2xl font-semibold'">
											{currency}
											{(
												courseData.coursePrice -
												(courseData.discount *
													courseData.coursePrice) /
													100
											).toFixed(2)}
										</p>
										<p className="md:text-lg text-gray-500 line-through">
											{currency}
											{courseData.coursePrice}
										</p>
										<p className="md:text-lg text-gray-500">
											{courseData.discount}% off
										</p>
									</div>
									<div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
										<div className="flex items-center gap-1">
											<FaStar />
											<p>{calculateRating(courseData)}</p>
										</div>
										<div className="h-4 w-px bg-gray-500/40" />
										<div className="flex items-center gap-1">
											<FaClock />
											<p>
												{calculateCourseDuration(
													courseData
												)}
											</p>
										</div>
										<div className="h-4 w-px bg-gray-500/40" />
										<div className="flex items-center gap-1">
											<FaBookOpen />
											<p>
												{calculateNoOfLectures(
													courseData
												)}
											</p>
										</div>
									</div>
									<button
										className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium"
										onClick={enrollCourse}
									>
										{isAlreadyEnrolled
											? "Already Enrolled"
											: "Enroll Now"}
									</button>
									<p className="md:text-xl text-lg font-medium text-gray-800">
										What's in the course?
									</p>
									<ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-600">
										<li>
											Lifetime access with free updates.
										</li>
										<li>Hands-on project</li>
										<li>
											Downloadable resources and source
											code.
										</li>
										<li>Quizzes to test your knowledge.</li>
										<li>Certificate of completion.</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CourseDetails;
