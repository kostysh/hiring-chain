import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Loader from '../Loader';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

const SearchFormOuter = styled.div`
display: flex;
flex-direction: row;
align-items: center;
flex-grow: 1;

@media (max-width: 540px) {
    flex-wrap: wrap;
}
`;

const Input = styled.input`
width: 100%;
font-size: 18px;
font-weight: normal;
color: #2a2a2a;
padding: 14px 1.5em;
border: 1px solid rgba(0,0,0,0.2);
border-radius: 5px;
outline: none;
margin-right: 10px;

&:focus {
    border: 1px solid rgba(0,77,188,1);
}

&::placeholder {
    color: rgba(0,0,0,0.3);
}

@media (max-width: 540px) {
    padding: 10px 1em;
    margin: 0 0 10px 0;
}
`;

const Submit = styled.div`
flex-shrink: 0;
width: 35px;
height: 35px;
background-color: white;
mask-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 451 451' style='enable-background:new 0 0 451 451;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3 s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4 C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3 s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z'/%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
mask-position: center;
mask-size: contain;
mask-repeat: no-repeat;
cursor: pointer;

&:hover {
    background-color: rgba(0,77,188,1);
}

@media (max-width: 540px) {
    display: none;
}
`;

const Loading = styled(Loader)`
flex-shrink: 0;
width: 35px;
height: 35px;
`;

class SearchForm extends Component {

    updateQuery = (name, value) => this.props.jobsUpdateQuery({
        ...this.props.query,
        [name]: value
    });

    componentDidMount = () => {
        const { jobsCache } = this.props;

        if (jobsCache.length === 0) {
            setTimeout(() => this.props.jobsFetchCache(), 1000)
        }        
    };
    
    render() {
        const { jobsCacheLoading, query } = this.props;

        return (
            <SearchFormOuter>
                <Input 
                    value={query.tag}
                    onChange={({ target: { value } }) => this.updateQuery('tag', value)}
                    disabled={jobsCacheLoading}
                    placeholder="e.g Solidity, Design"                     
                />
                <Input 
                    value={query.location}
                    onChange={({ target: { value } }) => this.updateQuery('location', value)}
                    disabled={jobsCacheLoading}
                    placeholder="e.g London, Berlin or Remote"
                />
                {jobsCacheLoading && 
                    <Loading />
                }
                {!jobsCacheLoading &&
                    <Submit 
                        onClick={() => {}}
                    />
                }            
            </SearchFormOuter>
        );
    }    
};

function mapStateToProps(state) {

    return {
        jobsCacheLoading: selectors.jobsCacheLoading(state),
        jobsCache: selectors.jobsCache(state),
        query: selectors.jobsQuery(state)
    };
};

const mapDispatchToProps = dispatch => {

    return {
        jobsFetchCache: () => dispatch(actions.jobsFetchCache()),
        jobsUpdateQuery: query => dispatch(actions.jobsUpdateQuery(query))
    };
};

const connectedSearchForm = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default connectedSearchForm;
