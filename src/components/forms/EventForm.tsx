"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
	eventTitle: z.string().min(3, { message: "Event Title must be 3 character long" }).max(20, { message: "Event Title must be 20 character long" }),
	class: z.string().min(1, { message: "Class is Required" }),
	date: z.date({ message: "Date is Required" }),
	startTime: z.string().min(1, { message: "Start time is Required" }),
	endTime: z.string().min(1, { message: "End time is Required" }),
});

type Inputs = z.infer<typeof schema>;

export default function EventForm({ type, data }: { type: "create" | "update"; data?: any }) {
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
			<h1 className="text-xl font-semibold">{type} a new Event</h1>
			<div className="flex justify-between flex-wrap gap-4">
				<InputField label="Title" name="eventTitle" defaultValue={data?.eventTitle} register={register} error={errors.eventTitle} />
				<InputField label="Class" name="class" defaultValue={data?.class} register={register} error={errors.class} />
				<InputField label="Date" name="date" defaultValue={data?.date} register={register} error={errors.date} />
				<InputField label="Start Time" name="startTime" defaultValue={data?.startTime} register={register} error={errors.startTime} />
				<InputField label="End Time" name="endTime" defaultValue={data?.endTime} register={register} error={errors.endTime} />
			</div>

			<button className="text-white rounded-md bg-blue-500 p-2">{type === "create" ? "Create" : "Update"}</button>
		</form>
	);
}
