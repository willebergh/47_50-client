import { React, useState, useEffect } from "react";
import moment from "moment";

const DurationTimer = ({ event }) => {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState();
	const [minutes, setMinutes] = useState();

	const updateClock = () => {
		const newEventTime = moment(event.startDate).unix();
		const newCurrentTime = moment().unix();
		const newDiffTime = newCurrentTime - newEventTime;
		const duration = moment.duration(newDiffTime, "seconds");

		const newDaysString = `${duration.days()}`.replace("-", "");
		const newHoursString = `${duration.hours()}`.replace("-", "");
		const newMinutesString = `${duration.minutes()}`.replace("-", "");

		const newDays =
			newDaysString.length === 1 ? "0" + newDaysString : newDaysString;
		const newHours =
			newHoursString.length === 1 ? "0" + newHoursString : newHoursString;
		const newMinutes =
			newMinutesString.length === 1
				? "0" + newMinutesString
				: newMinutesString;

		setDays(newDays);
		setHours(newHours);
		setMinutes(newMinutes);
	};

	useEffect(() => {
		updateClock();
	}, [event]);

	return (
		<div>
			Tid kvar: {days}:{hours}:{minutes}
		</div>
	);
};

export default DurationTimer;
