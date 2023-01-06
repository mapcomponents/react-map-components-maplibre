import { layerRemovalTest, sourceRemovalTest } from '../../util';

import MlGpxViewer from './MlGpxViewer';
import { uuid_regex } from "../../setupTests";

const gpxSample = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<gpx version="1.1" creator="outdooractive - http://www.outdooractive.com" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" xmlns:oa="http://www.outdooractive.com/GPX/Extensions/1">
  <metadata>
    <name>Traumpfad Bergheidenweg</name>
    <author>
      <name>Nicole Pfeifer - Rhein-Mosel-Eifel-Touristik</name>
    </author>
    <link href="https://www.outdooractive.com/r/1386783"/>
    <time>2021-04-08T13:53:11.658</time>
    <extensions>
      <oa:oaCategory>hikingTourTrail</oa:oaCategory>
    </extensions>
  </metadata>
  <wpt lon="7.07093" lat="50.369418">
    <ele>423</ele>
    <name>HausAcht - Tagungs- und Freizeithaus</name>
    <desc><![CDATA[Beschreibung HausAcht incl. KleinHausAcht (beide Einheiten) / Das HausAcht (gemütliche Pension aus den 60er Jahren) steht seit fast 20 Jahren als modernes Tagungs- und Freizeithaus zur Verfügung. Im Jahr 2016 wurde das KleinHausAcht als barrierefreier Anbau ergänzt. Als Gruppenhaus können bis zu 35 Gäste das Haus in vielfältiger Weise nutzten. / Unter dem Motto „Ein ganzes Haus zum Leben“ steht das Haus für Kinder- und Jugendgruppen, "Großfamilien“ und Arbeitskreise, Wandergruppen, Motorradgruppen und Betriebsausflüge zur Verfügung. / Das HausAcht wird jeweils nur an eine Gruppe vermietet, die alle Räume in Eigenregie nutzen kann. Die große Küche (wahlweise zur Selbstversorgung) 4 Aufenthaltsräume (incl. urigem Schankraum) bieten viel Gestaltungsfreiraum. 11 Schlafzimmer (fast alle mit Dusche und WC) für 31 Gäste bieten eine angenehme Privatsphäre.  / Im Gruppenhaus können bis zu 31 Personen unterkommen. Ab 32 Personen wird das KleinHausAcht (Anbau) automatisch zugemietet. Auf Wunsch kann auch eine Aufteilung einer kleineren Gruppe in Gruppenhaus und KleinHausAcht (Anbau) erfolgen. Dies können Sie mit Ihrem Gastgeber besprechen. / Integrativ kann das barrierearme KleinHausAcht angemietet werden. Dieser Anbau auf der Ebene der Aufenthaltsräume des HausAcht bietet 2 weitere Schlafzimmer für 4 Gäste, ein Entree mit Kochdiele und ein großes Bad mit barrierefreier Ausstattung. Bis zu 3 Rollstuhlfahrer*innen kommen hier zurecht. / Weitere Details unter den Beschreibungen „HausAcht – Gruppenhaus“ und „KleinHausAcht – Anbau / FeWo“ / Weiterhin verfügt das Haus über eine Waschküche, ausreichend Lagerkeller sowie 10 PKW-Stellplätze, die auch Platz für einen Reisebus bieten. / Diverse Sonnenterassen sowie 2 kleine Wiese runden die Umgebung ab. Grillmöglichkeiten, eine Tischtennisplatte, je ein Fernseher und ein kostenfreier Zugang über WLAN ins Internet sind vorhanden. / Für die Gäste im HausAcht – Gruppenhaus steht auf Wunsch Beckmanns Koch-Service für eine individuelle Teil- oder Vollverpflegung zur Verfügung.]]></desc>
    <src>feratel-eifel.21430.e4c23207-9b3e-47bc-a359-730147d57644</src>
    <link href="https://www.HausAcht.de"/>
    <type>Ferienwohnung</type>
  </wpt>
	</gpx>`;

// eslint-disable-next-line react/react-in-jsx-scope
const testComponent = <MlGpxViewer gpxData={gpxSample} />;

let sourceTestParams = [
	'<MlGpxViewer />',
	testComponent,
	new RegExp('^.*"gpx-viewer-source-' + uuid_regex + '".*$'),
	'gpx-viewer-source',
];
let layer1TestParams = [
	'<MlGpxViewer />',
	testComponent,
	new RegExp('^.*"importer-layer-lines-' + uuid_regex + '".*$'),
	'importer-layer-lines',
];
let layer2TestParams = [
	'<MlGpxViewer />',
	testComponent,
	new RegExp('^.*"importer-layer-points-' + uuid_regex + '".*$'),
	'importer-layer-points',
];

layerRemovalTest(...layer1TestParams);
layerRemovalTest(...layer2TestParams);
sourceRemovalTest(...sourceTestParams);
