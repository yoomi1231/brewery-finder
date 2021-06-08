import React, { useState } from 'react';
import styled from '@emotion/styled';

const UserInput = styled.input`
    height: 30px;
    width: 700px;
    font-size: 1.2em;
    border: 3px solid black;
    font-family: 'Lato', sans-serif;
`;

const SearchBox = ({ handleSubmit }) => {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(value);
    };

    return (
        <form onSubmit={onSubmit}>
            <UserInput type="text" placeholder="Search craft breweries in your city" value={value} onChange={handleChange} onSubmit={onSubmit} />
        </form>
    );
};

export default SearchBox;