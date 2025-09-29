import type { Meta } from '@storybook/react-vite';
import GeospatialInput from './GeospatialInput';
import { ReactAdminDefaultDecorator } from '../decorators/ReactAdminDefaultDecorator';
import { PoiEdit, PoiEditWebGis } from '../ra_components/Poi';
import { PropertyEdit, PropertyEditWebGis } from '../ra_components/Property';
import { RouteEdit, RouteEditWebGis } from '../ra_components/Route';
import GisLayout from '../layout/GisLayout';

const meta = {
	component: GeospatialInput,
	title: 'MapComponents/GeospatialInput',
	decorators: [ReactAdminDefaultDecorator],
} satisfies Meta<typeof GeospatialInput>;

export default meta;

export const PoisEdit = PoiEdit.bind({});

PoisEdit.args = {
	primary: true,
	embeddedMap: true,
};

PoisEdit.parameters = {
	name: 'pois',
};
export const PropertiesEdit = PropertyEdit.bind({});

PropertiesEdit.args = {
	primary: true,
	embeddedMap: true,
};

PropertiesEdit.parameters = {
	name: 'properties',
};

export const RoutesEdit = RouteEdit.bind({});

RoutesEdit.args = {
	primary: true,
	embeddedMap: true,
};

RoutesEdit.parameters = {
	name: 'routes',
};

export const PoisEditGIS = PoiEditWebGis.bind({});

PoisEditGIS.args = {
	primary: true,
	embeddedMap: false,
};

PoisEditGIS.parameters = {
	name: 'pois',
	layout: GisLayout,
};

export const PropertiesEditGIS = PropertyEditWebGis.bind({});

PropertiesEditGIS.args = {
	primary: true,
	embeddedMap: false,
};

PropertiesEditGIS.parameters = {
	name: 'properties',
	layout: GisLayout,
};

export const RoutesEditGIS = RouteEditWebGis.bind({});

RoutesEditGIS.args = {
	primary: true,
	embeddedMap: false,
};

RoutesEditGIS.parameters = {
	name: 'routes',
	layout: GisLayout,
};
