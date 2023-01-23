import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import EventLayout from "./layouts/EventLayout";

import BuyTicketsPage from "./pages/BuyTicketsPage";
import EventEndingPage from "./pages/EventEndingPage";
import EventCountDownPage from "./pages/EventCountDownPage";

import NotFound404Page from "./pages/NotFound404Page";

export const eventRoutes = {
	path: "/event/:event_id",
	element: <EventLayout />,
	children: [
		{
			path: "buy-tickets",
			element: <BuyTicketsPage />,
		},
		{
			path: "countdown",
			element: <EventCountDownPage />,
		},
		{
			path: "ending",
			element: <EventEndingPage />,
		},
	],
};

export const allRoutes = [
	eventRoutes,
	{
		path: "*",
		element: <NotFound404Page />,
	},
];

export default function Router() {
	const routes = useRoutes(allRoutes);
	return routes;
}
