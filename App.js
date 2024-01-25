import React, { useState, useEffect } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScrollView, View, Image, Text, TouchableOpacity, Button, StyleSheet } from 'react-native'
import LoginScreen from './LoginScreen'
import TileComponent from './TileComponent'
import DiseaseDetailScreen from './DiseaseDetailScreen'
import logoImage from './assets/pto.jpg'
import searchImage from './assets/search.png'
import { initDB } from './database/ctx'
import drepo from './database/repositories/diseaseRepository'

const Stack = createNativeStackNavigator()

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [diseasesData, setDiseasesData] = useState([])
  const [isSearchClicked, setSearchClicked] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const x = await drepo.getAllDiseases()
        setDiseasesData(x)
        // const data = require('./desc.json')
        // setDiseasesData(data)
      } catch (error) {
        console.error('Błąd wczytywania danych z pliku JSON:', error)
      }
    }
    initDB()
    loadData()
  }, [])

  const handleLoginSuccess = () => {
    setLoggedIn(true)
  }

  const handleLogout = () => {
    setLoggedIn(false)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="DiseasesList"
              options={{
                title: 'Lista Chorób',
                headerLeft: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={logoImage} style={{ width: 30, height: 30, marginRight: 10 }} />
                  </View>
                ),
                headerRight: () => (
                  <TouchableOpacity style={styles.logOutBtn} onPress={handleLogout}>
                    <Text style={{ color: 'white' }}>Wyloguj</Text>
                  </TouchableOpacity>
                ),
              }}
            >
              {() => (
                <ScrollView style={{ flex: 1 }}>
                  <TileComponent diseases={diseasesData} />
                </ScrollView>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="DiseaseDetail"
              component={DiseaseDetailScreen}
              initialParams={{ isSearchClicked }}
              options={({ route }) => ({
                title: route.params.disease.Nazwa || 'Szczegóły',
                headerRight: () => (
                  <TouchableOpacity
                    style={{ marginRight: 10 }}
                    onPress={() => {
                      console.log('xxx')
                      setSearchClicked(true)
                    }}
                  >
                    {/* <Image source={searchImage} style={{ width: 30, height: 30 }} /> */}
                  </TouchableOpacity>
                ),
                headerTitleStyle: {
                  fontSize: 12,
                },
              })}
            />
          </>
        ) : (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <LoginScreen onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  logOutBtn: {
    backgroundColor: '#db5e73',
    borderRadius: 6,
    padding: 8,
    paddingHorizontal: 15,
    elevation: 2,
  },
})

export default App
