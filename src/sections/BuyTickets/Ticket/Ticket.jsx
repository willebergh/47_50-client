import React from "react";
import styled from "styled-components";

import TicketBackground from "./TicketBackground";

const TICKET_WIDTH = 330;
const TICKET_HEIGHT = 160;

const TicketContainer = styled.div`
	width: ${TICKET_WIDTH}px;
	height: ${TICKET_HEIGHT}px;
	position: relative;
	color: ${(props) => props.color};

	font-family: "Nunito", sans-serif;
	font-weight: 700;
`;

const TicketTextBase = `
	padding: 8px 12px;
	font-size: 12px;
	position: absolute;
    box-sizing: border-box;
`;

const TicketOutsideTextTop = styled.div`
	${TicketTextBase}
	top: 0;
	left: 30px;
	width: 270px;
`;
const TicketOutsideTextBottom = styled.div`
	${TicketTextBase}
	bottom: 0;
	left: 30px;
	width: 270px;
	transform: rotate(180deg);
`;
const TicketOutsideTextLeft = styled.div`
	${TicketTextBase}
	top: 74px;
	padding: 0;
	left: -35px;
	width: 100px;
	text-align: center;
	transform: rotate(270deg);
`;
const TicketOutsideTextRight = styled.div`
	${TicketTextBase}
	padding: 0;
	right: -35px;
	width: 100px;
	top: 74px;
	text-align: center;
	transform: rotate(90deg);
`;

const TicketInsideTextTop = styled.div`
	${TicketTextBase}
	top: 30px;
	left: calc(50% - 135px);
	width: 270px;
	text-align: center;
`;
const TicketInsideTextBottom = styled.div`
	${TicketTextBase}
	bottom: 30px;
	left: calc(50% - 135px);
	width: 270px;
	text-align: center;
`;

const TicketCenterText = styled.div`
	position: absolute;
	top: calc(50% - 24px);
	left: calc(50% - 135px);
	width: 270px;

	text-align: center;
	font-size: 48px;
	font-weight: 900;
`;

export default function Ticket({ eventData, numberOfTicketsCount }) {
	if (!Boolean(eventData)) return null;

	const { displayName, organisation, color, secondaryColor, ticketPrice } =
		eventData;

	return (
		<TicketContainer color={secondaryColor}>
			<TicketOutsideTextTop>
				{organisation}
				<span style={{ float: "right" }}>{displayName}</span>
			</TicketOutsideTextTop>
			<TicketOutsideTextLeft>#850565693</TicketOutsideTextLeft>
			<TicketOutsideTextRight>#850565693</TicketOutsideTextRight>
			<TicketOutsideTextBottom>
				<div>
					{organisation}
					<span style={{ float: "right" }}>{displayName}</span>
				</div>
			</TicketOutsideTextBottom>
			<TicketInsideTextTop>
				Varje lott kostar {ticketPrice} kr
			</TicketInsideTextTop>
			<TicketInsideTextBottom>
				{numberOfTicketsCount} stycken lotter kostar{" "}
				{numberOfTicketsCount * ticketPrice} kr
			</TicketInsideTextBottom>
			<TicketCenterText>{numberOfTicketsCount} st</TicketCenterText>
			<TicketBackground main={color} secondary={secondaryColor} />
		</TicketContainer>
	);
}
