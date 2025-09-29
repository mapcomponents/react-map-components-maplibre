import { Edit, SimpleForm, TextInput, Show, SimpleShowLayout, TextField } from 'react-admin';
import GeospatialInput from '../components/GeospatialInput';
import GeospatialShow from '../components/GeospatialShow';
import raGeospatialProps from './raGeospatialProps';
import raGeospatialWebGisProps from './raGeospatialWebGisProps';

export const PoiEdit = () => (
	<Edit mutationMode="optimistic" resource="pois" id="0" redirect={false}>
		<SimpleForm>
			<TextInput source="title" />
			<TextInput source="geom" />
			<GeospatialInput {...raGeospatialProps} type="point" />
		</SimpleForm>
	</Edit>
);
export const PoiEditWebGis = () => (
	<Edit mutationMode="optimistic" resource="pois" id="0" redirect={false}>
		<SimpleForm>
			<TextInput source="title" />
			<TextInput source="geom" />
			<GeospatialInput {...raGeospatialWebGisProps} type="point" />
		</SimpleForm>
	</Edit>
);
export const PoiShow = () => (
	<Show resource="pois" id="0">
		<SimpleShowLayout>
			<TextField source="id" />
			<TextField source="title" />
			<GeospatialShow {...raGeospatialProps} />
		</SimpleShowLayout>
	</Show>
);
export const PoiShowWebGis = () => (
	<Show resource="pois" id="0">
		<SimpleShowLayout>
			<TextField source="id" />
			<TextField source="title" />
			<GeospatialShow {...raGeospatialWebGisProps} />
		</SimpleShowLayout>
	</Show>
);
