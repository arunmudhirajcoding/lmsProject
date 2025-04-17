import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlayCircle } from "react-icons/fa";
import YouTube from "react-youtube";
import image from "../../assets/image.jpeg";
import Rating from "../../components/students/Rating";
import { toast } from "react-toastify";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import Loading from "../../components/students/Loading";

const Player = () => {
	const {
		enrolledCourses,
		calculateChapterTime,
		backendUrl,
		getToken,
		userData,
		fetchUserEnrolledCourses,
	} = useContext(AppContext);
	const { courseId } = useParams();
	const [courseData, setCourseData] = useState(null);
	const [openSection, setOpenSection] = useState({});
	const [playerData, setPlayerData] = useState(null);
	const [progressData, setProgressData] = useState(null);
	const [initialRating, setInitialRating] = useState(null);
	const toggleSection = (index) => {
		setOpenSection((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	const getCourseData = () => {
		enrolledCourses.map((course) => {
			if (course._id === courseId) {
				setCourseData(course);
				course.courseRatings.map((item) => {
					if (item.userId === userData._id) {
						setInitialRating(item.rating);
					}
				});
			}
		});
	};
	useEffect(() => {
		if (enrolledCourses.length > 0) {
			getCourseData();
		}
		getCourseData();
	}, [enrolledCourses]);

	const markLectureAsCompleted = async (lectureId) => {
		try {
			const token = await getToken();
			const { data } = await axios.post(
				`${backendUrl}/api/user/update-course-progress`,
				{ courseId, lectureId },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (data.success) {
				toast.success(data.message);
				await getCourseProgress();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}
	};

	const getCourseProgress = async () => {
		try {
			const token = await getToken();
			const { data } = await axios.post(
				`${backendUrl}/api/user/get-course-progress`,
				{ courseId },
				{ headers: { Authorization: `bearer ${token}` } }
			);
			if (data.success) {
				setProgressData(data.progressData);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleRate = async (rating) => {
		try {
			const token = await getToken();
			const { data } = await axios.post(
				backendUrl + "/api/user/add-rating",
				{ courseId, rating },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (data.success) {
				toast.success(data.message);
				fetchUserEnrolledCourses();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getCourseProgress();
	}, []);

	return courseData ? (
		<>
			<div className="sm:pl-8 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 items-start">
				{/* left column */}
				<div className="text-gray-800">
					<h2 className="text-xl font-semibold">Course Structure</h2>

					<div className="pt-5">
						{courseData &&
							courseData.courseContent.map((chapter, index) => (
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
											{chapter.chapterContent.length}{" "}
											lectures -{" "}
											{calculateChapterTime(chapter)}
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
														{progressData &&
														progressData.lectureCompleted.includes(
															lecture.lectureId
														) ? (
															<span>
																<FaPlayCircle className="w-4 h-4 mt-1" />
																{progressData}
															</span>
														) : (
															<span>
																<TiTick className="w-4 h-4 mt-1" />
															</span>
														)}
														<div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
															<p>
																{
																	lecture.lectureTitle
																}
															</p>
															<div className="flex gap-2">
																{lecture.lectureUrl && (
																	<p
																		className="text-blue-500 cursor-pointer"
																		onClick={() =>
																			setPlayerData(
																				{
																					...lecture,
																					chapter:
																						index +
																						1,
																					lecture:
																						index +
																						1,
																				}
																			)
																		}
																	>
																		watch
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
							))}
					</div>
					<div className="flex items-center gap-2 py-3 mt-10">
						<h1 className="text-xl font-bold">Rate this Course:</h1>
						<Rating
							initialRating={initialRating}
							onRating={handleRate}
						/>
					</div>
				</div>
				{/* right column */}
				<div className="flex flex-col justify-center">
					{playerData ? (
						<>
							<YouTube
								videoId={playerData.lectureUrl.split("/").pop()}
								iframeClassName="w-full aspect-video"
							/>
							<div className="flex justify-between items-center mt-1">
								<p>
									{playerData.chapter}.{playerData.lecture}{" "}
									{playerData.lectureTitle}
								</p>
								<button
									onClick={() =>
										markLectureAsCompleted(
											playerData.lectureId
										)
									}
									className="text-blue-600"
								>
									{progressData &&
									progressData.lectureCompleted.includes(
										lecture.lectureId
									)
										? "Completed"
										: "Mark Complete"}
								</button>
								{console.log(playerData)}
							</div>
						</>
					) : (
						<>
							<img
								src={courseData ? image : null}
								alt=""
								className="w-[50%]"
							/>
						</>
					)}
				</div>
			</div>
		</>
	) : (
		<Loading />
	);
};

export default Player;
