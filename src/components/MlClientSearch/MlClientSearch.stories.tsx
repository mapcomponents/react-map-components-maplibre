import React, { useState } from 'react';
import MlClientSearch from './MlClientSearch';
import index from './lib/searchIndex.json';
import { makeMapContextDecorators } from '../../decorators/MapContextDecorator';
import Sidebar from '../../ui_components/Sidebar';
import TopToolbar from '../../ui_components/TopToolbar';
import { Box, Button, Stack } from '@mui/material';
import { SearchContextInterface } from './lib/searchContext';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const storyoptions = {
	title: 'MapComponents/MlClientSearch',
	component: MlClientSearch,
	argTypes: {},
	decorators: makeMapContextDecorators({
		center: [10.416667, 51.133333],
		bearing: 180,
		zoom: 5,
		pitch: 60,
	}),
};
export default storyoptions;

const Template = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	return (
		<>
			<TopToolbar
				buttons={
					<>
						<Button
							variant={openSidebar ? 'contained' : 'outlined'}
							onClick={() => setOpenSidebar(!openSidebar)}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							Search
						</Button>
					</>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Client-side search'}>
        <Stack paddingTop={5} spacing={3} direction="column" alignItems="left">

				<MlClientSearch
					searchIndex={index as unknown as SearchContextInterface['searchIndex']}
					fields={{ CITY: { expand: true }, POPULATION: { expand: true } }}
					renderOption={(props: any, option: any) => (
						<Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
							{option.CITY}, {option.POPULATION}
						</Box>
					)}
					searchFieldLabel="German cities"
				/>
				<Typography variant="body2" sx={{wordBreak: "break-all"}}>
					<Link
						href="https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-500"
						underline="always"
						target="_blank"
					>
						{'Sample data'}
					</Link> - public.opendatasoft.com
				</Typography>
				</Stack>
			</Sidebar>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
