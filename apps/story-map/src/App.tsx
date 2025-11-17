import { MapLibreMap, TopToolbar, useMap } from '@mapcomponents/react-maplibre';
import './App.css';
import { Button, ButtonGroup, Grid, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useState } from 'react';
import './i18n';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import MlThreeJsLayer from './components/MlThreeJsLayer';
import { StationType, useStationContext } from './contexts/StationContext';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CameraController from './components/CameraController';

export interface AutoplayOptions {
	isStarted: boolean;
	isPaused: boolean;
}

type LanguageSelection = 'en' | 'de';

function App() {
	const [language, setLanguage] = useState<LanguageSelection>('de');
	const [autoplay, setAutoplay] = useState<AutoplayOptions>({ isStarted: false, isPaused: false });

	const { t } = useTranslation();
	const { stationInformations, selectedStation, selectStationById } = useStationContext();
	const mapHook = useMap();
	mapHook.map?.setProjection({type: 'globe'});
	mapHook.map?.setSky({
		"sky-color": "#199EF3",
		"sky-horizon-blend": 0.5,
		"horizon-color": "#ffffff",
		"horizon-fog-blend": 0.9,
		"fog-color": "#0000ff",
		"fog-ground-blend": 0.95,
	});

	const handleChangeLanguage = () => {
		console.log('switch');
		const newLanguage: LanguageSelection = language === 'de' ? 'en' : 'de';
		setLanguage(newLanguage);
		i18n.changeLanguage(newLanguage);
	};

	return (
		<Grid container sx={{ height: '100%' }}>
			{/* TopToolbar */}
			<Grid size={12} sx={{ minHeight: '62px' }}>
				<TopToolbar
					unmovableButtons={
						<Button
							size="large"
							onClick={() => {
								handleChangeLanguage();
							}}
						>
							{t('LanguageSwitcherButton')}
						</Button>
					}
				/>
			</Grid>

			{/* Menu */}
			<Grid
				size={2}
				sx={{
					height: 'calc(100% - 62px)',
					padding: '1rem',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Grid container gap={1} sx={{ width: '100%', flexGrow: 0 }}>
					{stationInformations.map((station: StationType) => (
						<Grid key={station.id} size={12}>
							<Button
								sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
								variant={selectedStation?.id === station.id ? 'contained' : 'outlined'}
								onClick={() => selectStationById(station.id)}
							>
								<Typography>{station.label}</Typography>
								{selectedStation?.id === station.id && <RemoveRedEyeIcon sx={{ color: '#fff'}} />}
							</Button>
						</Grid>
					))}
				</Grid>

				{!autoplay.isStarted ? (
					<Button
						size={'large'}
						variant="outlined"
						sx={{
							color: '#4b4b4b',
							borderColor: '#696969',
							width: '100%',
							maxWidth: '80',
							marginTop: 'auto',
						}}
						onClick={() => {
							setAutoplay({
								isStarted: true,
								isPaused: false,
							});
						}}
					>
						<Typography>{t('StartWalkThroughButton')}</Typography>
					</Button>
				) : (
					<ButtonGroup
						sx={{
							color: '#4b4b4b',
							borderColor: '#696969',
							width: '100%',
							maxWidth: '80',
							marginTop: 'auto',
						}}
					>
						<Button
							size={'large'}
							sx={{
								color: '#ff0000',
								borderColor: '#696969',
								width: '100%',
							}}
							onClick={() => {
								setAutoplay({
									isStarted: true,
									isPaused: true,
								});
								setAutoplay({
									isStarted: false,
									isPaused: true,
								});
							}}
						>
							<Typography>{t('StopWalkThroughButton')}</Typography>
						</Button>
						<Button
							size={'large'}
							sx={{
								color: '#4b4b4b',
								borderColor: '#696969',
							}}
							onClick={() => {
								const tempBool = !autoplay.isPaused;
								setAutoplay({
									isStarted: true,
									isPaused: tempBool,
								});
							}}
						>
							{autoplay.isPaused ? <PlayArrowIcon /> : <PauseIcon />}
						</Button>
					</ButtonGroup>
				)}
			</Grid>

			{/* Map */}
			<Grid
				size={10}
				sx={{
					height: 'calc(100% - 62px)',
				}}
			>
				<MapLibreMap
					options={{
						style: 'https://wms.wheregroup.com/tileserver/style/klokantech-basic.json',
						zoom: 16,
						maxZoom: 24,
						center: [7.101608817894373, 50.7638952494396],
						pitch: 60,
						bearing: 150,
						maxPitch:75,

						canvasContextAttributes: { antialias: true },
					}}
					style={{
						position: 'relative',
						width: '100%',
						height: '100%',
					}}
				/>
				{autoplay.isStarted && (
					<CameraController
						pause={autoplay.isPaused}
						zoom={selectedStation?.zoom ?? 17}
						speed={selectedStation?.speed ?? 1}
						pitch={selectedStation?.pitch ?? 80}
						showRoute={false}
						setAutoplay={setAutoplay}
					/>
				)}
				<MlThreeJsLayer
					url={'/WhereGroupLogo3D.glb'}
					position={[7.104, 50.764, 40]}
					rotation={[0, 180, -28]}
					scale={0.0001}
				/>
			</Grid>
		</Grid>
	);
}

export default App;
