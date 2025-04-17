import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import image from "../../assets/image.jpeg";

const CourseCard = ({ course }) => {
	const { currency, calculateRating } = useContext(AppContext);
	return (
		<Link
			to={"/course/" + course._id}
			onClick={() => {
				scrollTo(0, 0);
			}}
			className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg"
		>
			<img src={image} alt="" className="w-full" />
			<div className="p-3 text-left">
				<h3 className="text-base font-semibold">
					{course.courseTitle}
				</h3>
				{/* <h3 className="text-base font-semibold">arun kumar</h3> */}
				{/* <p className="text-gray-500">{course.educator.name}</p> */}
				{/* <p className="text-gray-500">{course.educator.name}</p> */}
				<div className="flex items-center space-x-2">
					<p>{(calculateRating(course)).toFixed(1)}</p>
					<div className="flex">
						{[...Array(5)].map((_, i) => (
							<div key={i}>
								{(i <
							(Math.floor(
								calculateRating(course) ))? (
									<FaStar />
								) : (
									<CiStar />
								)
							)}

							</div>
						))}
					</div>
					<p className="text-green-800">
						{course.courseRatings.length}
					</p>
				</div>
				<p>400</p>
				<p>
					{currency}
					{(
						course.coursePrice -
						(course.discount * course.coursePrice) / 100
					).toFixed(2)}
				</p>
			</div>
		</Link>
	);
};

export default CourseCard;
