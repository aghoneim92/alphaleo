import React from 'react'
import { Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  logo: {
    flex: 1,
  },
})

const Logo = () => (
  <Image
    style={styles.logo}
    width={360}
    height={360}
    resizeMode="contain"
    source={{ uri: 'logo_transparent' }}
  />
)

export default Logo
