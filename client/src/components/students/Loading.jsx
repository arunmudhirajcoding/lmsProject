import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Loading = () => {
	const { path } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (path) {
			const timer = setTimeout(() => {
				navigate(`/${path}`);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, []);

	return (
		<div>
			<h1>loading</h1>
		</div>
	);
};

export default Loading;
