import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { assignmentsData, classesData, examsData, parentsData, role, subjectsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Assignments = {
	id: number;
	subject: string;
	class: string;
	teacher: string;
	dueDate: string;
};

const columns = [
	{ header: "Subject Name", accessor: "name" },
	{ header: "Class", accessor: "class" },
	{ header: "Teacher", accessor: "teacher", className: "hidden lg:table-cell" },
	{ header: "Due Date", accessor: "dueDate", className: "hidden lg:table-cell" },
	{ header: "Actions", accessors: "action" },
];

export default function AssignmentListPage() {
	const renderRow = (item: Assignments) => (
		<tr key={item.id} className="border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight">
			<td className="flex items-center gap-4 p-4">{item.subject}</td>
			<td>{item.class}</td>
			<td className="hidden md:table-cell">{item.teacher}</td>
			<td className="hidden md:table-cell">{item.dueDate}</td>
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
				<h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
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
			<Table columns={columns} renderRow={renderRow} data={assignmentsData} />
			{/* pagination */}
			<Pagination />
		</div>
	);
}
