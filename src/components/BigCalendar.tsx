"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

export default function BigCalendar() {
	const [view, setView] = useState<View>(Views.WORK_WEEK);

	function handleChangeView(selectedView: View) {
		setView(selectedView);
	}

	return <Calendar localizer={localizer} events={calendarEvents} startAccessor="start" endAccessor="end" style={{ height: "98%" }} views={[Views.WORK_WEEK, Views.DAY]} view={view} onView={handleChangeView} min={new Date(2025, 11, 23, 8, 0, 0)} max={new Date(2025, 11, 27, 17, 0, 0)} />;
}
