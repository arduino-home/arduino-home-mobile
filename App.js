import React from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Styles from './components/Styles';
import DeviceList from './components/DeviceList';
import DeviceForm from './components/DeviceForm';
import ServiceList from './components/ServiceList';
import ServiceView from './components/ServiceView';

const MainNavigationOptions = {
    headerStyle: Styles.nav_header,
    headerTitleStyle: Styles.nav_header_title,
};

const MainNavigation = StackNavigator({
    Home: {
        screen: DeviceList,
        navigationOptions: MainNavigationOptions,
    },
    EditDevice: {
        screen: DeviceForm,
        navigationOptions: MainNavigationOptions,
    },
    DeviceHome: {
        screen: ServiceList,
        navigationOptions: MainNavigationOptions,
    },
    ServiceView: {
        screen: ServiceView,
        navigationOptions: MainNavigationOptions,
    },
});

export default class App extends React.Component {
    render() {
        return(
            <View style={Styles.main}>
                <StatusBar hidden={true}/>
                <MainNavigation/>
            </View>
        );
    }
}
