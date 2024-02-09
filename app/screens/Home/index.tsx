import React from 'react';
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
import { GetStoresList } from 'app/services/react-query/queries/user';
import NavigationService from 'app/navigation/NavigationService';

const homeImage = require('../../assets/mascotas.jpg');
const Home: React.FC = () => {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  const {
    isLoading: isLoadingPets,
    isFetching: isFetchingPets,
    data: dataPets = { results: [] },
  } = GetStoresList();
  const onLogOut = () => {
    setIsLoggedIn(false);
  };
  console.log(dataPets);

  const renderStores = ({ item }) => (
    <Card style={styles.card} mode="elevated">
      <Card.Title title={item.name} />
      <Card.Content>
        <View style={styles.content}>
          <Paragraph>Dirección: {item.address.direction}</Paragraph>
          <Paragraph>
            Horario:{' '}
            {`Desde: ${item?.schedule?.from} - Hasta: ${item?.schedule?.end}`}
          </Paragraph>
          <Paragraph>Zona Horaria: ${item?.schedule?.timezone}</Paragraph>
        </View>
      </Card.Content>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Button pressed!');
          NavigationService.navigate('StoreTasks');
        }}>
        <Text style={styles.buttonText}>Ver Servicios</Text>
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Iskay Pets" subtitle="Todas las tiendas" />
        <Appbar.Action icon="logout" onPress={onLogOut} />
      </Appbar.Header>
      <View style={styles.container}>
        <Image source={homeImage} style={styles.images} />
      </View>
      <FlatList
        data={dataPets}
        renderItem={renderStores}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingPets || isFetchingPets}
            onRefresh={() => {}}
          />
        }
      />
    </View>
  );
};

export default Home;
