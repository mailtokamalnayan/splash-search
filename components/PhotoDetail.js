
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image';

export default class PhotoDetail extends Component {
  static propTypes = {
    photo: PropTypes.object.isRequired
  }

  render() {
    return (
        <View style={styles.container}>
            <Text>Single Photo Image</Text>
            <AutoHeightImage 
                source={{ uri: this.props.photo.urls.small }} 
                style={styles.image}
                width={375}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 60,
    }
  });
