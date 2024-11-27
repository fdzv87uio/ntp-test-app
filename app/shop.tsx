import { StatusBar } from 'expo-status-bar';
import { Suspense, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { fetchApiData } from '../utils/fetchApiData';
import Item from '../components/Item';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import FilterModal from '@/components/FilterModal';
import AuthModal from '@/components/AuthModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getValidatedToken } from '@/utils/authUtils';
import { router } from 'expo-router';

export default function Shop() {

  const [data, setData] = useState<any[]>();
  const [displayedData, setDisplayedData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('option1');
  const [categories, setCategories] = useState<any[]>();

  async function getCurrentData() {
    setIsLoading(true);
    const result = await fetchApiData();
    if (result) {
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

  //check if token is valid
  useEffect(() => {
    validateToken();
  }, [])

  async function validateToken() {
    const token: any = await AsyncStorage.getItem('auth-token');
    if (token) {
      const res: any = await getValidatedToken(token);
      if (res.data.status === "success") {
        console.log('token validated');
      } else {
        router.replace('/');
      }
    }
  }




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
        <View style={styles.headerIcon}>
          <Pressable
            onPress={() => setAuthModalVisible(!authModalVisible)}>
            <Ionicons name="menu" size={34} color="#E0FF73" />
          </Pressable>
        </View>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
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
      <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} handleRadioSelect={handleRadioSelect} selectedValue={selectedValue} setDisplayedData={setDisplayedData} categories={categories} data={data} />
      <AuthModal authModalVisible={authModalVisible} setAuthModalVisible={setAuthModalVisible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8919C',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: "100%",
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6D4859',
    position: 'relative',
    paddingHorizontal: 20,
  },
  headerIcon: {
  },
  logo: {
    width: 70,
    height: 70,
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
});
