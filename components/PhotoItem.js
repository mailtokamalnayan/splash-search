import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image';

export default class PhotoItem extends Component {
  static propTypes = {
    photo: PropTypes.object.isRequired
  }

  render() {
    return (
        <View>
            <AutoHeightImage 
                source={{ uri: this.props.photo.urls.thumb }} 
                style={styles.image}
                width={375}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    image: {
        marginBottom: 8
    },
})
