import React, { useState } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import styled from '@emotion/styled';

const Container = styled.div`
    height: 100vh;
`;

const MapWrapper = styled.div`
    text-align: center;
    font-size: 1.5em;
    font-family: 'Ubuntu', sans-serif;
    padding-left: 10%;
    padding-top: 10px;
`;  

const GoogleMap = styled(Map)`
    
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
`;

const BreweryMap = ({ google, searchTerm, data, filteredData }) => {
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});


    const onMarkerClick = (props, marker) => {
        setActiveMarker(marker);
        setSelectedPlace(props);
        setShowInfoWindow(true);
    };

    const onInfoWindowClose = () => {
        setShowInfoWindow(false);
        setActiveMarker(null);
        setSelectedPlace({});
    };

    const onMapClicked = () => {
        setShowInfoWindow(false);
        setActiveMarker(null);
        setSelectedPlace({});
    };

    const renderMarker = () => {
        return filteredData.map(item => {
            return (
                <Marker
                    id={`${item.name}-${item.latitude}-${item.longitude}`}
                    key={`${item.name}-${item.latitude}-${item.longitude}`}
                    onClick={onMarkerClick} 
                    name={item.name} 
                    position={{ lat: item.latitude, lng: item.longitude }} 
                    url={item.website_url} 
                    phone={item.phone}
                    address={item.street}
                />   
            );
        });
    };
    
    const MapContainer = () => {
        return (
            <div>
                <GoogleMap
                    google={google}
                    style={{width: "80%", height: "75%"}}
                    zoom={12}
                    initialCenter={{ lat: filteredData[0].latitude, lng: filteredData[0].longitude }}
                    onClick={onMapClicked}
                >
                    {renderMarker()}
                    <InfoWindow
                        visible={showInfoWindow}
                        onClose={onInfoWindowClose}
                        marker={activeMarker}
                    >   
                        <InfoWrapper>
                            <span>{selectedPlace.name}</span>
                            <span>(Ph. {selectedPlace.phone})</span>
                            <a href={`${selectedPlace.url}`}>{selectedPlace.url}</a> 
                            <span>{selectedPlace.address}</span>
                        </InfoWrapper>
                    </InfoWindow>
                </GoogleMap>
            </div>
        );
    };

    return (
        <Container>
            <MapWrapper>
                {MapContainer()}
            </MapWrapper>
            
        </Container>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCWuyNhUxB7Yw0_kCWNS-NP8tjXqPz5pJ8'
})(BreweryMap);