import React from "react";
import styled from "styled-components";

const Button = styled.button`
	width: 80px;
	height: 80px;
	border-radius: 6px;
	border: none;
	font-family: inherit;
	font-weight: 800;
	color: ${(props) => props.textColor};
	background-color: ${(props) => props.backgroundColor};
	position: relative;
`;

const Stroke = styled.span`
	position: absolute;
	display: block;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	border-radius: 6px;
	background-color: ${(props) => props.backgroundColor};
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export default function IncreaseButton({ eventData, ...props }) {
	return (
		<Button
			{...props}
			backgroundColor={eventData?.color}
			textColor={eventData?.secondaryColor}
		>
			<Stroke
				width={32}
				height={6}
				backgroundColor={eventData?.secondaryColor}
			/>
			<Stroke
				width={6}
				height={32}
				backgroundColor={eventData?.secondaryColor}
			/>
		</Button>
	);
}
