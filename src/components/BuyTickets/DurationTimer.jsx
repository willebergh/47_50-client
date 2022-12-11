import { React, useState, useEffect } from "react";
import moment from "moment";

const DurationTimer = ({ event }) => {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState();
	const [minutes, setMinutes] = useState();
	const [seconds, setSeconds] = useState();

	const updateClock = () => {
		const newEventTime = moment(event.startDate).unix();
		const newCurrentTime = moment().unix();
		const newDiffTime = newCurrentTime - newEventTime;
		const duration = moment.duration(newDiffTime, "seconds");

		const newDaysString = `${duration.days()}`.replace("-", "");
		const newHoursString = `${duration.hours()}`.replace("-", "");
		const newMinutesString = `${duration.minutes()}`.replace("-", "");
		const newSecondsString = `${duration.seconds()}`.replace("-", "");

		const newDays =
			newDaysString.length === 1 ? "0" + newDaysString : newDaysString;
		const newHours =
			newHoursString.length === 1 ? "0" + newHoursString : newHoursString;
		const newMinutes =
			newMinutesString.length === 1
				? "0" + newMinutesString
				: newMinutesString;
		const newSeconds =
			newSecondsString.length === 1
				? "0" + newSecondsString
				: newSecondsString;

		setDays(newDays);
		setHours(newHours);
		setMinutes(newMinutes);
		setSeconds(newSeconds);
	};

	useEffect(() => {
		setInterval(() => updateClock(), 1000);
	}, []);

	return (
		<h1 style={{ textAlign: "center", fontSize: 36 }}>
			{days}:{hours}:{minutes}:{seconds}
		</h1>
	);
};

export default DurationTimer;
