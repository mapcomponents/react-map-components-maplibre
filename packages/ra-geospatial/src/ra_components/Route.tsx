import { Edit, Show, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import GeospatialInput from '../components/GeospatialInput';
import GeospatialShow from '../components/GeospatialShow';
import raGeospatialProps from './raGeospatialProps';
import raGeospatialWebGisProps from './raGeospatialWebGisProps';

export const RouteEdit = () => (
	<Edit mutationMode="optimistic" resource="routes" id="0" redirect={false}>
		<SimpleForm>
			<TextInput source="title" />
			<TextInput source="geom" />
			<GeospatialInput {...raGeospatialProps} type="line" />
		</SimpleForm>
	</Edit>
);
export const RouteEditWebGis = () => (
	<Edit mutationMode="optimistic" resource="routes" id="0" redirect={false}>
		<SimpleForm>
			<TextInput source="title" />
			<TextInput source="geom" />
			<GeospatialInput {...raGeospatialWebGisProps} type="line" />
		</SimpleForm>
	</Edit>
);
export const RouteShow = () => (
	<Show resource="routes" id="0">
		<SimpleShowLayout>
			<TextField source="id" />
			<TextField source="title" />
			<GeospatialShow {...raGeospatialProps} />
		</SimpleShowLayout>
	</Show>
);
export const RouteShowWebGis = () => (
	<Show resource="routes" id="0">
		<SimpleShowLayout>
			<TextField source="id" />
			<TextField source="title" />
			<GeospatialShow {...raGeospatialWebGisProps} />
		</SimpleShowLayout>
	</Show>
);
