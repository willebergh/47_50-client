import React from "react";
import styled from "styled-components";
import { Title, SubTitle } from "./Title";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding-bottom: 32px;

	&:after {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.1;
		z-index: -10;
		content: " ";
		display: block;
		filter: blur(4px);
		position: absolute;
		background-size: 600px;
		background-position: top 32px left 32px;
		background-repeat: no-repeat;
		background-image: url("${(props) => props.image}");
	}
`;

const OrgContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	align-self: center;
`;

export default function Header({ eventData }) {
	return (
		<Container image={eventData.image}>
			<Title>{eventData?.displayName}</Title>
			<SubTitle>Presenteras av:</SubTitle>

			<OrgContainer>
				<Title style={{ padding: "32px 0" }}>
					{eventData?.organisation}
				</Title>
				<div>
					<img height={150} src={eventData?.image} />
				</div>
			</OrgContainer>
		</Container>
	);
}
