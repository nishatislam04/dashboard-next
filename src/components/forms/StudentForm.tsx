"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
	username: z.string().min(3, { message: "Username must be 3 character long" }).max(20, { message: "Username must be 20 character long" }),
	email: z.string().email({ message: "Invalid email" }),
	password: z.string().min(6, { message: "Password must be 6 character long" }),
	firstName: z.string().min(3, { message: "First name must be 3 character long" }).max(20, { message: "First name must be 20 character long" }),
	lastName: z.string().min(3, { message: "Last name must be 3 character long" }).max(20, { message: "Last name must be 20 character long" }),
	sex: z.enum(["male", "female"]),
	phone: z.string().min(1, { message: "Phone must be at least 1 character long" }),
	address: z.string().min(1, { message: "address is Required" }),
	bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
	birthday: z.date({ message: "Birthday is Required" }),
	img: z.instanceof(File, { message: "Image is Required" }),
});

type Inputs = z.infer<typeof schema>;

export default function StudentForm({ type, data }: { type: "create" | "update"; data?: any }) {
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
			<h1 className="text-xl font-semibold">{type} a new Student</h1>
			<span className="text-xs text-gray-400 font-medium -mb-4">Authentication Information</span>
			<div className="flex justify-between flex-wrap gap-4">
				<InputField label="Username" name="username" defaultValue={data?.username} register={register} error={errors.username} />
				<InputField label="Email" name="email" defaultValue={data?.email} register={register} error={errors.email} />
				<InputField label="Password" name="password" defaultValue={data?.password} register={register} error={errors.password} />
			</div>

			<span className="text-xs text-gray-400 font-medium -mb-4">Personal Information</span>
			<div className="flex justify-between flex-wrap gap-4">
				<InputField label="First Name" name="firstName" defaultValue={data?.firstName} register={register} error={errors.firstName} />
				<InputField label="Last Name" name="lastName" defaultValue={data?.lastName} register={register} error={errors.lastName} />
				<InputField label="Phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone} />
				<InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address} />

				{/* sex */}
				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-500">Sex</label>
					<select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" {...register("sex")} defaultValue={data?.sex}>
						<option value="">Select a Sex</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
					{errors?.sex?.message && <p className="text-xs text-red-400 -mt-2">{errors.sex.message.toString()}</p>}
				</div>

				{/* bloodType */}
				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-500">Blood Type</label>
					<select defaultValue={data?.bloodType} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" {...register("bloodType")}>
						<option value="">Select a Blood Type</option>
						<option value="A+">A+</option>
						<option value="A-">A-</option>
						<option value="B+">B+</option>
						<option value="B-">B-</option>
						<option value="AB+">AB+</option>
						<option value="AB-">AB-</option>
						<option value="O+">O+</option>
						<option value="O-">O-</option>
					</select>
					{errors.bloodType?.message && <p className="text-xs text-red-400 -mt-2">{errors.bloodType.message.toString()}</p>}
				</div>

				<InputField label="Birthday" type="date" name="birthday" defaultValue={data?.birthday} register={register} error={errors.birthday} />

				{/* file input */}
				<div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
					<label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
						<Image src="/upload.png" alt="" width={28} height={28} />
						<span>Upload a photo</span>
					</label>
					<input type="file" id="img" {...register("img")} className="hidden" />
					{errors.img?.message && <p className="text-xs text-red-400">{errors.img.message.toString()}</p>}
				</div>
			</div>
			<button className="text-white rounded-md bg-blue-500 p-2">{type === "create" ? "Create" : "Update"}</button>
		</form>
	);
}
