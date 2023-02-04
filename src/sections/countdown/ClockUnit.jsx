import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import hexToRgba from "../../utils/hexToRgba";
import anime from "animejs";

const clockUnitSize = 100;

const SVGPIWrapper = styled.div`
	width: ${clockUnitSize}px;
	height: ${clockUnitSize}px;
	position: relative;
`;

const SVGPI = styled.svg`
	width: ${clockUnitSize}px;
	height: ${clockUnitSize}px;
	transform: rotate(90deg);
`;

const SVGPILabel = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	font-size: 28px;
`;

const SVGPITitle = styled.div`
	position: absolute;
	bottom: -30%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	font-size: 16px;
`;

export default function ClockUnit({
	progress,
	title = "",
	label = "00",
	mainColor = "#2192FF",
	secondaryColor = "#171717",
	animationDuration = 1000,
}) {
	const trackWidth = 6;
	const indicatorWidth = 8;
	const center = clockUnitSize / 2;
	const radius =
		center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
	const dashArray = 2 * Math.PI * radius;

	const indicatorRef = useRef(null);

	useEffect(() => {
		if (Boolean(progress)) {
			const offsetTarget = dashArray * ((100 - progress) / 100);
			anime({
				targets: indicatorRef.current,
				strokeDashoffset: [offsetTarget],
				easing: "linear",
				duration: animationDuration,
				loop: false,
			});
		}
	}, [progress]);

	return (
		<SVGPIWrapper>
			<SVGPI>
				<circle
					cx={center}
					cy={center}
					fill="transparent"
					r={radius}
					stroke={hexToRgba(secondaryColor, 0.15)}
					strokeWidth={trackWidth}
				/>
				<circle
					ref={indicatorRef}
					cx={center}
					cy={center}
					fill="transparent"
					r={radius}
					stroke={mainColor}
					strokeWidth={indicatorWidth}
					strokeDasharray={dashArray}
					strokeLinecap="round"
				/>
			</SVGPI>

			<SVGPILabel style={{ color: secondaryColor }}>{label}</SVGPILabel>
			<SVGPITitle style={{ color: hexToRgba(secondaryColor, 0.6) }}>
				{title}
			</SVGPITitle>
		</SVGPIWrapper>
	);
}
