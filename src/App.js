import React, { useState } from 'react';
import styled from '@emotion/styled';
import SearchBox from './SearchBox';
import BreweryMap from './BreweryMap';
import beerImage from './bee.jpeg';

const Container = styled.div`
    height: 100vh;
    background-image: url(${beerImage});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`; 

const SubContainer = styled.div`
    height: 180px;
    align-items: center;
    text-align: center;
`;

const Title = styled.h1`    
    font-size: 2em;
    font-family: 'Caveat', cursive;
`;

const SearchContainer = styled.div`
    width: 100vw;
    height: 100px;
    text-align: center;
`;

const App = () => {
    const [value, setValue] = useState("");

    const handleSubmit = (searchTerm) => {
        setValue(searchTerm);
    };

    return (
        <div>
            <Container > 
                <SubContainer>
                    <Title>Craft Brewery Finder</Title>
                    <SearchContainer>
                        <SearchBox handleSubmit={handleSubmit} />
                    </SearchContainer>
                </SubContainer>
                {
                    value &&
                        (
                            <BreweryMap searchTerm={value} />
                        )
                }
            </Container>
        </div>
    );
};

export default App;