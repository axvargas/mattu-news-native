import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from 'react-native'
import urlParse from 'url-parse'
import moment from 'moment'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

const New = ({ data }) => {
    const { title, url, created_at } = data

    const openZelda = async () => {
        try {
            if (await InAppBrowser.isAvailable()) {
                const result = await InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: '#000000',
                    preferredControlTintColor: 'white',
                    readerMode: false,
                    animated: true,
                    modalPresentationStyle: 'fullScreen',
                    modalTransitionStyle: 'coverVertical',
                    modalEnabled: true,
                    enableBarCollapsing: false,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: '#000000',
                    secondaryToolbarColor: 'white',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right'
                    },
                    headers: {
                        'my-custom-header': 'my custom header value'
                    }
                })
            }
            else Linking.openURL(url)
        } catch (error) {
            Alert.alert(error.message)
        }
    }
    return (
        <TouchableOpacity
            onPress={() => openZelda()}
        >
            <View style={styles.container}>
                <Text style={styles.url}>{urlParse(url).host}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.createdAt}>{moment(created_at).startOf().fromNow()}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default New

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    url: {
        paddingBottom: 5,
        color: 'grey'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    createdAt: {
        paddingTop: 5,
        color: 'grey'
    }
})
