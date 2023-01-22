import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import BuyTicketsPage from "./pages/BuyTicketsPage";
import NotFound404Page from "./pages/NotFound404Page";

const allRoutes = [
	{
		path: "/buy-tickets/:event_id",
		element: <BuyTicketsPage />,
	},
	{
		path: "*",
		element: <NotFound404Page />,
	},
];

export default function Router() {
	const routes = useRoutes(allRoutes);
	return routes;
}
