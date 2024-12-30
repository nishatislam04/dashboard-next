"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
	subject: z.string().min(1, { message: "Subject name is Required" }),
	studentName: z.string().min(1, { message: "Student Name is Required" }),
	score: z.number().min(0, { message: "Score must be at least 0" }),
	teacher: z.string().min(1, { message: "Teacher name is Required" }),
	class: z.string().min(1, { message: "Class is Required" }),
	date: z.date({ message: "Date is Required" }),
});

type Inputs = z.infer<typeof schema>;

export default function ResultForm({ type, data }: { type: "create" | "update"; data?: any }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(schema),
	});

	const onSubmit = handleSubmit((data) => {
		console.log("Data submitted: ", data);
	});
	return (
		<form className="flex flex-col gap-8" onSubmit={onSubmit}>
			<h1 className="text-xl font-semibold">{type} a new Result</h1>
			<div className="flex justify-between flex-wrap gap-4">
				<InputField label="Subject Name" name="subject" defaultValue={data?.subject} register={register} error={errors.subject} />
				<InputField label="Student Name" name="studentName" defaultValue={data?.studentName} register={register} error={errors.studentName} />
				<InputField label="Score" name="score" defaultValue={data?.score} register={register} error={errors.score} />
				<InputField label="Teacher" name="teacher" defaultValue={data?.teacher} register={register} error={errors.teacher} />
				<InputField label="Class" name="class" defaultValue={data?.class} register={register} error={errors.class} />
				<InputField label="Date" name="date" defaultValue={data?.date} register={register} error={errors.date} />
			</div>

			<button className="text-white rounded-md bg-blue-500 p-2">{type === "create" ? "Create" : "Update"}</button>
		</form>
	);
}