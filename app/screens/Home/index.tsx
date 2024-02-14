import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Appbar, Card, Paragraph } from 'react-native-paper';
import { useStore } from 'app/store';
import styles from './styles';
import {
  GetStoresList,
  PostResetStores,
} from 'app/services/react-query/queries/user';
import NavigationService from 'app/navigation/NavigationService';
import { imageList } from './constants';

const Home: React.FC = () => {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  const setStoreList = useStore(state => state.setStoreList);
  const {
    isLoading: isLoadingPets,
    isFetching: isFetchingPets,
    data: dataPets = { results: [] },
  } = GetStoresList();
  const onLogOut = () => {
    setIsLoggedIn(false);
  };

  const {
    data: responseReset,
    isLoading: isLoadingReset,
    mutate: doResetStores,
  } = PostResetStores();

  useEffect(() => {
    dataPets && setStoreList(dataPets);
  }, [dataPets, setStoreList]);

  const onResetStores = () => {
    doResetStores();
    console.log(responseReset.status);
  };

  const renderStores = ({ item }) => (
    <Card style={styles.card} mode="elevated">
      <Card.Title titleStyle={styles.title} title={item.name} />
      <Card.Content>
        <View style={styles.imageContainer}>
          <Image
            source={imageList[Math.floor(Math.random() * imageList.length)]}
            style={styles.images}
          />
        </View>
        <View style={styles.textContent}>
          <Paragraph>
            <Text style={styles.subtitle}>Dirección:</Text>{' '}
            {item.address.direction}
          </Paragraph>
          <Paragraph>
            <Text style={styles.subtitle}>Horario:</Text>
            {` Desde: ${item?.schedule?.from} - Hasta: ${item?.schedule?.end}`}
          </Paragraph>
          <Paragraph>
            <Text style={styles.subtitle}>Zona Horaria:</Text>{' '}
            {item?.schedule?.timezone}
          </Paragraph>
        </View>
      </Card.Content>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          NavigationService.navigate('StoreTasks', { storeId: item?.id });
        }}>
        <Text style={styles.buttonText}>Ver Tareas</Text>
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Iskay Pets" subtitle="Todas las tiendas" />
        <Appbar.Action icon="logout" onPress={onLogOut} />
      </Appbar.Header>
      <FlatList
        data={dataPets}
        renderItem={renderStores}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={isLoadingPets || isFetchingPets} />
        }
      />
      <View style={styles.resetButtonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={onResetStores}>
          <Text style={styles.buttonText}>Reset Stores</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
