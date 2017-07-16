import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Styles from './Styles';

export default class ServiceListItem extends React.Component {
    static propTypes = {
        device: React.PropTypes.object,
        service: React.PropTypes.object,
        gotoFunction: React.PropTypes.func,
    };

    getImage() {
        switch(this.props.service.name) {
            case 'RGBService': return require('./icons/services/rgb.png');
        }
    }

    gotoService() {
        this.props.gotoFunction(this.props.device, this.props.service);
    }

    render() {
        return(
            <TouchableHighlight onPress={this.gotoService.bind(this)}>
                <View style={[Styles.flex_row, style.view]}>
                    <View style={Styles.flex_row}>
                        <Image style={style.svc_img} source={this.getImage()} />
                        <Text style={style.svc_id}>{this.props.service.id.toUpperCase()}</Text>
                    </View>
                    <View style={{ flex: 0, flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center' }}>
                        <Text style={style.svc_name}>{this.props.service.name}</Text>
                        <Text style={style.svc_vers}>{this.props.service.version}</Text>
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
    svc_id: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 5,
    },
    svc_img: {
    },
    svc_name: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 10,
    },
    svc_vers: {
        color: '#FFF',
        marginLeft: 5,
        fontSize: 10,
    },
});