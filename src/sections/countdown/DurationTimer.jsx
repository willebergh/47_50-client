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

	const updateClock = () => {
		const newEventTime = moment(eventData.startDate).unix();
		const newCurrentTime = moment().unix();
		const newDiffTime = newCurrentTime - newEventTime;
		const duration = moment.duration(newDiffTime, "seconds");

		const newDaysString = `${duration.days()}`.replace("-", "");
		const newHoursString = `${duration.hours()}`.replace("-", "");
		const newMinutesString = `${duration.minutes()}`.replace("-", "");
		const newSecondsString = `${duration.seconds()}`.replace("-", "");

		setDays(parseInt(newDaysString));
		setHours(parseInt(newHoursString));
		setMinutes(parseInt(newMinutesString));
		setSeconds(parseInt(newSecondsString));
	};

	useEffect(() => {
		if (Boolean(eventData)) {
			setInterval(updateClock, 1000);
		}
	}, [eventData]);

	return (
		<ClockContainer>
			{Boolean(days) && (
				<ClockUnit
					title="dagar"
					label={days}
					progress={(parseInt(days) / 31) * 100}
					mainColor={eventData?.color}
					secondaryColor={eventData?.secondaryColor}
				/>
			)}
			<ClockUnit
				title="timmar"
				label={hours}
				progress={(parseInt(hours) / 24) * 100}
				mainColor={eventData?.color}
				secondaryColor={eventData?.secondaryColor}
			/>
			<ClockUnit
				title="minuter"
				label={minutes}
				progress={(parseInt(minutes) / 60) * 100}
				mainColor={eventData?.color}
				secondaryColor={eventData?.secondaryColor}
			/>
			{!Boolean(days) && (
				<ClockUnit
					title="sekunder"
					label={seconds}
					progress={(parseInt(seconds) / 60) * 100}
					mainColor={eventData?.color}
					secondaryColor={eventData?.secondaryColor}
				/>
			)}
		</ClockContainer>
	);
};

export default DurationTimer;
