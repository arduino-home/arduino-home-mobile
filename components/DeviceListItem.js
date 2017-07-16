import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Styles from './Styles';

export default class DeviceListItem extends React.Component {
    static propTypes = {
        openFunction: React.PropTypes.func,
        editFunction: React.PropTypes.func,
        deleteFunction: React.PropTypes.func,
        device: React.PropTypes.object,
        index: React.PropTypes.number,
    };

    openDevice() {
        this.props.openFunction(this.props.index);
    }

    editDevice() {
        this.props.editFunction(this.props.index);
    }

    deleteDevice() {
        this.props.deleteFunction(this.props.index);
    }

    render() {
        return(
            <TouchableHighlight onPress={this.openDevice.bind(this)}>
                <View style={[Styles.flex_row, style.view]}>
                    <View style={Styles.flex_row}>
                        <Text style={style.name}>{this.props.device.name}</Text>
                    </View>
                    <View style={style.buttons}>
                        <TouchableHighlight onPress={this.editDevice.bind(this)}>
                            <Image style={style.button} source={require('./icons/edit.png')} />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.deleteDevice.bind(this)}>
                            <Image style={style.button} source={require('./icons/delete.png')} />
                        </TouchableHighlight>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const style = StyleSheet.create({
    view: {
        backgroundColor: '#394163',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#202340',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    name: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 25,
    },
    buttons: {
        flex: 0,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    button: {
        marginLeft: 10,
        width: 25,
        height: 25,
    }
});