import { React, useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";

import ClockUnit from "./ClockUnit";

const ClockContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 8px;
`;

const DurationTimer = ({ eventData }) => {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [milliseconds, setMilliSeconds] = useState(0);

	const updateClock = () => {
		const newEventTime = moment(eventData.startDate).valueOf();
		const newCurrentTime = moment().valueOf();
		const newDiffTime = newCurrentTime - newEventTime;
		const duration = moment.duration(newDiffTime, "milliseconds");

		const newDaysString = `${duration.days()}`.replace("-", "");
		const newHoursString = `${duration.hours()}`.replace("-", "");
		const newMinutesString = `${duration.minutes()}`.replace("-", "");
		const newSecondsString = `${duration.seconds()}`.replace("-", "");
		const newMilliSecondsString = `${duration.milliseconds()}`.replace(
			"-",
			""
		);

		setDays(parseInt(newDaysString));
		setHours(parseInt(newHoursString));
		setMinutes(parseInt(newMinutesString));
		setSeconds(parseInt(newSecondsString));
		setMilliSeconds(parseInt(newMilliSecondsString));
	};

	useEffect(() => {
		if (Boolean(eventData)) {
			setInterval(updateClock, 10);
		}
	}, [eventData]);

	return (
		<ClockContainer>
			{Boolean(days) && (
				<ClockUnit
					title="dagar"
					label={days}
					progress={(hours / 24) * 100}
					animationDuration={1020}
					mainColor={eventData?.color}
					secondaryColor={eventData?.secondaryColor}
				/>
			)}
			<ClockUnit
				title="timmar"
				label={hours}
				progress={(minutes / 60) * 100}
				animationDuration={1020}
				mainColor={eventData?.color}
				secondaryColor={eventData?.secondaryColor}
			/>
			<ClockUnit
				title="minuter"
				label={minutes}
				progress={(seconds / 60) * 100}
				animationDuration={1020}
				mainColor={eventData?.color}
				secondaryColor={eventData?.secondaryColor}
			/>
			{!Boolean(days) && (
				<ClockUnit
					title="sekunder"
					animationDuration={12}
					label={seconds}
					progress={milliseconds / 10}
					mainColor={eventData?.color}
					secondaryColor={eventData?.secondaryColor}
				/>
			)}
			{!Boolean(days) && !Boolean(hours) && (
				<ClockUnit
					title="millisekunder"
					animationDuration={102}
					label={milliseconds}
					progress={100}
					mainColor={eventData?.color}
					secondaryColor={eventData?.secondaryColor}
				/>
			)}
		</ClockContainer>
	);
};

export default DurationTimer;
