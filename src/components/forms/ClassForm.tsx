"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
	className: z.string().min(3, { message: "Class Title must be 3 character long" }).max(20, { message: "Class Title must be 20 character long" }),
	capacity: z.number().min(1, { message: "Capacity must be at least 1" }),
	grade: z.number().min(1, { message: "Grade must be at least 1" }),
	supervisor: z.string().min(1, { message: "Supervisor Name is Required" }),
});

type Inputs = z.infer<typeof schema>;

export default function ClassForm({ type, data }: { type: "create" | "update"; data?: any }) {
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
			<h1 className="text-xl font-semibold">{type} a new Class</h1>
			<div className="flex justify-between flex-wrap gap-4">
				<InputField label="Class Name" name="className" defaultValue={data?.className} register={register} error={errors.className} />
				<InputField label="Capacity" name="capacity" defaultValue={data?.capacity} register={register} error={errors.capacity} />
				<InputField label="Grade" name="grade" defaultValue={data?.grade} register={register} error={errors.grade} />
				<InputField label="Supervisor" name="supervisor" defaultValue={data?.supervisor} register={register} error={errors.supervisor} />
			</div>

			<button className="text-white rounded-md bg-blue-500 p-2">{type === "create" ? "Create" : "Update"}</button>
		</form>
	);
}
