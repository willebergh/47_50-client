import React from "react";
import styled from "styled-components";

const Button = styled.button`
	width: 80px;
	height: 80px;
	border: none;
	font-weight: 800;
	border-radius: 6px;
	position: relative;
	font-family: inherit;
	color: ${(props) => props.textColor};
	background-color: ${(props) => props.backgroundColor};
`;

const DecreaseIcon = styled.span`
	top: 50%;
	left: 50%;
	width: 32px;
	height: 6px;
	display: block;
	position: absolute;
	border-radius: 6px;
	transform: translate(-50%, -50%);
	background-color: ${(props) => props.backgroundColor};
`;

export default function DecreaseButton({ eventData, ...props }) {
	return (
		<Button
			{...props}
			backgroundColor={eventData?.color}
			textColor={eventData?.secondaryColor}
		>
			<DecreaseIcon backgroundColor={eventData?.secondaryColor} />
		</Button>
	);
}
