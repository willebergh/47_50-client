import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../sections/BuyTickets/Header";
import Ticket from "../sections/BuyTickets/Ticket";
import DecreaseButton from "../sections/BuyTickets/DecreaseButton";
import IncreaseButton from "../sections/BuyTickets/IncreaseButton";
import SubmitButton from "../sections/BuyTickets/SubmitButton/SubmitButton";

const Container = styled.div`
	height: 100vh;
	display: flex;
	position: relative;
	align-items: center;
	flex-direction: column;
	box-sizing: border-box;

	&:after {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.1;
		z-index: -10;
		content: " ";
		display: block;
		filter: blur(4px);
		position: absolute;
		background-size: 600px;
		background-position: center;
		background-origin: -100px;
		background-repeat: no-repeat;
		background-image: url("${(props) => props.image}");
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	padding: 32px;
	gap: 32px;
`;

export default function BuyTicketsPage() {
	const navigate = useNavigate();
	const { event_id } = useParams();
	const [eventData, setEventData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [numberOfTicketsCount, setNumberOfTicketsCount] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`/api/client/event/${event_id}`)
			.then((res) => {
				const event = res.data.event;
				if (!event.hasStarted || event.hasEnded) {
					return navigate("/");
				}

				setEventData(event);
				setIsLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setIsLoading(false);
			});
	}, []);

	const handleNumberOfTicketChange = (newValue) => {
		if (newValue < 0 || newValue > 100) return;
		setNumberOfTicketsCount(newValue);
	};

	const handleSubmit = () => {
		console.log(numberOfTicketsCount);
	};

	return (
		<Container image={eventData?.image}>
			<Header eventData={eventData} />
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
