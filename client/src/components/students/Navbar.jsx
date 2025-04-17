import React, { useContext } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/image.jpeg";
import { FaRegUserCircle } from "react-icons/fa";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
const Navbar = () => {
	const { isEducator, navigate, backendUrl, setIsEducator, getToken } =
		useContext(AppContext);

	const isCourseListPage = location.pathname.includes("/course-list");

	const { openSignIn } = useClerk();
	const { user } = useUser();
	const becomeEducator = async () => {
		try {
			if (isEducator) {
				navigate("/educator");
				return;
			}
			const token = await getToken();
			const { data } = await axios.get(
				backendUrl + '/api/educator/update-role',
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (data.success) {
				setIsEducator(true)
				toast.success(data.message)
			}else{
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message)
		}
	};

	return (
		<div
			className={`flex items-center justify-between px-4 sm:px-8 md:px-14 lg:px-36 border-b  border-gray-500 py-4"${
				isCourseListPage ? "bg-white" : "bg-cyan-300/35"
			} `}
		>
			<img
				onClick={() => navigate("/")}
				src={image}
				alt="Logo"
				className="w-28 lg:w-32 cursor-pointer "
			/>
			<div className="hidden md:flex items-center gap-5 text-gray-500">
				<div className="flex items-center gap-2">
					{user && (
						<div>
							<button
								onClick={becomeEducator}
							>
								{isEducator
									? "Educator Dashboard"
									: "Become Educator"}
							</button>{" "}
							|{" "}
							<Link to="/my-enrollments">
								<button>My Enrollments</button>
							</Link>
						</div>
					)}
				</div>

				{user ? (
					<div className="border-[4px] rounded-full border-gray-700 h-9">
						<UserButton />
					</div>
				) : (
					<button
						onClick={() => openSignIn()}
						className="bg-blue-600 text-white px-5 py-2 rounded-full"
					>
						Create Account
					</button>
				)}
			</div>
			{/* mobile view */}
			<div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
				<div>
					{user && (
						<div>
							<button
								onClick={becomeEducator}
							>
								{isEducator
									? "Educator Dashboard"
									: "Become Educator"}
							</button>{" "}
							|{" "}
							<Link to="/my-enrollments">
								<button>My Enrollments</button>
							</Link>
						</div>
					)}
				</div>
				{user ? (
					<div className="text-3xl">
						<UserButton />
					</div>
				) : (
					<button onClick={() => openSignIn()} className="text-3xl">
						<FaRegUserCircle />
					</button>
				)}
			</div>
		</div>
	);
};

export default Navbar;
