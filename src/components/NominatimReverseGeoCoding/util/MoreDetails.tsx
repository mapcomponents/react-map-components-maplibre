import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { CircularProgress } from "@mui/material";

type AddressDetailsProps = {
	loading: boolean;
	data: { extratags: any };
};
export default function MoreDetails({ data, loading }: AddressDetailsProps) {
	const extraDetailsObj = data?.extratags;
	const extraDetailsContent: React.ReactNode[] = [];

	const formattedContentHeader = (item: string) => {
		if (!item) return "";
		const cleaned = item.replace("_", " ").replace(":", " ");
		return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
	};
	const formattedContent = (item: string) => {
		const value = extraDetailsObj[item];

		if (
			item === "website" ||
			item === "contact:website" ||
			(typeof value === "string" && value.startsWith("http"))
		) {
			return (
				<Link href={value} target="_blank" rel="noopener noreferrer" underline="hover">
					{value}
				</Link>
			);
		} else if (
			item === "email" ||
			item === "contact:email" ||
			(typeof value === "string" && value.includes("@"))
		) {
			return (
				<Link href={`mailto:${value}`} underline="hover">
					{value}
				</Link>
			);
		} else {
			return value;
		}
	};
	for (let item in extraDetailsObj) {
		extraDetailsContent.push(
			<Box
				key={item}
				sx={{
					maxHeight: 300,
				}}
			>
				<Typography variant="caption" color="text.secondary">
					{formattedContentHeader(item)}
				</Typography>
				<Typography variant="body1">{formattedContent(item)}</Typography>
			</Box>,
		);
	}

	return (
		<>
			<Box sx={{ mt: 2 }}>
				{loading ? (
					<Box
						sx={{
							textAlign: "center",
						}}
					>
						<CircularProgress />
					</Box>
				) : (
					extraDetailsContent
				)}
			</Box>
		</>
	);
}
