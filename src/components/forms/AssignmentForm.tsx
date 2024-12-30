"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
	subjectName: z.string().min(3, { message: "Subject Name must be 3 character long" }).max(20, { message: "subjectName must be 20 character long" }),
	className: z.string().min(3, { message: "Class Title must be 3 character long" }).max(20, { message: "Class Title must be 20 character long" }),
	teacher: z.string().min(1, { message: "Teacher Name is Required" }),
	dueDate: z.date({ message: "Date is Required" }),
});

type Inputs = z.infer<typeof schema>;

export default function AssignmentForm({ type, data }: { type: "create" | "update"; data?: any }) {
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
			<h1 className="text-xl font-semibold">{type} a new Assignment</h1>
			<div className="flex justify-between flex-wrap gap-4">
				<InputField label="Subject Name" name="subjectName" defaultValue={data?.subjectName} register={register} error={errors.subjectName} />
				<InputField label="Class" name="className" defaultValue={data?.class} register={register} error={errors.className} />
				<InputField label="Teacher" name="teacher" defaultValue={data?.teacher} register={register} error={errors.teacher} />
				<InputField label="Date" name="dueDate" defaultValue={data?.dueDate} register={register} error={errors.dueDate} />
			</div>

			<button className="text-white rounded-md bg-blue-500 p-2">{type === "create" ? "Create" : "Update"}</button>
		</form>
	);
}
