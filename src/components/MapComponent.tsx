import '../styles/components/map.sass';

import {FullscreenControl, GeolocationControl, Map, Placemark, SearchControl, YMaps, ZoomControl} from "@pbe/react-yandex-maps";

import {useEffect, useState} from "react";
import {useAppSelector} from "../store";

function MapComponent({setUserAddress}: {setUserAddress: any}) {

    const state = useAppSelector(state => state);

    const [mapInstance, setMapInstance] = useState<any>();
    const [placemark, setPlacemark] = useState<any>();
    const [mapState, setMapState] = useState({
        center: [55.75, 37.57],
        zoom: 9
    })

    useEffect(() => {
        if (mapInstance && state.user[0].address) {
            mapInstance.geocode(state.user[0].address, { results: 1 }).then((res: { geoObjects: { get: (arg0: number) => { (): any; new(): any; geometry: { (): any; new(): any; getCoordinates: { (): any; new(): any; }; }; }; }; }) => {
                let coords = res.geoObjects.get(0).geometry.getCoordinates();
                setMapState({ center: coords, zoom: 16 })
            })
        }
    }, [mapInstance, state.user[0].address])

    const mapClick = (e: any) => {
        let coords = e.get('coords');
        setMapState({ zoom: 17, center: coords })
        getAddress(coords)
    }

    const getAddress = (coords: any) => {
        placemark.properties.set('iconCaption', 'поиск...');

        mapInstance.geocode(coords).then(function (res: { geoObjects: { get: (arg0: number) => any; }; }) {

            let geoObject = res.geoObjects.get(0);

            setUserAddress(geoObject.getAddressLine())

            placemark.properties.set({
                iconCaption: [
                    geoObject.getLocalities().length ? geoObject.getLocalities() : geoObject.getAdministrativeAreas(),
                    geoObject.getThoroughfare() || geoObject.getPremise()
                ].filter(Boolean).join(', '),
                balloonContent: geoObject.getAddressLine()
            });
        });
    }

    return (
        <YMaps query={{ apikey: '5f4951d5-9bcf-4ea4-ae8b-b561e80e3ca1', load: "package.full", }}>
            <Map
                state={{ center: mapState.center, zoom: mapState.zoom, controls: [] }}
                className="map"
                onLoad={ymaps => setMapInstance(ymaps)}
                onClick={(e: any) => mapClick(e)}
            >
                <Placemark geometry={mapState.center} instanceRef={(instance) => setPlacemark(instance)}/>
                <FullscreenControl />
                <SearchControl options={{ float: "right" }} />
                <GeolocationControl options={{ float: "left" }} />
                <ZoomControl />
            </Map>
        </YMaps>
    )
}

export default MapComponent