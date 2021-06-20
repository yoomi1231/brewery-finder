import React from 'react';
import styled from '@emotion/styled';

const ResultList = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 1.3em;
    width: 100vw;
`;

const ItemName = styled.a`
    padding-left: 10px;
    text-decoration: none;
    color: navy;
`;

const Address = styled.span`
    padding-left: 10px;
`;

const Phone = styled.span`
    color: grey;
    font-size: 1em;
    padding-left: 10px;
`;

const ListView = ({ filteredData }) => {
    const ListContainer = () => {
        return filteredData.map((item, index) => {
           
            return (
                <ResultList 
                    id={`${item.name}-${item.latitude}-${item.longitude}`}
                    key={`${item.name}-${item.latitude}-${item.longitude}`}
                >
                    <span>{`${index + 1}.`} </span>
                    <ItemName href={`${item.website_url}`}>{item.name}</ItemName> 
                    <Address>{item.street}</Address>
                    <Phone>{`ph. ${item.phone}`} </Phone> 
                </ResultList>
            );
        });
    };

    return (
        <div>
            {ListContainer()}
        </div>
    );
};

export default ListView;