import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const DiseaseDetailScreen = ({ route }) => {
  const { disease, property } = route.params

  // const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0)
  const properties = [
    'ICD_10',
    'Cel_Diagnostyki_Genetycznej',
    'Badania_Genetyczne',
    'Metodyka_Badawcza',
    'Material',
    'Sposob_Finansowania',
    'Leki_W_Programie_Lekowym',
    'Sposob_Podania_Leku',
    'Nr_Zal_MZ',
  ]

  const initialPropertyIndex = property
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(initialPropertyIndex)

  const prevProperty = properties[currentPropertyIndex - 1] || properties[properties.length - 1]
  const prevButtonText =
    prevProperty.length > 40 ? prevProperty.substring(0, 40) + '...' : prevProperty

  const nextProperty = properties[currentPropertyIndex + 1] || properties[0]
  const nextButtonText =
    nextProperty.length > 40 ? nextProperty.substring(0, 40) + '...' : nextProperty

  const handleNext = () => {
    const nextIndex = currentPropertyIndex + 1
    if (nextIndex < properties.length) {
      setCurrentPropertyIndex(nextIndex)
    } else {
      setCurrentPropertyIndex(0)
    }
  }

  const handleBack = () => {
    const prevIndex = currentPropertyIndex - 1
    if (prevIndex >= 0) {
      setCurrentPropertyIndex(prevIndex)
    } else {
      setCurrentPropertyIndex(properties.length - 1)
    }
  }

  const currentProperty = properties[currentPropertyIndex]

  const isNextDisabled = currentPropertyIndex === properties.length - 1
  const isBackDisabled = currentPropertyIndex === 0

  const [modalVisible, setModalVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearchClick = () => {
    setModalVisible(true)
    setSearchResults([])
  }

  const closeModalAction = () => {
    setModalVisible(false)
  }

  const handleTextChange = (text) => {
    setSearchQuery(text)

    if (text.length >= 3) {
      const results = properties.filter((property) =>
        disease[property]?.toLowerCase().includes(text.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleResultClick = (result) => {
    setCurrentPropertyIndex(properties.indexOf(result))

    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity style={styles.search} onPress={handleSearchClick}>
          <Icon name="search" size={30} color="#1b5b7a" />
          {/* <Text style={styles.searchText}>Szukaj</Text> */}
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Wprowadź szukaną frazę..."
              onChangeText={handleTextChange}
            />
            <View style={styles.searchResults}>
              {searchResults.length > 0 ? (
                <>
                  <Text style={styles.searchResultsText}>Wyniki wyszukiwania:</Text>
                  {searchResults.map((result) => {
                    const fullValue = disease[result]?.toLowerCase()
                    const startIndex = fullValue.indexOf(searchQuery.toLowerCase())
                    const endIndex = startIndex + searchQuery.length + 30
                    const displayedValue =
                      startIndex !== -1
                        ? fullValue.substring(startIndex, endIndex) +
                          (endIndex < fullValue.length ? '...' : '')
                        : ''

                    return (
                      <TouchableOpacity
                        key={result}
                        style={styles.resultItem}
                        onPress={() => handleResultClick(result)}
                      >
                        <Text style={styles.resultPropertyName}>{result}</Text>
                        <Text style={styles.resultPropertyValue}>{displayedValue}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </>
              ) : null}
            </View>

            <TouchableOpacity style={[styles.buttonClose]} onPress={() => closeModalAction()}>
              <Text style={styles.textStyle}>Zamknij</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View>
        <Text style={styles.propertyName}>{currentProperty}</Text>
        <Text style={styles.propertyValue}>{disease[currentProperty]}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isNextDisabled && styles.disabledButton]}
          onPress={handleNext}
          disabled={isNextDisabled}
        >
          <Text style={styles.buttonText}>
            {!isNextDisabled ? (
              <>
                {nextButtonText} {'   '} <Icon name="arrow-right" size={20} color="#fff" />{' '}
              </>
            ) : (
              'Brak'
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isBackDisabled && styles.disabledButton]}
          onPress={handleBack}
          disabled={isBackDisabled}
        >
          <Text style={styles.buttonText}>
            {!isBackDisabled ? (
              <>
                <Icon name="arrow-left" size={20} color="#fff" style={{ marginRight: 30 }} />{' '}
                {'   '}
                {prevButtonText}{' '}
              </>
            ) : (
              'Brak'
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchResultsText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  topView: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  resultItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 8,
    minWidth: '100%',
    backgroundColor: '#dde9ed',
  },
  resultPropertyName: {
    fontWeight: 'bold',
    color: '#236aba',
  },
  resultPropertyValue: {
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 28,
    paddingVertical: 6,
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 10,
  },
  // search: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#c7d1d6',
  //   padding: 10,
  //   borderWidth: 1,
  //   borderColor: 'black',
  //   borderRadius: 5,
  //   minWidth: 20,
  // },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  propertyValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  button: {
    flex: 1,
    backgroundColor: '#004b77',
    padding: 10,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  searchText: {
    textAlign: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    marginLeft: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonClose: {
    backgroundColor: '#db5e73',
    borderRadius: 10,
    padding: 5,
    elevation: 2,
    minWidth: 150,
    height: 40,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  searchResults: {
    marginTop: 20,
  },
})

export default DiseaseDetailScreen
