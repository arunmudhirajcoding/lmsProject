const dummyCourses = [
	{
		_id: "1a2b3c4d-0001",
		courseTitle: "React for Beginners",
		courseDescription:
			"Learn the basics of React.js and build your first component.",
		coursePrice: 49.9,
		ispublished: true,
		discount: 10,
		courseContent: [
			{
				chapterid: "ch1-0001",
				chapterOrder: 1,
				chapterTitle: "Introduction",
				chapterContent: [
					{
						lectureid: "lec1-0001",
						lectureTitle: "What is React?",
						lectureDuration: 10,
						lectureUrl: "https://dummylectureUrl.com/intro1",
						isPreviewFree: true,
						lectureOrder: 1,
					},
					{
						lectureid: "lec1-0002",
						lectureTitle: "Why React?",
						lectureDuration: 12,
						lectureUrl: "https://dummylectureUrl.com/intro2",
						isPreviewFree: false,
						lectureOrder: 2,
					},
				],
			},
			{
				chapterid: "ch1-0002",
				chapterOrder: 2,
				chapterTitle: "JSX & Components",
				chapterContent: [
					{
						lectureid: "lec2-0001",
						lectureTitle: "JSX Syntax",
						lectureDuration: 14,
						lectureUrl: "https://dummylectureUrl.com/jsx",
						isPreviewFree: true,
						lectureOrder: 1,
					},
				],
			},
		],
		educator: "educator-009",
		enrolledStudents: ["student-017", "student-018"],
		courseRatings: [
			{ userId: "student-017", rating: 4.6, _id: "rating-012" },
			{ userId: "student-018", rating: 4.8, _id: "rating-013" },
		],
	},
	{
		_id: "1a2b3c4d-0002",
		courseTitle: "Node.js Essentials",
		courseDescription:
			"Master the basics of Node.js for backend development.",
		coursePrice: 59.99,
		ispublished: true,
		discount: 15,
		courseContent: [
			{
				chapterid: "ch2-0001",
				chapterOrder: 1,
				chapterTitle: "Getting Started",
				chapterContent: [
					{
						lectureid: "lec2-0002",
						lectureTitle: "Node Installation",
						lectureDuration: 8,
						lectureUrl: "https://dummylectureUrl.com/nodeinstall",
						isPreviewFree: true,
						lectureOrder: 1,
					},
					{
						lectureid: "lec2-0003",
						lectureTitle: "Hello World App",
						lectureDuration: 6,
						lectureUrl: "https://dummylectureUrl.com/helloworld",
						isPreviewFree: false,
						lectureOrder: 2,
					},
				],
			},
		],
		educator: "educator-001",
		enrolledStudents: ["student-001", "student-002", "student-003"],
		courseRatings: [
			{ userId: "student-001", rating: 4.3, _id: "rating-001" },
			{ userId: "student-002", rating: 4.5, _id: "rating-002" },
		],
	},
	{
		_id: "1a2b3c4d-0003",
		courseTitle: "Advanced JavaScript",
		courseDescription:
			"Deep dive into JavaScript concepts and async programming.",
		coursePrice: 79.99,
		ispublished: false,
		discount: 20,
		courseContent: [
			{
				chapterid: "ch3-0001",
				chapterOrder: 1,
				chapterTitle: "Closures and Scope",
				chapterContent: [
					{
						lectureid: "lec3-0001",
						lectureTitle: "Understanding Closures",
						lectureDuration: 18,
						lectureUrl: "https://dummylectureUrl.com/closures",
						isPreviewFree: false,
						lectureOrder: 1,
					},
				],
			},
		],
		educator: "educator-002",
		enrolledStudents: ["student-005"],
		courseRatings: [
			{ userId: "student-005", rating: 4.7, _id: "rating-005" },
		],
	},
];

export default dummyCourses;