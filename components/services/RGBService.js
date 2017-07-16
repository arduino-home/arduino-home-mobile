import React from 'react';
import AbstractService from './AbstractService';
import { View, StyleSheet, Button } from 'react-native';
import { ColorPicker, toHsv } from 'react-native-color-picker';
import tinycolor from 'tinycolor2';

export default class RGBService extends AbstractService {
    constructor(props) {
        super(props);
        this.state = {
            color: toHsv('white'),
            power_state: false,
            button_properties: button_properties[false],
        };
    }

    componentDidMount() {
        this.fetchDeviceState().then(() => {
            console.log('componentDidMount', 'State fetched from device');
        }).catch((e) => {
            console.error('componentDidMount', e);
        });
    }

    async fetchDeviceState() {
        let device_state = await this.getFromDevice(this.props.service.id);

        this.setState({
            power_state: device_state.state !== 0,
            button_properties: button_properties[device_state.state !== 0],
            color: toHsv('rgb ' + device_state.r.toString() + ' ' + device_state.g.toString() + ' ' + device_state.b.toString()),
        });

        console.log('getting state of device', device_state);
    }

    async sendStateToDevice() {
        let rgb = tinycolor(this.state.color).toRgb();
        let data = { r: rgb.r, g: rgb.g, b: rgb.b, state: this.state.power_state ? 1 : 0 };
        console.log('send new state to device', data);
        return await this.postToDevice(this.props.service.id, data);
    }

    onColorChange(color) {
        this.setState({ color: color });
    }

    onColorSelected() {
        this.sendStateToDevice()
            .then(() => console.log('new state sent to device'))
            .catch((e) => console.error('Error while sending new state to device', e));
    }

    switchPowerState() {
        this.setState({
            power_state: !this.state.power_state,
            button_properties: button_properties[!this.state.power_state],
        }, () => {
            this.sendStateToDevice()
                .then(() => console.log('new state sent to device'))
                .catch((e) => console.error('Error while sending new state to device', e));
        });
    }

    render() {
        return(
            <View style={style.container}>
                <Button
                    style={style.power_button}
                    onPress={this.switchPowerState.bind(this)}
                    title={this.state.button_properties.text}
                    color={this.state.button_properties.color}
                />
                <ColorPicker
                    style={style.color_picker}
                    color={this.state.color}
                    onColorChange={this.onColorChange.bind(this)}
                    onColorSelected={this.onColorSelected.bind(this)}
                />
            </View>
        );
    }
}

const button_properties = {
    false: {
        text: 'Power ON',
        color: '#009933',
    },
    true: {
        text: 'Power OFF',
        color: '#cc0000',
    },
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#212021',
    },
    color_picker: {
        flex: 1,
    },
    power_button: {
        flex: 1,
    },
});