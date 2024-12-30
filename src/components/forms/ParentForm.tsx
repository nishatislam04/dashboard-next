"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
	info: z.string().min(1, { message: "Info is Required" }),
	studentNames: z.string().min(1, { message: "Student Name's is Required" }),
	phone: z.string().min(1, { message: "Phone Number is Required" }),
	address: z.string().min(1, { message: "Address is Required" }),
});

type Inputs = z.infer<typeof schema>;

export default function ParentForm({ type, data }: { type: "create" | "update"; data?: any }) {
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
			<h1 className="text-xl font-semibold">{type} a new Parent</h1>
			<div className="flex justify-between flex-wrap gap-4">
				<InputField label="Info" name="info" defaultValue={data?.info} register={register} error={errors.info} />
				<InputField label="Student Names" name="studentNames" defaultValue={data?.studentNames} register={register} error={errors.studentNames} />
				<InputField label="Phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone} />
				<InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address} />
			</div>

			<button className="text-white rounded-md bg-blue-500 p-2">{type === "create" ? "Create" : "Update"}</button>
		</form>
	);
}
