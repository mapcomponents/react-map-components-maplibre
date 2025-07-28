import React from "react";
import { Box } from "@mui/material";
import TopToolbar from "../../../ui_components/TopToolbar";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
type NavbarProps = {
	showCard: boolean;
	toggleCard: () => void;
};
export default function Navbar({ showCard, toggleCard }: NavbarProps) {
	return (
		<Box>
			<TopToolbar />
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					position: "absolute",
					top: 8,
					right: 16,
					zIndex: 1300,
				}}
			>
				<FormControlLabel
					control={<Switch checked={showCard} />}
					label="Card Visibility"
					onClick={toggleCard}
				/>
			</Box>
		</Box>
	);
}
