import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import logoImage from './assets/pto.jpg'
import searchIcon from './assets/favicon.png'

const HeaderWithLogo = ({ title, navigation }) => {
  const handleSearch = () => {}

  return (
    <View style={styles.header}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleSearch}>
        <Image source={searchIcon} style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
})

export default HeaderWithLogo
