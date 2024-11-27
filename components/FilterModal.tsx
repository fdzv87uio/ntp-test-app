import { Alert, Modal, Pressable, Text, View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function FilterModal({ modalVisible, setModalVisible, handleRadioSelect, selectedValue, setDisplayedData, categories, data }: { modalVisible: any, setModalVisible: any, handleRadioSelect: any, selectedValue: any, setDisplayedData: any, categories: any, data: any }) {
    return (
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
                    <View style={styles.radioButtonWrapper}>
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                                value={'all'}
                                status={selectedValue === 'all' ?
                                    'checked' : 'unchecked'}
                                onPress={() => {
                                    handleRadioSelect('all');
                                    if (data) {
                                        setDisplayedData(data);
                                    }
                                }}
                                color="#007BFF"
                            />
                            <Text style={styles.radioLabel}>
                                All
                            </Text>
                        </View>
                        {categories?.map((x: any, key: number) => {
                            return (
                                <View style={styles.radioButton}>
                                    <RadioButton.Android
                                        key={x}
                                        value={x}
                                        status={selectedValue === x ?
                                            'checked' : 'unchecked'}
                                        onPress={() => handleRadioSelect(x)}
                                        color="#007BFF"
                                    />
                                    <Text style={styles.radioLabel}>
                                        {x}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Hide Filters</Text>
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
        height: 600,
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
