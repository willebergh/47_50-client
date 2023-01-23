import React from "react";
import styled from "styled-components";

import { Title } from "../sections/Title";
import { useEvent } from "../layouts/EventLayout";

const Main = styled.div`
	padding: 32px;
	text-align: center;
`;

export default function EventEndingPage() {
	const { eventData } = useEvent();

	return (
		<Main>
			<Title>Tack för stödet, tillsammans samlade vi ihop</Title>
			<Title
				style={{
					paddingTop: 32,
					color: "#49C63D",
				}}
			>
				{eventData?.pricePool} kr
			</Title>
		</Main>
	);
}
