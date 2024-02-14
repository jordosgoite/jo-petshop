import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#c86c5f',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    width: 300,
    height: 100,
  },
  textContent: {
    flexDirection: 'column',
    padding: 30,
  },
  images: {
    flex: 0.5,
    height: 150,
    width: 300,
    objectFit: 'cover',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#c86c5f',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fffbf6',
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
