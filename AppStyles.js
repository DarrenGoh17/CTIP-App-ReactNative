import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5e6',
  },
  header: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  headerText: {
    position: 'absolute',
    top: 180,
    left: 22,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    zIndex: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 15,
    elevation: 5,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    marginTop: 5,
    fontSize: 12,
    color: '#555',
  },
  thingsToDo: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  viewAllText: {
    color: '#007BFF',
  },
  activities: {
    marginTop: 10,
  },
  card: {
    width: 200,  // Adjust width for horizontal scrolling
    height: 180,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 1,
  },
  cardImage: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardOverlay: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'rgba(255, 223, 0, 1)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  cardTime: {
    fontSize: 10,
    color: '#000',
  },
  cardTitle: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },


  horizontalLine: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  sessionContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSessionContainer: {
    position: 'relative',
    borderBottomLeftRadius: 20, // Add border radius to match the white container below
    borderBottomRightRadius: 20,
    overflow: 'hidden', // Ensures image is contained within the rounded borders
  },
  headerSessionImage: {
    width: '100%',
    height: 320,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 50,
  },
  contentSessionContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30, // Overlaps slightly with the header to create a smooth transition
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },

  
});

export default styles;
