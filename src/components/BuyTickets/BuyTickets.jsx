import React, { useEffect, useState } from "react";
import axios from "axios";
import BuyTicketsForm from "./BuyTicketsForm";
import moment from "moment";
import DurationTimer from "./DurationTimer";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import hifLogo from "./hif-logo.png";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Header = styled.h1`
	font-size: 2em;
	text-align: center;
	margin: 3em 3em 0em;
`;

const Logo = styled.img`
	font-size: 2em;
	text-align: center;
	margin: 2em;
	width: 160px;
`;

const App = () => {
	const { event_id } = useParams();
	const [event, setEvent] = useState();

	useEffect(() => {
		axios
			.get(`/api/player/event/${event_id}`)
			.then((res) => {
				setEvent(res.data.event);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return !event ? (
		"loading event"
	) : (
		<Container>
			<Header>
				Välkommen!
				<br />
				{event.organisation} presenterar:
				<br />
				{event.displayName}
			</Header>

			<Logo src={hifLogo} />

			<div>
				{event.hasEnded ? (
					<div style={{ textAlign: "center" }}>
						Eventet är avslutat! <br /> Tack för eran support,
						<br />
						tillsammans nådde vi {event.pricePool}kr
					</div>
				) : event.hasStarted ? (
					<div>
						<BuyTicketsForm event={event} />
					</div>
				) : event.isReadyToStart ? (
					<div>
						{"Eventet har inte startat än!"}
						<DurationTimer event={event} />
					</div>
				) : null}
			</div>
		</Container>
	);
};

export default App;
