const TestimonialsSection = () => {
	return (
		<div className="pb-14 px-8 md:px-0">
			<h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
			<p className="md:text-base text-gray-500 mt-3">
				Hear from our learners as they share their journeys of
				transformation, success, and how our <br /> platform has made a
				difference in their lives.
			</p>
			<div className="grid grid-cols-auto gap-8 mt-14">
				{dummyTestimonial.map((testimonial, index) => (
					<div key={index} className="flex items-start mt-10">
						<img
							src={testimonial.image}
							alt={testimonial.name}
							className="w-16 h-16 object-cover rounded-full"
						/>
						<div>
							<h1 className="text-lg font-medium  text-gray-800">
								{testimonial.name}
							</h1>
							<p className="text-gray-800/80">
								{testimonial.role}
							</p>
						</div>
						<div className="p-5 pb-7">
							<div className="flex items-center">
								{[...Array(5)].map((_, i) => (
									<img
										key={i}
										src={
											i < Math.floor(testimonial.rating)
												? assets.star
												: assets.star_blank
										}
										alt="rating"
										className="w-5 h-5"
									/>
								))}
							</div>
							<p className="text-gray-500 mt-5">
								{testimonial.feedback}
							</p>
						</div>
            <a href="#">read more ...</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default TestimonialsSection;
