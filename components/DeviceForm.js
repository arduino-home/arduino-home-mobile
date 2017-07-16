import React from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import { Form, Section, TextInputCell, ButtonCell } from 'react-native-forms';
import DeviceProvider from './DeviceProvider';

export default class DeviceForm extends React.Component {
    static navigationOptions = ({navigation}) => {
        let opts = {};

        if(navigation.state.params.device_index < 0) {
            opts.title = "Add device";
        } else {
            opts.title = "Edit device";
        }

        return opts;
    };

    constructor(props) {
        super(props);
        this.state = {
            device_index: props.navigation.state.params.device_index,
            device: null,
        };

        if(this.state.device_index < 0) {
            this.state.device = { name: '', address: '' };
        } else {
            DeviceProvider.fetchDevice(this.state.device_index).then((device) => {
                this.setState({ device: device });
            });
        }
    }

    handleChange(ref, value) {
        let device = this.state.device;
        switch(ref) {
            case 'device_name': device.name = value; break;
            case 'device_address': device.address = value; break;
        }
        this.setState({ device: device });
    }

    handlePress(ref) {
        switch(ref) {
            case 'submit': this.saveDevice(); break;
            case 'test': this.testDevice(); break;
        }
    }

    testDevice() {
        DeviceProvider.fetchDeviceServices(this.state.device.address).then((services) => {
            if(services) {
                Alert.alert('Test result', 'Test succeed!');
            } else {
                Alert.alert('Test result', 'Available but not compatible device!');
            }
        }).catch((e) => {
            Alert.alert('Test result', 'Unreachable device (' + e.message + ')!');
        });
    }

    saveDevice() {
        DeviceProvider.saveDevice(this.state.device, this.state.device_index).then(() => {
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
        });
    }

    render() {
        if(null === this.state.device) {
            return(
                <View style={{ flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        return(
            <Form onPress={this.handlePress.bind(this)} onChange={this.handleChange.bind(this)}>
                <Section ref={"main"} title="Device informations">
                    <TextInputCell ref={"device_name"} inputProps={{placeholder: "Device name"}} value={this.state.device.name} />
                    <TextInputCell ref={"device_address"} inputProps={{placeholder: "Device IP address or DNS name"}} value={this.state.device.address} />
                </Section>
                <Section title="">
                    <ButtonCell ref={"test"} title="Test" />
                    <ButtonCell ref={"submit"} title="Save" />
                </Section>
            </Form>
        );
    }
}