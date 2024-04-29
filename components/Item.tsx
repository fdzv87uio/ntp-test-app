
import { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View, Image } from 'react-native';

interface ItemProps {
    item: any
    title: string
    id: string
};

export default function Item({ title, id, item }: ItemProps) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View key={id + "-" + title} style={styles.itemContainer}>
            <View style={styles.card}>
                <Text style={styles.itemText}>{title}</Text>
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                </View>
                <View style={styles.buttonWrapper}>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.textStyle}>Show Info</Text>
                    </Pressable>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.descriptionWrapper}>
                                <Text style={styles.modalText}>Title:</Text>
                                <Text style={styles.modalText}>{item.title}</Text>
                            </View>
                            <View style={styles.descriptionWrapper}>
                                <Text style={styles.modalText}>Price:</Text>
                                <Text style={styles.modalText}>${item.price}</Text>
                            </View>
                            <View style={styles.descriptionWrapper}>
                                <Text style={styles.modalText}>Description:</Text>
                                <Text style={styles.modalText}>{item.description}</Text>
                            </View>
                            <View style={styles.descriptionWrapper}>
                                <Text style={styles.modalText}>Category:</Text>
                                <Text style={styles.modalText}>{item.category}</Text>
                            </View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Hide Info</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 100,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: "100%",
        height: 'auto',
        backgroundColor: "#000000",
        color: "black",
        marginVertical: 10,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: "90%",
        height: 'auto',
        backgroundColor: 'rgba(225, 225, 225, 0.25)',
        color: "black",
        marginVertical: 15,
        borderWidth: 3,
        borderColor: "#D5FF40",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,

    },
    textWrapper: {
        width: '100%',
        height: 70,
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
    },
    itemText: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 10,
        paddingHorizontal: 30,
        height: 'auto',
    },
    imageWrapper: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    itemImage: {
        resizeMode: 'contain',
        height: 420,
        width: 300,
    },
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
        height: 'auto',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonWrapper: {
        width: '100%',
        height: 100,
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        borderRadius: 20,
    },
    buttonOpen: {
        backgroundColor: '#E0FF73',
    },
    buttonClose: {
        backgroundColor: '#E0FF73',
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        color: "white",
    },
    descriptionWrapper: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
});