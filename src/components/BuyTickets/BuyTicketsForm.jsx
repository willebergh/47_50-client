import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import SwishLogo from "../../img/swish_logo_secondary.svg";

const BuyTicketsForm = ({ event }) => {
	const getBasicButton = () => `
	border: none;
	box-shadow: none;
	font-size: 4em;
	color: ${event.secondary};
	background-color: ${event.color};
	`;

	const FormContainer = styled.div``;

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
