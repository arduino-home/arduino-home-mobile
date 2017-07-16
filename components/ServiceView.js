import React from 'react';
import { View } from 'react-native';

export default class ServiceView extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title:  navigation.state.params.service.id.toUpperCase() + ' on ' + navigation.state.params.device.name,
        };
    };

    render() {
        let device = this.props.navigation.state.params.device;
        let service = this.props.navigation.state.params.service;
        let Component = this.props.navigation.state.params.component;

        console.log('render view of service', service.name, 'on device', device.name);
        console.log('component', Component);

        return(<Component device={device} service={service} />);
    }
}