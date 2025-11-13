import { MapLibreMap, TopToolbar, MlMarker } from '@mapcomponents/react-maplibre';
import './App.css';
import { Button, ButtonGroup, Grid, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useState } from 'react';
import './i18n';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import MlThreeJsLayer from './Components/MlThreeJsLayer';

interface AutoplayOptions {
	isStarted: boolean;
	isPaused: boolean;
}

type LanguageSelection = 'en' | 'de';

function App() {
	const [language, setLanguage] = useState<LanguageSelection>('de');
	const [autoplay, setAutoplay] = useState<AutoplayOptions>({ isStarted: false, isPaused: true });

	const { t } = useTranslation();

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
				}}
			>
				<Grid container sx={{ height: 'calc(100% - 45px)', width: '100%' }}>
					<Grid size={12}></Grid>
				</Grid>

				{!autoplay.isStarted ? (
					<Button
						size={'large'}
						variant="outlined"
						sx={{ color: '#4b4b4b', borderColor: '#696969', width: '100%', maxWidth: '80' }}
					>
						<Typography
							onClick={() => {
								setAutoplay({
									isStarted: true,
									isPaused: false,
								});
							}}
						>
							{t('StartWalkThroughButton')}
						</Typography>
					</Button>
				) : (
					<ButtonGroup
						sx={{ color: '#4b4b4b', borderColor: '#696969', width: '100%', maxWidth: '80' }}
					>
						<Button>Test</Button>
						<Button
							size={'large'}
							sx={{
								color: '#ff0000',
								borderColor: '#696969',
								width: '100%',
							}}
							onClick={() => {
								setAutoplay({
									isStarted: false,
									isPaused: false,
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
						center: [7.1, 50.77],
						pitch: 60,
						bearing: 150,
					}}
					style={{
						position: 'relative',
						width: '100%',
						height: '100%',
					}}
				/>
				<MlMarker
					lng={7.103249}
					lat={50.763336}
					containerStyle={{
						borderRadius: '8px',
						boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
						overflow: 'hidden',
						backgroundColor: 'white',
					}}
					content={t('MlMarker')}
				/>
				<MlThreeJsLayer
					url={'/WhereGroupLogo3D.glb'}
					position={[7.101608817894373, 50.7638952494396]}
					scale={0.0001}
				/>
			</Grid>
		</Grid>
	);
}

export default App;
