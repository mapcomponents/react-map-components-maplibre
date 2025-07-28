import React, { useState } from "react";
import { Tabs, Box, Tab } from "@mui/material";
import AddressDetails from "./AddressDetails";
import MoreDetails from "./MoreDetails";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<Box
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			sx={{ overflowY: "hidden", overflowX: "hidden" }}
			{...other}
		>
			{value === index && <Box sx={{ pl: 2 }}>{children}</Box>}
		</Box>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}
interface CardTabsProps {
	data: any;
	loading: boolean;
}

export default function CardTabs({ data, loading }: CardTabsProps) {
	const [value, setValue] = useState(0);
	const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	return (
		<Box sx={{ width: "350px", fontFamily: (theme) => theme.typography.fontFamily }}>
			<Box
				sx={{
					position: "sticky",
					top: 0,
					width: 1,
					zIndex: 10,
					padding: 0,
					backdropFilter: "blur(15px)",
					borderBottom: 1,
					borderColor: "divider",
				}}
			>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab
						label="Address"
						{...a11yProps(0)}
						sx={{
							fontSize: 10,
						}}
					/>
					<Tab
						label="More Details"
						{...a11yProps(1)}
						disabled={!data?.extratags}
						sx={{
							fontSize: 6,
						}}
					/>
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<AddressDetails loading={loading} data={data} />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<MoreDetails data={data} loading={loading} />
			</CustomTabPanel>
		</Box>
	);
}
