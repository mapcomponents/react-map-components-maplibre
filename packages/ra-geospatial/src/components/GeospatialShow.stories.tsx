import type { Meta } from '@storybook/react-vite';
import GeospatialShow from './GeospatialShow';
import { ReactAdminDefaultDecorator } from '../decorators/ReactAdminDefaultDecorator';
import { PoiShow, PoiShowWebGis } from '../ra_components/Poi';
import { PropertyShow, PropertyShowWebGis } from '../ra_components/Property';
import { RouteShow, RouteShowWebGis } from '../ra_components/Route';
import GisLayout from '../layout/GisLayout';

const meta = {
	component: GeospatialShow,
	title: 'MapComponents/GeospatialShow',
	decorators: [ReactAdminDefaultDecorator],
} satisfies Meta<typeof GeospatialShow>;

export default meta;

export const PoisShow = PoiShow.bind({});

PoisShow.args = {
	primary: true,
	embeddedMap: true,
};

PoisShow.parameters = {
	name: 'pois',
};

export const PropertiesShow = PropertyShow.bind({});

PropertiesShow.args = {
	primary: true,
	embeddedMap: true,
};

PropertiesShow.parameters = {
	name: 'properties',
};

export const RoutesShow = RouteShow.bind({});

RoutesShow.args = {
	primary: true,
	embeddedMap: true,
};

RoutesShow.parameters = {
	name: 'routes',
};

export const PoisShowGIS = PoiShowWebGis.bind({});

PoisShowGIS.args = {
	primary: true,
	embeddedMap: false,
};

PoisShowGIS.parameters = {
	name: 'pois',
	layout: GisLayout,
};

export const PropertiesShowGIS = PropertyShowWebGis.bind({});

PropertiesShowGIS.args = {
	primary: true,
	embeddedMap: false,
};

PropertiesShowGIS.parameters = {
	name: 'properties',
	layout: GisLayout,
};

export const RoutesShowGIS = RouteShowWebGis.bind({});

RoutesShowGIS.args = {
	primary: true,
	embeddedMap: false,
};

RoutesShowGIS.parameters = {
	name: 'routes',
	layout: GisLayout,
};
