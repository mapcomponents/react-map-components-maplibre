import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

type AddressDetailsProps = {
	loading: boolean;
	data: any;
};
export default function AddressDetails({ loading, data }: AddressDetailsProps) {
	return (
		<>
			{loading ? (
				<Box
					sx={{
						textAlign: "center",
						minHeight: 200,
						height: 1,
						overflowY: "scroll",
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<Box
					component="ul"
					sx={{
						listStyleType: "none",
						paddingLeft: 2,
						lineHeight: 1.5,
						letterSpacing: 1.5,
						color: "black",
						fontSize: 8,
						fontFamily: (theme) => theme.typography.fontFamily,
					}}
				>
					{data?.display_name?.split(",").map((item: string, index: number) => (
						<li key={index}>{item.trim()}</li>
					))}
				</Box>
			)}
		</>
	);
}
