import React from "react";
import styled from "styled-components";

const Container = styled.div`
	width: 100%;
	padding: 32px;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
`;

const OrgContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	align-self: center;
`;

const Title = styled.h1`
	font-weight: 800;
	font-size: 40px;
	color: #f4f6f8;
`;
const SubTitle = styled.h2`
	font-weight: 800;
	font-size: 20px;
	color: #637381;
`;

export default function Header({ eventData }) {
	return (
		<Container>
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
