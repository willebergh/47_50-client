import React from "react";
import styled from "styled-components";

const TICKET_WIDTH = 330;
const TICKET_HEIGHT = 160;

const BackgroundContainer = styled.div`
	width: ${TICKET_WIDTH}px;
	height: ${TICKET_HEIGHT}px;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
`;

export default function TicketBackground({ main, secondary }) {
	return (
		<BackgroundContainer>
			<svg
				width="329"
				height="159"
				viewBox="0 0 329 159"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M293 0H36.0004C32.6867 0 30.0004 2.68623 30.0004 5.99991L30.0001 24.0001C30 27.3138 27.3138 30 24.0001 30H6C2.68629 30 0 32.6863 0 36V123C0 126.314 2.68629 129 6 129H23.8789C27.1926 129 29.8789 131.686 29.8789 135V153C29.8789 156.314 32.5652 159 35.8789 159H293C296.314 159 299 156.314 299 153V135C299 131.686 301.687 129 305 129H323C326.314 129 329 126.314 329 123V36C329 32.6863 326.314 30 323 30H305C301.687 30 299 27.3137 299 24V6C299 2.68629 296.314 0 293 0Z"
					fill={main}
				/>
				<line
					x1="29"
					y1="56"
					x2="29"
					y2="104"
					stroke={secondary}
					strokeWidth="2"
					strokeLinecap="round"
				/>
				<line
					x1="301"
					y1="56"
					x2="301"
					y2="104"
					stroke={secondary}
					strokeWidth="2"
					strokeLinecap="round"
				/>
				<line
					x1="91"
					y1="29"
					x2="239"
					y2="29"
					stroke={secondary}
					strokeWidth="2"
					strokeLinecap="round"
				/>
				<line
					x1="91"
					y1="131"
					x2="239"
					y2="131"
					stroke={secondary}
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
		</BackgroundContainer>
	);
}
