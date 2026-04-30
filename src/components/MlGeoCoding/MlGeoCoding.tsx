import React, { useEffect, useState } from 'react';
import {
	SxProps,
	Theme,
	ListItemText,
	ListItem,
	List,
	ListItemButton,
	Box,
	InputLabel,
	FormControl,
	InputAdornment,
	OutlinedInput,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MlMarker from '../MlMarker/MlMarker';
import useMap from '../../hooks/useMap';

// import
interface AddressType {
	title: string;
	lat: number;
	long: number;
	id: string | number;
}

const inputStyle: SxProps<Theme> = {
	my: 1,
	background: 'white',
	borderRadius: '4px',
};

interface Point {
	lng: number;
	lat: number;
}

export interface MlGeoCodingProp {
	mapId: string;
	label: string;
	autoCompleteOptionArr: AddressType[];
	handleChangeVal: (newValue: string) => void;
}

const MlGeoCoding = (props: MlGeoCodingProp) => {
	const [selectedPoints, setSelectedPoints] = useState<Point>({ lng: 0, lat: 0 });
	const [listShowed, setListShowed] = useState(false);
	const [loading, setLoading] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const handleChangeOutSideVal = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLoading(true);
		setSearchValue(event.target.value);
		props.handleChangeVal(event.target.value);
	};

	useEffect(() => {
		if (props.autoCompleteOptionArr.length < 1) return;
		setListShowed(true);
		setLoading(false);
	}, [props.autoCompleteOptionArr]);

	const mapHook = useMap({
		mapId: props.mapId,
	});

	const handleListItemClick = (points: Point, title: string) => {
		setSelectedPoints(points);
		setSearchValue(title);

		mapHook?.map?.map?.flyTo({
			center: [points.lng, points.lat],
			zoom: 9,
			speed: 1.75,
			curve: 1,
		});
	};

	return (
		<>
			<Box
				sx={{
					zIndex: 1002,
					px: 1,
					position: 'relative',
				}}
				onClick={() => setListShowed(false)}
			>
				<FormControl fullWidth color="info" sx={inputStyle} variant="outlined">
					<InputLabel>{props.label}</InputLabel>
					<OutlinedInput
						fullWidth
						label={props.label}
						value={searchValue}
						onChange={handleChangeOutSideVal}
						endAdornment={
							<InputAdornment position="end">
								<SearchIcon color="info" />
							</InputAdornment>
						}
					/>
				</FormControl>

				{listShowed === true ? (
					<List sx={{ background: 'white', borderRadius: '5px', boxShadow: 3 }}>
						{loading ? (
							<ListItem>
								<ListItemText primary={'loading... '} />
							</ListItem>
						) : props.autoCompleteOptionArr.length > 1 ? (
							props.autoCompleteOptionArr.map((el: AddressType) => (
								<ListItemButton
									key={el.id}
									onClick={() =>
										handleListItemClick(
											{
												lng: el.long || 0,
												lat: el.lat || 0,
											},
											el?.title
										)
									}
								>
									<ListItemText primary={el?.title} />
								</ListItemButton>
							))
						) : (
							<ListItem>
								<ListItemText primary={searchValue + ' is not available '} />
							</ListItem>
						)}
					</List>
				) : null}
			</Box>

			{(selectedPoints.lat || selectedPoints.lng) && (
				<MlMarker {...selectedPoints} content="WhereGroup" mapId={props.mapId} />
			)}
		</>
	);
};

MlGeoCoding.defaultProps = {
	mapId: 'map_1',
	label: 'Search',
};

export default MlGeoCoding;
