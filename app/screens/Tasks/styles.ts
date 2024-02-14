import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
  },
  card: {
    margin: 3,
    marginBottom: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#c86c5f',
    padding: 10,
  },
  content: { flexDirection: 'row', justifyContent: 'space-between' },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 100,
  },
  button: {
    backgroundColor: '#c86c5f',
    padding: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  checkinButton: {
    width: 70,
    padding: 5,
    backgroundColor: '#658073',
    borderRadius: 5,
    textAlignVertical: 'center',
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#c86c5f',
  },
  buttonText: {
    color: '#fffbf6',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  mapcontainer: {
    height: 200,
    width: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  tasks: {
    marginTop: 5,
    flexDirection: 'row',
    textAlignVertical: 'center',
  },
  tasksText: {
    textAlignVertical: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c86c5f',
  },
  title: {
    marginTop: 30,
  },
});

export default styles;
