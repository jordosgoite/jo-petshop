import React, { useState } from 'react';
import { TouchableOpacity, View, FlatList } from 'react-native';
import {
  Appbar,
  Card,
  Checkbox,
  Modal,
  Paragraph,
  Text,
} from 'react-native-paper';
import { useStore } from 'app/store';
import styles from './styles';
import NavigationService from 'app/navigation/NavigationService';
import { PostStoreCheckin } from 'app/services/react-query/queries/user';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MyDataParams, MyScreenParams } from './dataTypes';

let initialDataState: MyDataParams = {
  id: '',
  name: '',
  address: { direction: '', coordinate: { lat: '', lng: '' } },
  tasks: [{ id: '', description: '', assigned: false }],
  shipping_methods: [{ description: '', id: '', name: '' }],
};

const Tasks: React.FC<MyScreenParams> = ({ route }) => {
  const { storeId } = route.params;
  const [taskSelected, setTaskSelected] = useState('');
  const storeFullList = useStore(state => state.storeList);
  const updateStoreFullList = useStore(state => state.setStoreList);
  const storeData: MyDataParams =
    storeFullList?.find(store => store.id === storeId) || initialDataState;

  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  const {
    data,
    isLoading,
    mutate: doCheckin,
  } = PostStoreCheckin({
    taskId: parseInt(taskSelected, 10),
    storeId: parseInt(storeData.id, 10),
  });

  const onLogOut = () => {
    setIsLoggedIn(false);
  };

  const updateTaskStatus = () => {
    let tempTaskList = storeData.tasks.map(task => {
      if (task.id === taskSelected) {
        return { ...task, assigned: true };
      }
      return task;
    });
    let tempStoreData = storeFullList.map(store => {
      if (store.id === storeId) {
        return { ...store, tasks: tempTaskList };
      }
      return store;
    });
    updateStoreFullList(tempStoreData);
    setTaskSelected('');
  };

  const onCheckin = () => {
    doCheckin();
    updateTaskStatus();
    showModal();
    console.log(isLoading, data);
    //This endpoint is always returning a 404 error. Tested by Postman (sending the proper body data with the proper data format)
    //Data is being updated locally
  };
  const renderShippingMethods = ({ item }) => (
    <View>
      <Paragraph>{`${item?.name} - ${item?.description}`}</Paragraph>
    </View>
  );

  const renderTasks = ({ item }) => (
    <View style={styles.tasks}>
      <Text style={styles.tasksText}>{item?.description} </Text>
      <Checkbox
        status={taskSelected === item.id ? 'checked' : 'unchecked'}
        disabled={item.assigned}
        onPress={() => setTaskSelected(item.id)}
        uncheckedColor="#c86c5f"
        color="purple"
        testID={item.id}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Iskay Pets" subtitle="Todas las tiendas" />
        <Appbar.Action icon="logout" onPress={onLogOut} />
      </Appbar.Header>
      <Card style={styles.card} mode="elevated">
        <Card.Title title={storeData.name} />
        <Card.Content>
          <View style={styles.mapcontainer}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              minZoomLevel={12}
              zoomEnabled
              initialRegion={{
                latitude: 36.69825,
                longitude: -4.4624,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                key={storeData.id}
                pinColor={'purple'}
                coordinate={{
                  latitude: parseFloat(storeData?.address?.coordinate?.lat),
                  longitude: parseFloat(storeData?.address?.coordinate?.lng),
                }}
                title={storeData && storeData.name}
              />
            </MapView>
          </View>
          <Paragraph style={styles.title}>
            <Text style={styles.subtitle}>Métodos de Envío:</Text>
          </Paragraph>
          <FlatList
            data={storeData.shipping_methods}
            renderItem={renderShippingMethods}
            keyExtractor={item => item.id}
          />
          <Paragraph style={styles.title}>
            <Text style={styles.subtitle}>Lista de Tareas:</Text>
          </Paragraph>
          <FlatList
            data={storeData.tasks}
            renderItem={renderTasks}
            keyExtractor={item => item.id}
          />
          <Modal
            visible={modalVisible}
            contentContainerStyle={styles.containerStyle}
            onDismiss={hideModal}>
            <Text style={styles.modalText}>
              La tarea ha sido seleccionada éxitosamente!
            </Text>
          </Modal>
          <TouchableOpacity style={styles.checkinButton} onPress={onCheckin}>
            <Text style={styles.buttonText}>Checkin</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          NavigationService.navigate('Home');
        }}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Tasks;
