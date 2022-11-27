import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const getBasicButton = () => `
	border: none;
	box-shadow: none;
	font-size: 4em;
	background-color: #3ff668;
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
	border: 8px #3ff668 solid;
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
	font-size: 1em;
	text-weight: 500;
	grid-area: 6 / 1 / 7 / 4;
`;

const TotalCountToHuman = styled.span`
	font-size: 0.2em;
	margin: 1em;
`;

const BuyTicketsForm = ({ event }) => {
	const [ticketCount, setTicketCount] = useState(0);
	const [playerTelNr, setPlayerTelNr] = useState("");
	const [purchaseSuccess, setPurchaseSuccess] = useState(false);
	const [boughtTickets, setBoughtTickets] = useState([]);

	const handleTicketCountChange = (e) => {
		setTicketCount(parseInt(e.target.value));
	};

	const handlePlayerTelNrChange = (e) => {
		setPlayerTelNr(e.target.value);
	};

	const handleTicketCountClick = (method) => (e) => {
		var newTicketCount =
			method === "+"
				? ticketCount + 1
				: ticketCount - 1 > 0
				? ticketCount - 1
				: 0;

		setTicketCount(newTicketCount);
	};

	const handlePayWithSwish = () => {
		axios
			.post("/api/player/buy-tickets", {
				numberOfTickets: ticketCount,
				playerTelNr,
				event_id: event._id,
			})
			.then((res) => {
				if (res.data.message === "success") {
					setPurchaseSuccess(true);
					setBoughtTickets(res.data.tickets);
				}
			})
			.catch((err) => {
				console.error(err);
				setPurchaseSuccess(false);
			});
	};

	return (
		<div>
			{!purchaseSuccess ? (
				<FormContainer>
					<FormTitle>
						Välj antal lotter:
						<FormParagraph>
							Varje lott kostar {event.ticketPrice} :-
						</FormParagraph>
					</FormTitle>
					<CountContainer>
						<input
							type="number"
							value={ticketCount.toString()}
							onChange={handleTicketCountChange}
						/>
						<TotalCountToHuman>
							{ticketCount}st lotter kommer kosta dig{" "}
							{ticketCount * event.ticketPrice} :-
						</TotalCountToHuman>
						<input
							type="number"
							value={playerTelNr.toString()}
							onChange={handlePlayerTelNrChange}
							placeholder="Ange swish nummer"
						/>
					</CountContainer>
					<IncreseButton onClick={handleTicketCountClick("+")}>
						+
					</IncreseButton>
					<DecreseButton onClick={handleTicketCountClick("-")}>
						-
					</DecreseButton>
					<PayButton onClick={handlePayWithSwish}>
						Betala med Swish
					</PayButton>
				</FormContainer>
			) : (
				<div>
					<h1>Tack för ditt köp!</h1>
					<h1>Dina lotter:</h1>
					{boughtTickets.map((ticket) => (
						<h2>{ticket._id}</h2>
					))}
				</div>
			)}
		</div>
	);
};

export default BuyTicketsForm;
