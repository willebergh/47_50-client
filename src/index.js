import React from "react";
import ReactDOM from "react-dom/client";
import BuyTickets from "./components/BuyTickets/BuyTickets";
import PurchaseSuccess from "./components/PurchaseSuccess";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./reset.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/purchase-success" element={<PurchaseSuccess />} />
				<Route path="/buy-ticket/:event_id" element={<BuyTickets />} />
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
		</Router>
	</React.StrictMode>
);
