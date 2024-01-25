import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

const TileComponent = ({ diseases }) => {
  const navigation = useNavigation()

  const handlePress = (disease, property) => {
    navigation.navigate('DiseaseDetail', { disease, property })
  }

  return (
    <ScrollView>
      <Text style={styles.sectionTitle}>Choroby</Text>
      <View style={styles.tileContainer}>
        {diseases.map((disease, index) => (
          <TouchableOpacity style={styles.tile} key={index} onPress={() => handlePress(disease, 0)}>
            <Text style={styles.tileText}>
              {disease.Nazwa.length > 80
                ? `${disease.Nazwa.substring(0, 80).toUpperCase()}...`
                : disease.Nazwa.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Metodyka badawcza</Text>
      <View style={styles.tileContainer}>
        {diseases.map((disease, index) => (
          <TouchableOpacity style={styles.tile} key={index} onPress={() => handlePress(disease, 3)}>
            <Text style={styles.tileText}>
              {disease.Metodyka_Badawcza.length > 80
                ? `${disease.Metodyka_Badawcza.substring(0, 80).toUpperCase()}...`
                : disease.Metodyka_Badawcza.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    backgroundColor: '#bbbfc9',
    padding: 10,
    color: 'white',
  },
  tileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tile: {
    width: '90%',
    height: 50,
    margin: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 5,
  },
  tileText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
})

export default TileComponent
