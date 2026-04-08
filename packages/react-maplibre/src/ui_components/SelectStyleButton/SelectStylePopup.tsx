import {
	Box,
	Card,
	CardActionArea,
	CardMedia,
	Dialog,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';
import { StyleSpecification } from 'maplibre-gl';

export interface SelectStylePopupProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	styles?: StyleSpecification[];
	onSelect?: (style: StyleSpecification) => void;
	styleThumbnailPaths?: { [key: string]: string };
}

const SelectStylePopup = ({
	styleThumbnailPaths = {},
	...props
}: SelectStylePopupProps) => {
	const handleCancel = () => {
		props.setOpen(false);
	};

	return (
		<Dialog
			open={props.open}
			onClose={handleCancel}
			maxWidth="sm"
			fullWidth
		>
			<DialogTitle>Select a style</DialogTitle>
			<DialogContent>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
						gap: 1.5,
						pb: 1,
					}}
				>
					{props?.styles?.map((style) => {
						const thumbSrc = style?.name
							? styleThumbnailPaths[style.name]
							: undefined;

						return (
							<Card
								key={style.name}
								variant="outlined"
								sx={{
									transition: 'box-shadow 0.2s, border-color 0.2s',
									'&:hover': {
										borderColor: 'primary.main',
										boxShadow: 2,
									},
								}}
							>
								<CardActionArea
									onClick={() => props?.onSelect?.(style)}
								>
									<CardMedia
										component="img"
										image={thumbSrc || ''}
										alt={style.name}
										sx={{
											height: 100,
											objectFit: 'cover',
											bgcolor: 'action.hover',
										}}
									/>
									<Typography
										variant="body2"
										align="center"
										sx={{ py: 1, px: 0.5, fontWeight: 500 }}
										noWrap
									>
										{style.name}
									</Typography>
								</CardActionArea>
							</Card>
						);
					})}
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default SelectStylePopup;
