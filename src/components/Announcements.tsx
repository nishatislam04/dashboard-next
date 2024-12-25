export default function Announcements() {
	return (
		<div className="bg-white p-4 rounded-md">
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-semibold">Announcements</h1>
				<span className="text-xs text-gray-400">View all</span>
			</div>
			<div className="flex flex-col gap-4 mt-4">
				<div className="bg-lamaSkyLight rounded-md p-4">
					<div className="flex items-center justify-between">
						<h2 className="font-medium">Hi this is our annoucement test 1</h2>
						<span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
					</div>
					<p className="text-xs text-gray-400 mt-1">This is our Announcements body message which means nothing and only showing for test purpose.</p>
				</div>
				<div className="bg-lamaPurpleLight rounded-md p-4">
					<div className="flex items-center justify-between">
						<h2 className="font-medium">Hi this is our annoucement test 1</h2>
						<span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
					</div>
					<p className="text-xs text-gray-400 mt-1">This is our Announcements body message which means nothing and only showing for test purpose.</p>
				</div>
				<div className="bg-lamaYellowLight rounded-md p-4">
					<div className="flex items-center justify-between">
						<h2 className="font-medium">Hi this is our annoucement test 1</h2>
						<span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
					</div>
					<p className="text-xs text-gray-400 mt-1">This is our Announcements body message which means nothing and only showing for test purpose.</p>
				</div>
			</div>
		</div>
	);
}
