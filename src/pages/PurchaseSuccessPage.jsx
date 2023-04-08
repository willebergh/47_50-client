import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import PaymentFeedback from "../sections/PurchaseSuccess/PaymentFeedback";

export default function PurchaseSuccess() {
	const { paymentId } = useParams();
	const [paymentStatus, setPaymentStatus] = useState();

	useEffect(() => {
		if (Boolean(paymentId)) {
			axios.post("/api/client/payment-status", { paymentId });
		}
	}, [paymentId]);

	return (
		<div>
			<h1>tack för ditt köp!</h1>
			<PaymentFeedback />
		</div>
	);
}
