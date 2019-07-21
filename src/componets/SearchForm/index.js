import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SearchIcon from '../../assets/search.svg';
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
mask-image: url(${SearchIcon});
mask-position: center;
mask-size: contain;
mask-repeat: no-repeat;
cursor: pointer;

&:hover {
    background-color: rgba(0,77,188,1);
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
