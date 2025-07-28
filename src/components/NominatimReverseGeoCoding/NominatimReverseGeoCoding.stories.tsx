import React, { useState } from "react";
import { Box } from "@mui/material";
import TopToolbar from "../../ui_components/TopToolbar";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import NominatimReverseGeoCoding from "./NominatimReverseGeoCoding";
import NoNavToolsDecorator from "../../decorators/NoNavToolsDecorator";

const storyoptions = {
	title: "MapComponents/NominatimReverseGeoCoding",
	component: NominatimReverseGeoCoding,
	argTypes: {},
	decorators: NoNavToolsDecorator,
};
export default storyoptions;

const Template = () => {
	const [isCardActive, setIsCardActive] = useState<boolean>(true);
	const [cardVisible, setCardVisible] = useState<boolean>(false);
	const activateCard = () => setIsCardActive((prev) => !prev);

	return (
		<>
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
						control={<Switch checked={isCardActive} onChange={activateCard} />}
						label="Card Visibility"
					/>
				</Box>
			</Box>

			<NominatimReverseGeoCoding
				cardSlideInDirection="right"
				showMoreDetails={true}
				activateCard={activateCard}
				isCardActive={isCardActive}
				isCardVisible={cardVisible}
				setCardVisible={setCardVisible}
			/>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
