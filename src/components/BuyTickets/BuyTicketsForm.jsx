import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import SwishLogo from "../../img/swish_logo_secondary.svg";

const BuyTicketsForm = ({ event }) => {
	const getBasicButton = () => `
	border: none;
	box-shadow: none;
	font-size: 4em;
	color: #1e1e1e;
	background-color: ${event.color};
`;

	const FormContainer = styled.div`
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(6, 1fr);
		grid-column-gap: 16px;
		grid-row-gap: 16px;
		margin: 0 3em 3em;
	`;

	const FormTitle = styled.h1`
		grid-area: 1 / 1 / 2 / 4;
		font-size: 2.5em;
		text-align: center;
	`;
	const FormParagraph = styled.p`
		font-size: 0.4em;
	`;

	const CountContainer = styled.span`
		grid-area: 2 / 1 / 6 / 3;
		font-size: 5em;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		font-family: inherit;
		background-color: black;
		border: 8px ${event.color} solid;
	`;
	const IncreseButton = styled.button`
		${getBasicButton()}
		grid-area: 2 / 3 / 4 / 4;
	`;
	const DecreseButton = styled.button`
		${getBasicButton()}
		grid-area: 4 / 3 / 6 / 4;
	`;
	const PayButton = styled.button`
		${getBasicButton()}
		grid-area: 6 / 1 / 7 / 4;
		font-size: 1.7em;
		color: #1e1e1e;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-family: inherit;
		padding: 8px;
	`;

	const TotalCountToHuman = styled.span`
		font-size: 0.2em;
		margin: 1em;
	`;
	const NumberInput = styled.input`
		all: unset;
		font-size: 1.7em;
		width: 100%;
		text-align: center;
		margin: 0;
	`;

	const [ticketCount, setTicketCount] = useState(0);

	const handleTicketCountChange = (e) => {
		const newNumber = parseInt(e.target.value);
		if (newNumber <= 9999 || !newNumber) {
			setTicketCount(newNumber);
		}
	};

	const handleTicketCountClick = (method) => (e) => {
		var newTicketCount =
			method === "+"
				? ticketCount + 1
				: ticketCount - 1 > 0
				? ticketCount - 1
				: 0;

		if (newTicketCount <= 9999) {
			setTicketCount(newTicketCount);
		}
	};

	const handlePayWithSwish = () => {
		axios
			.post("/api/client/start-payment", {
				numberOfTickets: ticketCount,
				event_id: event._id,
			})
			.then((res) => {
				const { message, paymentId } = res.data;
				if (message === "success") {
					window.location.replace(
						`swish://paymentrequest?token=${paymentId}&callbackurl=http%3A%2F%2F192.168.1.232%3A3001%2Fpurchase-success`
					);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<FormContainer>
			<FormTitle>
				Välj antal lotter:
				<FormParagraph>
					Varje lott kostar {event.ticketPrice} :-
				</FormParagraph>
			</FormTitle>
			<CountContainer>
				<NumberInput
					type="number"
					value={ticketCount.toString()}
					onChange={handleTicketCountChange}
				/>
				<TotalCountToHuman>
					{ticketCount}st lotter kostar{" "}
					{ticketCount * event.ticketPrice}:-
				</TotalCountToHuman>
			</CountContainer>
			<IncreseButton onClick={handleTicketCountClick("+")}>
				+
			</IncreseButton>
			<DecreseButton onClick={handleTicketCountClick("-")}>
				-
			</DecreseButton>
			<PayButton onClick={handlePayWithSwish}>
				<span>Betala med</span>
				<img
					src={SwishLogo}
					style={{ paddingLeft: "16px", height: "32px" }}
				/>
			</PayButton>
		</FormContainer>
	);
};

export default BuyTicketsForm;
