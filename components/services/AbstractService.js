import React from 'react';

export default class Abstract extends React.Component {
    static propTypes = {
        device: React.PropTypes.object,
        service: React.PropTypes.object,
    };

    buildUrl(uri) {
        let base_url = 'http://' + this.props.device.address;

        if(!uri.startsWith('/')) {
            base_url += '/';
        }

        return base_url + uri;
    }

    async getFromDevice(uri) {
        let url = this.buildUrl(uri);
        let response = await fetch(url);
        return await response.json();
    }

    async postToDevice(uri, data = {}) {
        let url = this.buildUrl(uri);
        let response = await fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

        if(response.text().length) {
            return await response.json();
        } else {
            return {};
        }
    }
}