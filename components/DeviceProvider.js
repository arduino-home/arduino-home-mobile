import { AsyncStorage } from 'react-native';

export default class DeviceProvider {
    static DEVICES_KEY = 'devices';

    static async fetchDevices() {
        let devices = await AsyncStorage.getItem(DeviceProvider.DEVICES_KEY);

        if(!devices) {
            devices = [];
        } else {
            devices = JSON.parse(devices);
        }

        return devices;
    }

    static async fetchDevice(index) {
        let devices = await AsyncStorage.getItem(DeviceProvider.DEVICES_KEY);

        if(!devices) {
            devices = [];
        } else {
            devices = JSON.parse(devices);
        }

        return devices[index];
    }

    static async fetchDeviceServices(address) {
        const url = 'http://' + address + '/info';

        let response = await fetch(url);

        if(!response.ok) {
            return null;
        }

        let services = await response.json();

        return services;
    }

    static async saveDevice(device, index = -1) {
        let devices = await DeviceProvider.fetchDevices();

        if(index < 0) {
            devices.push(device);
        } else {
            devices[index] = device;
        }

        return DeviceProvider.saveDevices(devices);
    }

    static async saveDevices(devices) {
        return await AsyncStorage.setItem(DeviceProvider.DEVICES_KEY, JSON.stringify(devices));
    }

    static async deleteDevice(index) {
        let devices = await DeviceProvider.fetchDevices();
        devices.splice(index, 1);
        return await DeviceProvider.saveDevices(devices);
    }
}
