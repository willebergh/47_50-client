import React from "react";
import styled from "styled-components";
import SwishLogoLight from "./swish_logo_secondary.svg";
import SwishLogoDark from "./swish_logo_secondary_dark.svg";

const Button = styled.button`
	width: 270px;
	height: 48px;
	border: none;
	display: flex;
	font-size: 16px;
	font-weight: 700;
	position: relative;
	border-radius: 6px;
	align-items: center;
	font-family: inherit;
	justify-content: center;
	color: #fff;
	background-color: ${(props) => props.backgroundColor};
`;

export default function SubmitButton({ eventData, ...props }) {
	return (
		<Button
			{...props}
			backgroundColor={eventData?.color}
			textColor={eventData?.secondaryColor}
		>
			Betala med
			<img src={SwishLogoDark} style={{ paddingLeft: 8, height: 28 }} />
		</Button>
	);
}
