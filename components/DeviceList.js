import React from 'react';
import { Alert, View, ListView, Button, ActivityIndicator } from 'react-native';
import Styles from './Styles';
import DeviceProvider from './DeviceProvider';
import DeviceListItem from './DeviceListItem';

export default class DeviceList extends React.Component {
    static navigationOptions = {
        title: 'Devices',
    };

    constructor(props) {
        super(props);
        this.datasource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = { devices: null };
    }

    componentDidMount() {
        this.loadDevices();
    }

    loadDevices() {
        DeviceProvider.fetchDevices().then((devices) => {
            this.setState({ devices: this.datasource.cloneWithRows(devices) });
        });
    }

    openDevice(index) {
        DeviceProvider.fetchDevice(index).then((device) => {
            this.props.navigation.navigate('DeviceHome', { device: device });
        });
    }

    createDevice() {
        this.props.navigation.navigate('EditDevice', { onGoBack: () => this.loadDevices(), device_index: -1 });
    }

    editDevice(index) {
        this.props.navigation.navigate('EditDevice', { onGoBack: () => this.loadDevices(), device_index: index });
    }

    deleteDevice(index) {
        Alert.alert(
            'Delete a device',
            'Are you sure to delete this device?',
            [
                { text: 'Yes, delete it!', onPress: () => {
                    DeviceProvider.deleteDevice(index).then(() => {
                        this.loadDevices();
                    });
                }},
                { text: 'No!', style: 'cancel' },
                { cancelable: false },
            ]
        );

    }

    renderListFooter() {
        return(
            <View style={{ padding: 20 }}>
                <Button color={Styles.color} onPress={this.createDevice.bind(this)} title="Add a device"/>
            </View>
        );
    }

    render() {
        if(null === this.state.devices) {
            return(
                <View style={{ flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        return(
            <View>
                <ListView
                    dataSource={this.state.devices}
                    renderRow={(row, j, k) => <DeviceListItem openFunction={this.openDevice.bind(this)} editFunction={this.editDevice.bind(this)} deleteFunction={this.deleteDevice.bind(this)} device={row} index={parseInt(k)} />}
                    renderFooter={this.renderListFooter.bind(this)}
                />
            </View>

        );
    }
}