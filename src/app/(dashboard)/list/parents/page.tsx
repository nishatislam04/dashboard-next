import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { parentsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Parent = {
	id: number;
	name: string;
	email?: string;
	students: string[];
	phone: string;
	address: string;
};

const columns = [
	{ header: "Info", accessor: "info" },
	{ header: "Student Names", accessor: "students", className: "hidden lg:table-cell" },
	{ header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
	{ header: "Address", accessor: "address", className: "hidden lg:table-cell" },
	{ header: "Actions", accessors: "action" },
];

export default function parentListPage() {
	const renderRow = (item: Parent) => (
		<tr key={item.id} className="border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight">
			<td className="flex items-center gap-4 p-4">
				<div className="flex flex-col">
					<h3 className="font-semibold">{item.name}</h3>
					<p className="text-xs text-gray-500">{item?.email}</p>
				</div>
			</td>
			<td className="hidden md:table-cell">{item.students.join(",")}</td>
			<td className="hidden md:table-cell">{item.phone}</td>
			<td className="hidden md:table-cell">{item.address}</td>
			<td className="">
				<div className="flex items-center gap-2">
					<Link href={`/list/teachers/${item.id}`} className="flex items-center justify-center gap-1">
						<button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
							<Image src="/edit.png" alt="" width={16} height={16} />
						</button>
						{role === "admin" && (
							<button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
								<Image src="/delete.png" alt="" width={16} height={16} />
							</button>
						)}
					</Link>
				</div>
			</td>
		</tr>
	);
	return (
		<div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
			{/* top */}
			<div className="flex justify-between items-center">
				<h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
				<div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
					<TableSearch />
					<div className="flex items-center gap-4 self-end">
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/filter.png" alt="" width={14} height={14} />
						</button>
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/sort.png" alt="" width={14} height={14} />
						</button>
						{role === "admin" && (
							<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
								<Image src="/plus.png" alt="" width={14} height={14} />
							</button>
						)}
					</div>
				</div>
			</div>

			{/* list */}
			<Table columns={columns} renderRow={renderRow} data={parentsData} />
			{/* pagination */}
			<Pagination />
		</div>
	);
}
