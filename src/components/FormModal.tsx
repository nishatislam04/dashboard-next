"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), { loading: () => <h1>Loading...</h1> });
const StudentForm = dynamic(() => import("./forms/StudentForm"), { loading: () => <h1>Loading...</h1> });
const ParentForm = dynamic(() => import("./forms/ParentForm"), { loading: () => <h1>Loading...</h1> });
const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), { loading: () => <h1>Loading...</h1> });
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), { loading: () => <h1>Loading...</h1> });
const ExamForm = dynamic(() => import("./forms/ExamForm"), { loading: () => <h1>Loading...</h1> });
const ClassForm = dynamic(() => import("./forms/ClassForm"), { loading: () => <h1>Loading...</h1> });
const EventForm = dynamic(() => import("./forms/EventForm"), { loading: () => <h1>Loading...</h1> });
const LessonForm = dynamic(() => import("./forms/LessonForm"), { loading: () => <h1>Loading...</h1> });
const ResultForm = dynamic(() => import("./forms/ResultForm"), { loading: () => <h1>Loading...</h1> });
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), { loading: () => <h1>Loading...</h1> });

const forms: {
	[key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
	teacher: (type: "create" | "update", data?: any) => <TeacherForm type={type} data={data} />,
	student: (type: "create" | "update", data?: any) => <StudentForm type={type} data={data} />,
	parent: (type: "create" | "update", data?: any) => <ParentForm type={type} data={data} />,
	announcement: (type: "create" | "update", data?: any) => <AnnouncementForm type={type} data={data} />,
	assignment: (type: "create" | "update", data?: any) => <AssignmentForm type={type} data={data} />,
	exam: (type: "create" | "update", data?: any) => <ExamForm type={type} data={data} />,
	class: (type: "create" | "update", data?: any) => <ClassForm type={type} data={data} />,
	event: (type: "create" | "update", data?: any) => <EventForm type={type} data={data} />,
	lesson: (type: "create" | "update", data?: any) => <LessonForm type={type} data={data} />,
	result: (type: "create" | "update", data?: any) => <ResultForm type={type} data={data} />,
	subject: (type: "create" | "update", data?: any) => <SubjectForm type={type} data={data} />,
};

export default function FormModal({ table, type, data, id }: { table: "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement"; type: "create" | "update" | "delete"; data?: any; id?: string | number }) {
	const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
	const bgColor = type === "create" ? "bg-lamaYellow" : type === "update" ? "bg-lamaSky" : "bg-lamaPurple";

	const [open, setIsOpen] = useState(false);

	const Form = function () {
		return type === "delete" && id ? (
			<form className="p-4 flex flex-col gap-4" action="">
				<span className="text-center font-medium">All data will be lost. Are you sure to delete this {table}</span>
				<button className="bg-red-700  text-white py-2  px-4 rounded-md border-none w-max self-center" onClick={() => setIsOpen(false)}>
					Delete
				</button>
			</form>
		) : type === "create" || type === "update" ? (
			forms[table](type, data)
		) : (
			"Form Not Found"
		);
	};
	return (
		<>
			<button className={`${size} flex items-center justify-center rounded-full ${bgColor}`} onClick={() => setIsOpen(true)}>
				<Image src={`/${type}.png`} alt="" width={16} height={16} />
			</button>
			{open && (
				<div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
					<div className="bg-white p-4 rounded-md relative w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] 2xl:w-[55%]">
						<Form />
						<div className="absolute top-4 right-4 cursor-pointer" onClick={() => setIsOpen(false)}>
							<Image src="/close.png" alt="" height={14} width={14} />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
