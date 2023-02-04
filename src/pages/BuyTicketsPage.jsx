import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Ticket from "../sections/BuyTickets/Ticket";
import DecreaseButton from "../sections/BuyTickets/DecreaseButton";
import IncreaseButton from "../sections/BuyTickets/IncreaseButton";
import SubmitButton from "../sections/BuyTickets/SubmitButton/SubmitButton";

import { useEvent } from "../layouts/EventLayout";

const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const ButtonContainer = styled.div`
	display: flex;
	padding: 32px;
	gap: 32px;
`;

export default function BuyTicketsPage() {
	const navigate = useNavigate();
	const { eventData } = useEvent();
	const [numberOfTicketsCount, setNumberOfTicketsCount] = useState(0);

	const handleNumberOfTicketChange = (newValue) => {
		if (newValue < 0 || newValue > 100) return;
		setNumberOfTicketsCount(newValue);
	};

	const handleSubmit = () => {
		axios
			.post("/api/client/start-payment", {
				event_id: eventData._id,
				numberOfTickets: numberOfTicketsCount,
			})
			.then((res) => console.log(res.data))
			.catch((err) => console.error(err));
	};

	return (
		<Container>
			<Ticket
				eventData={eventData}
				numberOfTicketsCount={numberOfTicketsCount}
			/>
			<ButtonContainer>
				<IncreaseButton
					eventData={eventData}
					onClick={() =>
						handleNumberOfTicketChange(numberOfTicketsCount + 1)
					}
				/>
				<DecreaseButton
					eventData={eventData}
					onClick={() =>
						handleNumberOfTicketChange(numberOfTicketsCount - 1)
					}
				/>
			</ButtonContainer>
			<SubmitButton eventData={eventData} onClick={handleSubmit} />
		</Container>
	);
}
