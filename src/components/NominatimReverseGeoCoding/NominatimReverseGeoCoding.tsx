import React, { useEffect, useState } from "react";
import useMap from "../../hooks/useMap";
import {
	Box,
	Slide,
	Card,
	CardActions,
	CardHeader,
	CardContent,
	IconButton,
	Typography,
	Alert,
	SxProps,
} from "@mui/material";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import AddressDetails from "./util/AddressDetails";
import CardTabs from "./util/CardTabs";
import GeoJsonLayer from "./util/GeoJsonLayer";
export interface NominatimReverseGeoCodingProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Direction from which the card slides in when appearing
	 */
	cardSlideInDirection: "left" | "right" | "up" | "down";
	/**
	 * Whether to show detailed information in tabs or simple address details
	 */
	showMoreDetails: boolean;
	/**
	 * Function to activate the card component
	 */
	activateCard: () => void;
	/**
	 * Function to control the visibility of the card
	 */
	setCardVisible: (visible: boolean) => void;
	/**
	 * Whether the card is currently in active state
	 */
	isCardActive: boolean;
	/**
	 * Whether the card is currently visible to the user
	 */
	isCardVisible: boolean;
	/**
	 * Optional custom styles to apply to the card component
	 */
	cardStyles?: SxProps;
}

const NominatimReverseGeoCoding = (props: NominatimReverseGeoCodingProps) => {
	const { map } = useMap({
		mapId: props.mapId,
	});
	const [coords, setCoords] = useState<{ lng: number; lat: number }>();
	const [zoom, setZoom] = useState<number>(8);
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const locationName =
		data?.addresstype === "building" || data?.addresstype === "place"
			? `${data?.display_name.split(",")[1]} ${data?.display_name.split(",")[0]}`
			: data?.display_name.split(",")[0];
	const fetchReverseGeoCode = async (lat: number, lng: number, zoom: number) => {
		setLoading(true);
		setError(null);

		const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=${zoom}&extratags=1&polygon_geojson=1`;

		try {
			const res = await fetch(url, {
				headers: {
					"Accept-Language": "de-DE",
				},
			});
			if (!res.ok) throw new Error("Failed to fetch reverse geocode");
			const json = await res.json();
			setData(json);
		} catch (err) {
			setError(err as Error);
			setData(null);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (!map) return;

		map.flyTo({
			center: [map.getCenter().lng, map.getCenter().lat],
			zoom: 16,
			offset: [props.cardSlideInDirection === "left" ? -50 : 50, 0],
			essential: true,
		});

		fetchReverseGeoCode(map.getCenter().lat, map.getCenter().lng, map.getZoom());
	}, [map]);

	useEffect(() => {
		if (!map) return;

		const updateZoom = () => {
			const currentZoom = map.getZoom();
			const formattedZoom = Math.floor(currentZoom);

			if (formattedZoom >= 15) {
				setZoom(18);
			} else if (formattedZoom >= 13) {
				setZoom(16);
			} else {
				setZoom(formattedZoom);
			}
		};

		const handleFlyEnd = () => {
			map.off("moveend", handleFlyEnd);
			props.setCardVisible(true);
		};

		const onClick = (event: any) => {
			const { lng, lat } = event.lngLat;
			props.setCardVisible(true);
			setCoords({ lng, lat });

			map.flyTo({
				center: [lng, lat],
				zoom: map.getZoom(),
				offset: [props.cardSlideInDirection === "left" ? -50 : 50, -100],
				essential: true,
			});

			fetchReverseGeoCode(lat, lng, zoom);
		};

		map.on("moveend", updateZoom);
		map.on("moveend", handleFlyEnd);
		map.on("click", onClick);

		return () => {
			map.off("moveend", updateZoom);
			map.off("moveend", handleFlyEnd);
			map.off("click", onClick);
		};
	}, [map, props.cardSlideInDirection, zoom]);
	console.log(data);
	return (
		<>
			<Box sx={{ zIndex: 1100 }}>
				<Slide
					direction={props.cardSlideInDirection}
					in={props.isCardActive && props.isCardVisible}
					appear={true}
					mountOnEnter
					unmountOnExit
					timeout={{ enter: 600, exit: 500 }}
				>
					<Card
						sx={{
							maxHeight: "75%",
							minHeight: "280px",
							maxWidth: "30%",
							position: "absolute",
							display: "flex",
							flexDirection: "column",
							bottom: 20,
							...(props.cardSlideInDirection === "right" ? { left: 20 } : { right: 20 }),
							zIndex: 1100,
							borderRadius: 4,
							boxShadow: 8,
							...props.cardStyles,
						}}
					>
						<CardActions sx={{ position: "absolute", top: 5, right: -10 }}>
							<IconButton
								aria-label="close"
								color="error"
								size="small"
								onClick={() => props.isCardActive && props.setCardVisible(!props.isCardVisible)}
								sx={{
									width: "2.5rem",
									height: "2.5rem",
									padding: 0,
									minWidth: 0,
									marginRight: 1,
									backgroundColor: "#fff",
									borderRadius: 2,
									"&:hover": { backgroundColor: "rgba(240, 18, 2,.1)" },
								}}
							>
								<CancelSharpIcon
									sx={{
										fontSize: { xs: "1rem", md: "1.2rem" },
										color: "#f01202",
									}}
								/>
							</IconButton>
						</CardActions>

						<CardHeader
							sx={{ mt: 1, minHeight: 50 }}
							title={
								!coords ? (
									<Typography
										sx={{
											fontWeight: "bold",
											letterSpacing: 3,
											fontSize: 12,
											width: "90%",
											height: 1,
											textAlign: "center",
										}}
									>
										Click on the map to get started
									</Typography>
								) : error ? (
									<Typography
										color="error"
										sx={{
											my: 1,
											maxWidth: "80%",
											mx: "auto",
										}}
									>
										<Alert severity="error">Uh oh! {error.message} :(</Alert>
									</Typography>
								) : (
									<Typography
										sx={{
											fontWeight: "bold",
											letterSpacing: 3,
											fontSize: 12,
											width: "90%",
											height: 1,
										}}
									>
										{loading ? "Loading..." : locationName}
									</Typography>
								)
							}
							subheader={
								data?.address?.country && !loading && !error ? (
									<Typography sx={{ color: "gray", fontSize: 4, mt: 2 }}>
										{data.address.country}
									</Typography>
								) : null
							}
						/>

						<CardContent
							sx={{
								backgroundColor: "rgba(0, 171, 239, 0.1)",
								pl: 0,
								pr: 0,
								pt: 0,
								overflowY: "auto",
								mb: 6,
								minHeight: 130,
							}}
						>
							{props.showMoreDetails ? (
								<CardTabs data={data} loading={loading} />
							) : (
								<AddressDetails data={data} loading={loading} />
							)}
							<Box
								sx={{
									position: "absolute",
									bottom: 0,
									left: 0,
									backgroundColor: "white",
									height: 40,
									width: 1,
									margin: 0,
									padding: 0,
									color: "gray",
									fontFamily: (theme) => theme.typography.fontFamily,
								}}
							>
								<p style={{ fontSize: "8px", paddingTop: "4px", paddingLeft: "10px" }}>
									{`Lng: ${coords?.lng.toFixed(6)}`} {`Lat: ${coords?.lat.toFixed(6)}`}
								</p>
							</Box>
						</CardContent>
					</Card>
				</Slide>
			</Box>
			<GeoJsonLayer lat={coords?.lat} lng={coords?.lng} geojson={data?.geojson} />
		</>
	);
};

NominatimReverseGeoCoding.defaultProps = {
	mapId: undefined,
};

export default NominatimReverseGeoCoding;
