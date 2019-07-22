import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import styled from 'styled-components';

import config from '../../config.json';
import { H1Section, H2Section, H3Section, ErrorSection } from '../../componets/Layout';
import Loader from '../../componets/Loader';
import RouteButton from '../../componets/RouteButton';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

const CvsTable = styled.table`
width: 100%;
border-collapse: collapse;

thead {
    background-color: #c1daff;

    th {
        padding: 10px 5px;
        color: #004dbc8a; 
        text-align: left;       
    }   
}

tbody {

    td {
        padding: 10px 5px;
    }
}
`;

const CloseCv = styled.div`
padding: 2px;
width: 16px;
height: 16px;
background-color: white;
border-radius: 50%;
font-size: 14px;
color: #004DBC;
text-align: center;
line-height: 12px;
margin-left: 5px;
cursor: pointer;
`;

const CvLink = styled.span`
color: #004DBC;
cursor: pointer;
`;

const TopContainer = styled.div`
display: flex;
align-items: center;
flex-direction: row;

.left {
    flex-grow: 1;
}

.right {
    flex-grow: 0;
}
`;

const IpfsLink = styled.a`
color: #004DBC;

@media (max-width: 540px) {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
}
`;

const AppliedList = styled.ul`
list-style-type: none;
margin: 0;
padding: 0;
`;

class Cvs extends Component {

    closeCv = id => this.props.cvsClose(id);

    render() {
        const { cvs, closing, routePush, error } = this.props;

        return (
            <Fragment>
                <H1Section>
                    <TopContainer>
                        <div className="left">
                            <h2>
                                Here is your posted CVs list. Pending postings are will be marked by a special indicator                            
                            </h2>
                        </div>
                        <div className="right">
                            <RouteButton 
                                background="#FBFFE1"
                                color="#3F3F3F"
                                size="large"
                                to="/cv"
                            >Post&nbsp;CV</RouteButton>
                        </div>
                    </TopContainer>                    
                </H1Section>
                {error &&
                    <ErrorSection>
                        <strong>{error}</strong><br/>
                        <span>You can try to reload the application and try again. If an error occurred during transaction submission it does not mean that it failed. It can be API failure. Please wait some time and reload the app. </span>

                    </ErrorSection>
                }
                <H2Section>
                    <CvsTable>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>File</th>
                                <th>Applications</th>
                                <th>Mined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cvs.map((cv, i) => (
                                <tr key={i}>
                                    <td>
                                        <CvLink
                                            onClick={() => routePush(`/cv/${cv.id}`)}
                                        >{cv.cv.title}</CvLink>
                                    </td>
                                    <td>
                                        <IpfsLink
                                            href={`${config.ipfs.gateway}/${cv.cv.ipfs}`}
                                            rel="noopener noreferrer" 
                                            target="_blank" 
                                            title="CV file on the public IPFS gateway"
                                        >{cv.cv.ipfs}</IpfsLink>
                                    </td>
                                    <td>
                                        {(cv.applied && cv.applied.length > 0) &&
                                            <AppliedList>
                                                {cv.applied.map((a, i) => (
                                                    <li key={i}>
                                                        <CvLink
                                                            onClick={() => routePush(`/job/${a}`)}
                                                        >&#10004;</CvLink>
                                                    </li>
                                                ))}
                                            </AppliedList>
                                        }
                                    </td>
                                    <td>
                                        {cv.mined ? 
                                            (<a
                                                href={`https://${config.arscan}/transaction/${cv.transaction.id}`}
                                                rel="noopener noreferrer" 
                                                target="_blank" 
                                                title="Arweave Block Explorer"
                                            >yes</a>) : 
                                            (<Loader width="16px" height="16px" />)}
                                    </td>
                                    <td>
                                        {(cv.mined && !closing.includes(cv.id)) &&
                                            <CloseCv 
                                                title="Close"
                                                onClick={() => this.closeCv(cv.id)}
                                            >x</CloseCv>
                                        }
                                        {(cv.mined && closing.includes(cv.id)) &&
                                            <Loader width="16px" height="16px" />
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </CvsTable>
                </H2Section>
                <H3Section>
                    
                </H3Section>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {

    return {
        cvs: selectors.cvs(state),
        closing: selectors.cvsClosing(state),
        error: selectors.cvsError(state)
    };
};

const mapDispatchToProps = dispatch => {

    return {
        cvsClose: id => dispatch(actions.cvsClose(id)),
        routePush: newRoute => dispatch(push(newRoute))
    };
};

const connectedCvs = connect(mapStateToProps, mapDispatchToProps)(Cvs);

export default connectedCvs;

export const route = [
    {
        path: '/cvs',
        exact: true,
        label: 'My CVs',
        component: connectedCvs
    }
];
