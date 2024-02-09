import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  card: {
    margin: 4,
    backgroundColor: '#03438a',
  },
  content: { flexDirection: 'row', justifyContent: 'space-between' },
  images: {
    flex: 0.5,
    height: 150,
    objectFit: 'cover',
    borderRadius: 2,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;
