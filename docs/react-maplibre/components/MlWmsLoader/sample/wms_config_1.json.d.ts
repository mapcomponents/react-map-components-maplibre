declare const _default: {
	"layers": [
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_buildings_polygon",
			"Title": "Emprises des bâtiments - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["features", "france_buildings_polygon"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_buildings",
					"Title": "france_buildings",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_buildings_polygon",
							"size": [20, 20]
						}
					]
				},
				{
					"Name": "france_buildings",
					"Title": "france_buildings",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_buildings_polygon&style=france_buildings",
							"size": [20, 20]
						}
					]
				}
			],
			"MaxScaleDenominator": 150000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_constructions",
			"Title": "Localisations des constructions - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["features", "Localisations des constructions - France métropolitaine"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_constructions",
					"Title": "france_constructions",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_constructions",
							"size": [175, 220]
						}
					]
				}
			],
			"MaxScaleDenominator": 70000000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": true,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_landuses_naturals_polygon",
			"Title": "Occupation du sol - France métropolitaine",
			"Abstract": "Extrait quotidien d'éléments d'occupation du sol naturels et artificiels en France métropolitaine présentes dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1]. Ne sont pas inclus les bâtiments et les cours d'eau.\r\n\r\nLa couche est disponible dans magOSM https://magosm.magellium.com/\r\n\r\n    accessible via des services WMS et WFS publics\r\n    visualisable, requêtable et téléchargeable via le portail\r\n\r\nModèle de données\r\nLes attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    landuse=*\r\n    natural=*\r\n    wood = *\r\n    leisure = *\r\n    tourisme=*\r\n    aeroway=*\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre aux différents usages du sol sur la page Wiki OSM - Land use and areas of natural land [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale [2] https://wiki.openstreetmap.org/wiki/Land_use_and_areas_of_natural_land [3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques [4] https://taginfo.openstreetmap.org",
			"KeywordList": ["features", "france_landuses_naturals_polygon"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_landuses_naturals",
					"Title": "france_landuses_naturals",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_landuses_naturals_polygon",
							"size": [391, 1080]
						}
					]
				},
				{
					"Name": "france_landuses_naturals",
					"Title": "france_landuses_naturals",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_landuses_naturals_polygon&style=france_landuses_naturals",
							"size": [391, 1080]
						}
					]
				}
			],
			"MaxScaleDenominator": 1000000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": true,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_pnr_polygon",
			"Title": "Parcs Naturels Régionaux - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["features", "france_pnr_polygon"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_pnr_polygon",
					"Title": "france_pnr_polygon",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_pnr_polygon",
							"size": [186, 20]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": true,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_police_point",
			"Title": "Localisations des brigades de gendarmeries et commissariats de police - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["features", "france_police_point"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_police_point",
					"Title": "france_police_point",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_police_point",
							"size": [170, 80]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": true,
			"Name": "magosm:france_proposed",
			"Title": "Localisations des projets de constructions - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["features", "france_proposed"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_proposed",
					"Title": "france_proposed",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_proposed",
							"size": [235, 220]
						}
					]
				}
			],
			"MaxScaleDenominator": 70000000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": true,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_schools_point",
			"Title": "Localisations des établissements scolaires - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["features", "france_schools_point"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_schools_point",
					"Title": "france_schools_point",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_schools_point",
							"size": [342, 80]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": true,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_shops_point",
			"Title": "Localisations des magasins - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["features", "france_shops_point"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_shops_point",
					"Title": "france_shops_point",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_shops_point",
							"size": [246, 880]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": true,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_social_facility_point",
			"Title": "Localisation des structures sociales - France métropolitaine",
			"Abstract": "",
			"KeywordList": [
				"features",
				"Localisation des structures sociales - France métropolitaine",
				"social_amenity_point"
			],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_social_facility_point_cluster",
					"Title": "france_social_facility_point_cluster",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_social_facility_point",
							"size": [248, 200]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": true,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_vineyards_grapes_polygon",
			"Title": "Vignobles - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["france_vineyards_grapes_polygon", "features"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_vineyards_grapes_polygon",
					"Title": "france_vineyards_grapes_polygon",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_vineyards_grapes_polygon",
							"size": [20, 20]
						}
					]
				}
			],
			"MaxScaleDenominator": 10000000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_bicycle_mtb_routes_line",
			"Title": "Itinéraires cyclables - France métropolitaine",
			"Abstract": "Extrait quotidien des itinéraires cyclables en France métropolitaine présentes dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nLa couche est disponible dans magOSM https://magosm.magellium.com/\r\n\r\n    accessible via des services WMS et WFS publics\r\n    visualisable, requêtable et téléchargeable via le portail\r\n\r\nModèle de données\r\nLes attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    route=bicycle\r\n    route=mtb\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre aux itinéraires cyclables tout terrain sur la page Wiki OSM - FR:Cyclisme tout terrain [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale \r\n[2] https://wiki.openstreetmap.org/wiki/FR:Cyclisme_tout_terrain \r\n[3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques \r\n[4] https://taginfo.openstreetmap.org",
			"KeywordList": [
				"features",
				"france_bicycle_mtb_routes_line",
				"cyclotourisme",
				"pistes cyclables",
				"openstreetmap"
			],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"MetadataURL": [
				{
					"Format": "xml",
					"OnlineResource": "https://app.isogeo.com/api/v1/resources/9c01b3e617b44fb5a104623425626a03.xml",
					"type": "19139"
				}
			],
			"Style": [
				{
					"Name": "france_bicycle_mtb_routes_line",
					"Title": "france_bicycle_mtb_routes_line",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_bicycle_mtb_routes_line",
							"size": [291, 120]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_bus_routes_line",
			"Title": "Itinéraires de bus - France métropolitaine",
			"Abstract": "Extrait quotidien des lignes de bus (itinéraires) en France métropolitaine présentes dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nLa couche est disponible dans magOSM https://magosm.magellium.com/\r\n\r\n    accessible via des services WMS et WFS publics\r\n    visualisable, requêtable et téléchargeable via le portail\r\n\r\nModèle de données\r\nOn s'intéresse ici aux itinéraires définis par des éléments OSM de type \"relation\". Les attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    route=bus\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre aux itinéraires de bus sur la page Wiki OSM - Tag:route=bus [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale \r\n[2] https://wiki.openstreetmap.org/wiki/Tag:route%3Dbus \r\n[3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques \r\n[4] https://taginfo.openstreetmap.org",
			"KeywordList": ["features", "france_bus_routes_line"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_bus_routes_line",
					"Title": "france_bus_routes_line",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_bus_routes_line",
							"size": [105, 20]
						}
					]
				},
				{
					"Name": "france_bus_routes_line",
					"Title": "france_bus_routes_line",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_bus_routes_line&style=france_bus_routes_line",
							"size": [105, 20]
						}
					]
				},
				{
					"Name": "france_bus_routes_line_old",
					"Title": "france_bus_routes_line_old",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_bus_routes_line&style=france_bus_routes_line_old",
							"size": [48, 80]
						}
					]
				}
			],
			"MaxScaleDenominator": 100000000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_cycleways_line",
			"Title": "Réseau cyclable - France métropolitaine",
			"Abstract": "Extrait quotidien du réseau cyclable (infrastructures) en France métropolitaine présent dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nLa couche est disponible dans magOSM https://magosm.magellium.com/\r\n\r\n    accessible via des services WMS et WFS publics\r\n    visualisable, requêtable et téléchargeable via le portail\r\n\r\nModèle de données\r\n\r\nLes attributs OSM utilisés pour filtrer la donnée sont : highway='cycleway' OR bicycle='designated' OR (tags ? 'cycleway' AND tags->'cycleway' != 'no') OR (tags ? 'cycleway:left' AND tags->'cycleway:left' != 'no') OR (tags ? 'cycleway:right' AND tags->'cycleway:right' != 'no') OR (tags ? 'cycleway:both' AND tags->'cycleway:both' != 'no');\r\n\r\n    highway=cycleway\r\n    bicycle=designated\r\n    cycleway=* sauf 'no'\r\n    cycleway:left=* sauf 'no'\r\n    cycleway:right=* sauf 'no'\r\n    cycleway:both=* sauf 'no'\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre au réseau cyclable sur la page Wiki OSM - FR:Bicycle [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale [2] https://wiki.openstreetmap.org/wiki/FR:Bicycle [3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques [4] https://taginfo.openstreetmap.org",
			"KeywordList": ["features", "france_cycleways_line"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_cycleways_line",
					"Title": "france_cycleways_line",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_cycleways_line",
							"size": [119, 40]
						}
					]
				}
			],
			"MaxScaleDenominator": 300000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_highways_line",
			"Title": "Réseau routier - France métropolitaine",
			"Abstract": "Extrait quotidien du réseau routier en France métropolitaine présentes dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nLa couche est disponible dans magOSM https://magosm.magellium.com/\r\n\r\n    accessible via des services WMS et WFS publics\r\n    visualisable, requêtable et téléchargeable via le portail\r\n\r\nModèle de données\r\nLes attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    highway = motorway\r\n    highway = trunk\r\n    highway = primary\r\n    highway = secondary\r\n    highway = tertiary\r\n    highway = motorway_link / trunk_link / primary_link / secondary_link / tertiary_link / motorway_link\r\n    highway = unclassified\r\n    highway = residential\r\n    highway = service\r\n    highway = pedestrian\r\n    highway = living_street\r\n    highway = track\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre aux autoroutes sur la page Wiki OSM - FR:France roads tagging [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale [2] https://wiki.openstreetmap.org/wiki/FR:France_roads_tagging [3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques [4] https://taginfo.openstreetmap.org",
			"KeywordList": ["features", "france_highways_line"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_highways_line",
					"Title": "france_highways_line",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_highways_line",
							"size": [260, 588]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Name": "magosm:france_highways_line_recently_modified",
			"Title": "Modifications Récentes du Réseau Routier",
			"Abstract": "",
			"KeywordList": ["features", "france_highways_line_recently_modified"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_highways_line",
					"Title": "france_highways_line",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_highways_line_recently_modified",
							"size": [260, 588]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_hiking_foot_routes_line",
			"Title": "Itinéraires de randonnée - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["features", "france_hiking_foot_routes_line"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_hiking_foot_routes_line",
					"Title": "france_hiking_foot_routes_line",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_hiking_foot_routes_line",
							"size": [330, 80]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_motorways_line",
			"Title": "Autoroutes - France métropolitaine",
			"Abstract": "Extrait quotidien des autoroutes (infrastructures) en France métropolitaine présentes dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nLa couche est disponible dans magOSM https://magosm.magellium.com/\r\n\r\n    accessible via des services WMS et WFS publics\r\n    visualisable, requêtable et téléchargeable via le portail\r\n\r\nModèle de données\r\nLes attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    highway=motorway\r\n    highway=motorway_link\r\n    highway=motorway_junction\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre aux autoroutes sur la page Wiki OSM - WikiProject_France/Autoroutes [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale [2] https://wiki.openstreetmap.org/wiki/WikiProject_France/Autoroutes [3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques [4] https://taginfo.openstreetmap.org",
			"KeywordList": ["features", "france_motorways_line"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_motorways_line",
					"Title": "france_motorways_line",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_motorways_line",
							"size": [162, 20]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_railways_line",
			"Title": "Voies ferrées - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["features", "france_railways_line"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_railways_line",
					"Title": "france_railways_line",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_railways_line",
							"size": [108, 140]
						}
					]
				},
				{
					"Name": "france_railway_line_test",
					"Title": "france_railway_line_test",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_railways_line&style=france_railway_line_test",
							"size": [150, 60]
						}
					]
				}
			],
			"MaxScaleDenominator": 100000000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_subway_routes_line",
			"Title": "Itinéraires de métro - France métropolitaine",
			"Abstract": "Extrait quotidien des lignes de métro (itinéraires) en France métropolitaine présentes dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nLa couche est disponible dans magOSM https://magosm.magellium.com/\r\n\r\n    accessible via des services WMS et WFS publics\r\n    visualisable, requêtable et téléchargeable via le portail\r\n\r\nModèle de données\r\nLes attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    route=subway\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre aux itinéraires de métro sur les pages Wiki OSM - Tag:route=subway [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale [2] https://wiki.openstreetmap.org/wiki/Tag:route%3Dsubway [3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques [4] https://taginfo.openstreetmap.org",
			"KeywordList": ["features", "france_subway_routes_line"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_subway_routes_line",
					"Title": "france_subway_routes_line",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_subway_routes_line",
							"size": [119, 20]
						}
					]
				},
				{
					"Name": "line",
					"Title": "A boring default style",
					"Abstract": "A sample style that just prints out a green line",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_subway_routes_line&style=line",
							"size": [20, 20]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_train_routes_line",
			"Title": "Itinéraires de train - France métropolitaine",
			"Abstract": "Extrait quotidien des itinéraires de train en France métropolitaine présents dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nLa couche est disponible dans magOSM https://magosm.magellium.com/\r\n\r\n    accessible via des services WMS et WFS publics\r\n    visualisable, requêtable et téléchargeable via le portail\r\n\r\nModèle de données\r\nLes attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    route=train\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre aux itinéraires de train en France sur la page Wiki OSM - France/Voies ferrées [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale \r\n[2] https://wiki.openstreetmap.org/wiki/France/Voies_ferr%C3%A9es\r\n[3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques \r\n[4] https://taginfo.openstreetmap.org",
			"KeywordList": ["features", "france_train_routes_line"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"DataURL": [
				{
					"Format": "text/plain",
					"OnlineResource": "https://www.data.gouv.fr/fr/datasets/itineraires-de-train-france-metropolitaine/"
				}
			],
			"Style": [
				{
					"Name": "france_train_routes_line",
					"Title": "france_train_routes_line",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_train_routes_line",
							"size": [190, 120]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_tram_ltr_routes_line",
			"Title": "Itinéraires de tramways - France métropolitaine",
			"Abstract": "Extrait quotidien des itinéraires de tramways en France métropolitaine présents dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nLa couche est disponible dans magOSM https://magosm.magellium.com/\r\n\r\n    accessible via des services WMS et WFS publics\r\n    visualisable, requêtable et téléchargeable via le portail\r\n\r\nModèle de données\r\nLes attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    route=light_rail\r\n    route=tram\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre aux itinéraires de métro sur les pages Wiki OSM - Tag:route=tram [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale [2] https://wiki.openstreetmap.org/wiki/Tag:route%3Dtram [3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques [4] https://taginfo.openstreetmap.org",
			"KeywordList": ["features", "france_tram_ltr_routes_line"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_tram_ltr_routes_line",
					"Title": "france_tram_ltr_routes_line",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_tram_ltr_routes_line",
							"size": [111, 20]
						}
					]
				}
			],
			"MaxScaleDenominator": 1000000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_clinics_point",
			"Title": "Localisations des cliniques - France métropolitaine",
			"Abstract": "Extrait quotidien des cliniques en France métropolitaine présentes dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nLa couche est disponible dans magOSM https://magosm.magellium.com/\r\n\r\n    accessible via des services WMS et WFS publics\r\n    visualisable, requêtable et téléchargeable via le portail\r\n\r\nModèle de données\r\nLes attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    amenity=clinic\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre aux cliniques sur la page Wiki OSM - FR:Tag:amenity=clinic [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale \r\n[2] https://wiki.openstreetmap.org/wiki/FR:Tag:amenity%3Dclinic \r\n[3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques \r\n[4] https://taginfo.openstreetmap.org",
			"KeywordList": ["features", "france_clinics_point"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_clinics_point",
					"Title": "france_clinics_point",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_clinics_point",
							"size": [73, 100]
						}
					]
				}
			],
			"MaxScaleDenominator": 70000000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_hospitals_point",
			"Title": "Localisations des hôpitaux - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["features", "france_hospitals_point"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_hospitals_point",
					"Title": "france_hospitals_point",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_hospitals_point",
							"size": [68, 100]
						}
					]
				}
			],
			"MaxScaleDenominator": 70000000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_pharmacies_point",
			"Title": "Localisations des pharmacies - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["features", "france_pharmacies_point"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_pharmacies_point",
					"Title": "france_pharmacies_point",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_pharmacies_point",
							"size": [91, 100]
						}
					]
				}
			],
			"MaxScaleDenominator": 70000000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_communes_polygon",
			"Title": "Emprises des communes - France métropolitaine",
			"Abstract": "Extrait quotidien des communes en France métropolitaine présentes dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nModèle de données Les attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    boundary ='administrative'\r\n    admin_level='8'\r\n    'ref:INSEE' is not null\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre aux limites administratives sur la page Wiki OSM - FR:Tag:boundary=administrative [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale [2] https://wiki.openstreetmap.org/wiki/FR:Key:boundary=administrative [3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques [4] https://taginfo.openstreetmap.org",
			"KeywordList": ["features", "communes_polygon"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "polygon",
					"Title": "A boring default style",
					"Abstract": "A sample style that just prints out a transparent red interior with a red outline",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_communes_polygon",
							"size": [20, 20]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_departements_polygon",
			"Title": "Emprises des départements - France métropolitaine",
			"Abstract": "Extrait quotidien des départements en France métropolitaine présentes dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nModèle de données Les attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    boundary ='administrative'\r\n    admin_level='6'\r\n    'ref:INSEE' is not null\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre aux limites administratives sur la page Wiki OSM - FR:Tag:boundary=administrative [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale [2] https://wiki.openstreetmap.org/wiki/FR:Key:boundary=administrative [3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques [4] https://taginfo.openstreetmap.org",
			"KeywordList": ["features", "france_departements_polygon"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_departements_polygon",
					"Title": "france_departements_polygon",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_departements_polygon",
							"size": [150, 40]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Name": "magosm:france_epcis_polygon",
			"Title": "Emprises des EPCI - France métropolitaine",
			"Abstract": "Extrait quotidien des EPCI en France métropolitaine présentes dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nModèle de données Les attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    boundary ='local_authority'\r\n    'ref:fr:SIREN' is not null\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre aux limites administratives sur la page Wiki OSM - FR:Tag:boundary=administrative [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale [2] https://wiki.openstreetmap.org/wiki/FR:Key:boundary=administrative [3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques [4] https://taginfo.openstreetmap.org",
			"KeywordList": ["features", "france_epcis_polygon"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "polygon",
					"Title": "A boring default style",
					"Abstract": "A sample style that just prints out a transparent red interior with a red outline",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_epcis_polygon",
							"size": [20, 20]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Name": "magosm:france_regions_polygon",
			"Title": "Emprises des régions - France métropolitaine",
			"Abstract": "Extrait quotidien des régions en France métropolitaine présentes dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nModèle de données Les attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    boundary ='administrative'\r\n    admin_level='4'\r\n    'ref:INSEE' is not null\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données propre aux limites administratives sur la page Wiki OSM - FR:Tag:boundary=administrative [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale [2] https://wiki.openstreetmap.org/wiki/FR:Key:boundary=administrative [3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques [4] https://taginfo.openstreetmap.org",
			"KeywordList": ["features", "france_regions_polygon"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "polygon",
					"Title": "A boring default style",
					"Abstract": "A sample style that just prints out a transparent red interior with a red outline",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_regions_polygon",
							"size": [20, 20]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_telecom_copper_connection_point",
			"Title": "Localisations des Sous-Répartiteurs Cuivre (SR) - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["features", "france_telecom_copper_connection_point"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_telecom_copper_connection_point",
					"Title": "france_telecom_copper_connection_point",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_telecom_copper_connection_point",
							"size": [169, 20]
						}
					]
				}
			],
			"MaxScaleDenominator": 70000000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_telecom_exchange_point",
			"Title": "Localisations des noeuds de raccordement abonnés (NRA) et optiques (NRO) - France métropolitaine",
			"Abstract": "",
			"KeywordList": ["features", "france_telecom_exchange_point"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_telecom_exchange_point",
					"Title": "france_telecom_exchange_point",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_telecom_exchange_point",
							"size": [178, 20]
						}
					]
				}
			],
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		},
		{
			"visible": false,
			"Attribution": {
				"Title": "© Magellium",
				"OnlineResource": "https://magosm.magellium.com/informations.html"
			},
			"Name": "magosm:france_telecom_fibre_connection_point",
			"Title": "Localisations des Points de Mutualisation Fibre (PMZ) - France métropolitaine",
			"Abstract": "Extrait quotidien des Points de Mutualisation Fibre (PMZ) en France métropolitaine présentes dans la base de données ouverte et collaborative OpenStreetMap (OSM) [1].\r\n\r\nModèle de données\r\n\r\nLes attributs OSM utilisés pour filtrer la donnée sont :\r\n\r\n    telecom ='connection_point'\r\n    telecom:medium='fibre'\r\n\r\nOn retrouve dans la couche tous les objets concernés qu’ils soient cartographiés sous forme de nœud, chemin ou relation dans OSM. Pour les polygones et multi-polygones, la géométrie fournie correspond au centroïd, la géométrie d’origine est disponible au format EWKT via l’attribut ‘osm_original_geom’ et le type d’origine dans une colonne ‘osm_type’.\r\n\r\nDes attributs OSM supplémentaires ont été sélectionnés pour enrichir les tags principaux. Tous les attributs préfixés par \"osm\" (ex : osm_user, osm_id ...) sont des propriétés communes assimilables à des méta-données sur l'objet OSM.\r\n\r\nPlus d'informations sur :\r\n\r\n    le modèle de données des \"connection points\" sur la page Wiki OSM - FR:Tag:telecom=connection_point [2].\r\n    le modèle de données OSM général est documenté sur la page Wiki OSM - Eléments cartographiques [3].\r\n    les modes et fréquences d'usage et de combinaison des différents attributs au sein de la communauté OSM sur le service TagInfo [4]\r\n\r\n[1] https://wiki.openstreetmap.org/wiki/FR:Page_principale\r\n[2] https://wiki.openstreetmap.org/wiki/FR:Tag:telecom=connection_point\r\n[3] https://wiki.openstreetmap.org/wiki/FR:%C3%89l%C3%A9ments_cartographiques\r\n[4] https://taginfo.openstreetmap.org/tags/?key=telecom&value=connection_point#overview",
			"KeywordList": ["features", "france_telecom_fibre_connection_point"],
			"EX_GeographicBoundingBox": [
				-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962
			],
			"BoundingBox": [
				{
					"crs": "CRS:84",
					"extent": [-6.2882069888366505, 37.43560720274539, 14.373044545912343, 53.0918187695962],
					"res": [null, null]
				},
				{ "crs": "EPSG:3857", "extent": [-700000, 4500000, 1600000, 7000000], "res": [null, null] }
			],
			"Style": [
				{
					"Name": "france_telecom_fibre_connection_point",
					"Title": "france_telecom_fibre_connection_point",
					"LegendURL": [
						{
							"Format": "image/png",
							"OnlineResource": "https://magosm.magellium.com/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=magosm%3Afrance_telecom_fibre_connection_point",
							"size": [198, 20]
						}
					]
				}
			],
			"MaxScaleDenominator": 20000000,
			"queryable": true,
			"opaque": false,
			"noSubsets": false
		}
	],
	"getFeatureInfoUrl": "https://magosm.magellium.com/geoserver/ows?SERVICE=WMS&",
	"wmsUrl": "https://magosm.magellium.com/geoserver/ows?SERVICE=WMS&",
	"visible": true,
	"open": false,
	"name": "magOSM WMS Service"
}
;

export default _default;
