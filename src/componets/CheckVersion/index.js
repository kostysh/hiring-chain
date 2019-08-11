import React, { Component } from 'react';

import { getVersion } from '../../services/version';
import { ErrorSection, VersionSection } from '../Layout';

export default class CheckVersion extends Component {

    state = {
        version: null,
        error: null
    };

    componentDidMount = async () => {
        try {
            const hostname = window.location.hostname;

            if (hostname === 'arweave.net') {

                const pathname = window.location.pathname;
                const version = await getVersion();

                if (version && !pathname.match(new RegExp(version, 'g'))) {
                    this.setState({
                        version
                    });
                }
            }            

        } catch(error) {
            this.setState({
                error
            });
        }
    };

    render() {
        const { error, version } = this.state;
        const link = `https://arweave.net/${version}`;

        if (!error && !version) {
            return null;
        }

        if (error) {
            return (
                <ErrorSection>
                    <strong>{error}</strong><br/>
                    <span>You can try to reload the application and try again.</span>
                </ErrorSection>
            );
        }

        return (
            <VersionSection>
                <strong>New version of this application is available.</strong><br/> 
                Please follow the link:&nbsp;
                <a href={link}>
                    {link}
                </a>
            </VersionSection>
        );
    }
}
