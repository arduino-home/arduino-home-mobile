import React from 'react';
import { Alert, View, ListView, Text, ActivityIndicator } from 'react-native';
import Styles from './Styles';
import DeviceProvider from './DeviceProvider';
import ServiceListItem from './ServiceListItem';

// Loading all services
import RGBService from './services/RGBService';

export default class ServiceList extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.device.name,
        };
    };

    static SUPPORTED_SERVICES = [ 'RGBService' ];

    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount() {
        this.loadServices();
    }

    loadServices() {
        DeviceProvider.fetchDeviceServices(this.props.navigation.state.params.device.address).then((services) => {
            if(services) {
                let supported_services = services.filter((value) => { return ServiceList.SUPPORTED_SERVICES.indexOf(value.name) > -1; });
                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({
                    loading: false,
                    dataSource: ds.cloneWithRows(supported_services),
                });
            } else {
                Alert.alert(
                    'Error while loading services',
                    'Unable to load services for device ' + this.props.navigation.state.params.device.name + ': device is not compatible',
                    [
                        { text: 'Go back to devices list', onPress: () => this.props.navigation.goBack() },
                    ],
                    { cancelable: false }
                );
            }
        }).catch((e) => {
            Alert.alert(
                'Error while loading services',
                'Unable to load services for device ' + this.props.navigation.state.params.device.name + ': ' + e.message,
                [
                    { text: 'Go back to devices list', onPress: () => this.props.navigation.goBack() },
                ],
                { cancelable: false }
            );
        });
    }

    gotoService(device, service) {
        let component = null;

        switch(service.name) {
            case 'RGBService': component = RGBService; break;
        }

        if(component) {
            this.props.navigation.navigate('ServiceView', { component: RGBService, device: device, service: service });
        } else {
            Alert.alert(
                'Not implemented',
                'Service "' + service.name + '" is not yet implemented!',
            );
        }
    }

    render() {
        if(this.state.loading) {
            return(
                <View style={{ flex: 1, padding: 20}}>
                    <ActivityIndicator color={Styles.color} />
                </View>
            );
        }
        return(
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(row) => <ServiceListItem service={row} device={this.props.navigation.state.params.device} gotoFunction={this.gotoService.bind(this)} />}
                />
            </View>
        );
    }
}