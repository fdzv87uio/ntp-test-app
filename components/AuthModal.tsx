import { Alert, Modal, Pressable, Text, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthModal({ authModalVisible, setAuthModalVisible }: { authModalVisible: any, setAuthModalVisible: any }) {

    async function handleLogout() {
        await AsyncStorage.removeItem('auth-token');
        router.replace('/');
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={authModalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setAuthModalVisible(!authModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={async () => { await handleLogout() }}>
                        <Text style={styles.textStyle}>Logout</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setAuthModalVisible(!authModalVisible)}>
                        <Text style={styles.textStyle}>Close Modal</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 22,
        marginBottom: 0,
    },
    modalView: {
        backgroundColor: '#151515',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 35,
        width: '100%',
        height: 200,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        borderRadius: 20,
    },
    buttonOpen: {
        backgroundColor: '#806874',
    },
    buttonClose: {
        backgroundColor: '#6D4859',
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: '#fff',

    },
    radioButtonWrapper: {
        marginTop: 20,
        marginBottom: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    }
});
