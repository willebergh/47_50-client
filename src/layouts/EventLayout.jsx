import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Header from "../sections/Header";

const Container = styled.div`
	margin: auto;
	height: 100vh;
	padding-top: 32px;
	max-width: 300px;
	box-sizing: border-box;
`;

export const eventContext = createContext();
export const useEvent = () => useContext(eventContext);

export default function EvnetLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const { event_id } = useParams();
	const [eventData, setEventData] = useState(false);
	const [isEventLoading, setIsEventLoading] = useState(false);

	const updateEventData = () => {
		setIsEventLoading(true);
		axios
			.get(`/api/client/event/${event_id}`)
			.then((res) => {
				setEventData(res.data.event);
				setIsEventLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setIsEventLoading(false);
			});
	};

	useEffect(() => {
		updateEventData();
	}, []);

	useEffect(() => {
		return;
		if (!Boolean(eventData)) return;

		if (eventData.hasEnded) {
			return navigate("ending");
		}

		if (eventData.hasStarted) {
			return navigate("buy-tickets");
		}

		navigate("countdown");
	}, [eventData]);

	const contextValue = {
		eventData,
		setEventData,
		isEventLoading,
		updateEventData,
		setIsEventLoading,
	};

	return (
		<eventContext.Provider value={contextValue}>
			<Container>
				<Header eventData={contextValue.eventData} />
				<Outlet />
			</Container>
		</eventContext.Provider>
	);
}
