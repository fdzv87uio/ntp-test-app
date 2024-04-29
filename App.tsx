import { StatusBar } from 'expo-status-bar';
import { Suspense, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { fetchApiData } from './utils/fetchApiData';
import Item from './components/Item';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';

export default function App() {

  const [data, setData] = useState<any[]>();
  const [displayedData, setDisplayedData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('option1');
  const [categories, setCategories] = useState<any[]>();

  async function getCurrentData() {
    setIsLoading(true);
    const result = await fetchApiData();
    if (result) {
      console.log('RES');
      console.log(result);
      setData(result);
      let categorySet = new Set();
      result.forEach((x: any) => {
        categorySet.add(x.category)
      })
      let categoryArray = Array.from(categorySet);
      setCategories(categoryArray);
      setSelectedValue('all');
      arrangeData();

    }
  }

  useEffect(() => {
    if (!data) {
      getCurrentData()
    }
  }, []);

  function arrangeData() {
    if (data && data.length === 20) {
      if (page == 1) {
        const res = data.slice(0, 5);
        setDisplayedData(prevData => [...prevData, ...res]);
      } else if (page === 2) {
        const res = data.slice(5, 10);
        setDisplayedData(prevData => [...prevData, ...res]);
      } else if (page === 3) {
        const res = data.slice(10, 15);
        setDisplayedData(prevData => [...prevData, ...res]);
      } else if (page === 4) {
        const res = data.slice(15, 20);
        setDisplayedData(prevData => [...prevData, ...res]);
      }
    }
  }

  function filterData() {
    if (selectedValue !== 'all' && data) {
      let filtered = data.filter((x: any) => x.category === selectedValue);
      console.log('FD');
      console.log(filtered);
      setDisplayedData(filtered);
    }
  }

  useEffect(() => {
    if (selectedValue === 'all') {
      arrangeData();
    }
  }, [page]);

  useEffect(() => {
    if (data && selectedValue !== 'all') {
      filterData();
    }
  }, [selectedValue]);

  useEffect(() => {
    //reload
  }, [displayedData])





  function ListEndLoader() {
    if (isLoading && selectedValue === 'all') {
      return <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} color={'#E0FF73'} size={'large'} />;
    }
  };

  function fetchNextPage() {
    setPage(page + 1);
  };

  function handleRadioSelect(value: string) {
    setSelectedValue(value)
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/logo.png")} style={styles.logo} />
        <View style={styles.headerIcon}>
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name="filter-circle-outline" size={34} color="#E0FF73" />
          </Pressable>
        </View>
      </View>
      {displayedData && (
        <FlatList
          data={displayedData}
          renderItem={({ item }) => (
            <Suspense>
              <Item item={item} id={item.id} title={item.title} />
            </Suspense>
          )}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0}
          ListFooterComponent={ListEndLoader}
        />
      )}
      <StatusBar />
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
                  <View key={key} style={styles.radioButton}>
                    <RadioButton.Android
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: "100%",
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151515',
    position: 'relative',
    marginTop: 10,
  },
  headerIcon: {
    position: 'absolute',
    right: 30,
  },
  logo: {
    width: 170,
    height: 50,
  },
  itemContainer: {
    width: 400,
    height: 800,
    backgroundColor: "red",
    color: "white",
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  itemText: {
    height: 70,
    color: "#ffffff",
    fontSize: 32,
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
