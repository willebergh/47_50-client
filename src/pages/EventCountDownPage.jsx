import React from "react";
import styled from "styled-components";

import { useEvent } from "../layouts/EventLayout";
import { Title, SubTitle } from "../sections/Title";
import DurationTimer from "../sections/countdown/DurationTimer";

export default function EventCountDownPage() {
	const { eventData } = useEvent();

	return (
		<div>
			<div style={{ paddingBottom: 32 }}>
				<Title>Spelet har inte startat ännu</Title>
				<SubTitle>Försäljning startar om:</SubTitle>
			</div>
			<DurationTimer eventData={eventData} />
		</div>
	);
}
