"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
	title: z.string().min(3, { message: "Title must be 3 character long" }).max(20, { message: "Title must be 20 character long" }),
	className: z.string().min(3, { message: "Title must be 3 character long" }).max(20, { message: "Title must be 20 character long" }),
	date: z.date({ message: "Date is Required" }),
});

type Inputs = z.infer<typeof schema>;

export default function AnnouncementForm({ type, data }: { type: "create" | "update"; data?: any }) {
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
			<h1 className="text-xl font-semibold">{type} a new Announcement</h1>
			<div className="flex justify-between flex-wrap gap-4">
				<InputField label="Title" name="title" defaultValue={data?.title} register={register} error={errors.title} />
				<InputField label="Class" name="className" defaultValue={data?.className} register={register} error={errors.className} />
				<InputField label="Date" name="date" defaultValue={data?.date} register={register} error={errors.date} />
			</div>

			<button className="text-white rounded-md bg-blue-500 p-2">{type === "create" ? "Create" : "Update"}</button>
		</form>
	);
}
