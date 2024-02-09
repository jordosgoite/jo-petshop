import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Appbar, Card, Paragraph, Text } from 'react-native-paper';
import { useStore } from 'app/store';
import styles from './styles';
import NavigationService from 'app/navigation/NavigationService';

const Tasks: React.FC = () => {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  const onLogOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Iskay Pets" subtitle="Todas las tiendas" />
        <Appbar.Action icon="logout" onPress={onLogOut} />
      </Appbar.Header>
      <Card.Content>
        <View style={styles.content}>
          <Paragraph>Dirección: </Paragraph>
          <Paragraph>Horario:</Paragraph>
          <Paragraph>Zona Horaria: </Paragraph>
        </View>
      </Card.Content>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          NavigationService.navigate('Home');
        }}>
        <Text style={styles.buttonText}>Veolver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Tasks;
