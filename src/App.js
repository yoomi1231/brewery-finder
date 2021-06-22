import React, { useState } from 'react';
import useAxios from 'axios-hooks';
import styled from '@emotion/styled';
import SearchBox from './SearchBox';
import BreweryMap from './BreweryMap';
import ListView from './ListView';

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #d3dade;
`; 

const MapContainer = styled.div`
    text-align: center;
    height: 100%;
`;

const SubContainer = styled.div`
    align-items: center;
    text-align: center;
    margin-top: ${props =>
        props.active ? '20%' : '' };
`;

const ButtonContainer = styled.div`
    padding-top: 5px;
    text-align: center;
`;

const ListContainer = styled.div`
    margin: auto;
    margin-top: 10px;
`;

const Title = styled.h1`    
    font-size: 2em;
    font-family: 'PT Sans Caption', sans-serif;
`;

const SearchContainer = styled.div`
    width: 100vw;
    text-align: center;
`;

const App = () => {
    const [value, setValue] = useState("");
    const [viewList, setViewList] = useState(false);

    const onToggleClick = () => {
        setViewList(!viewList);
    };    

    const [{ data, loading, error }] = useAxios({
        url: `https://api.openbrewerydb.org/breweries?by_city=${value}&by_type=micro&per_page=50`
    });

    if (loading) return <div>loading...</div>
    if (error) return <div>error</div>

    const filteredData = data.filter(item => item.latitude && item.longitude )


    const handleSubmit = (searchTerm) => {
        setValue(searchTerm);
    };

    const active = !value  ? 'active' : '';

    return (
        
        <div>
            <Container > 
                <SubContainer active={active} >
                    <Title>Craft Brewery Finder</Title>
                    <SearchContainer>
                        <SearchBox handleSubmit={handleSubmit} />
                    </SearchContainer>
                </SubContainer>
                {
                    value &&
                        <div>
                            <ButtonContainer><button onClick={onToggleClick}>Toggle View</button></ButtonContainer>
                            <ListContainer>
                            {
                                viewList &&
                                    <ListView filteredData={filteredData} /> 
                            }
                            </ListContainer>
                            <MapContainer>
                            {
                                data.length === 0 ?
                                    <div>No brewery found in {value}</div> :
                                    <div>
                                        {
                                            !viewList &&
                                                <BreweryMap searchTerm={value} data={data} filteredData={filteredData} />
                                        }
                                    </div>
                            }
                            </MapContainer>
                        </div>
                }
            </Container>    
        </div>
    );
};

export default App;