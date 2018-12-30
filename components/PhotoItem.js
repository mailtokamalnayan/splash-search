import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet } from 'react-native'

export default class PhotoItem extends Component {
  static propTypes = {
    photo: PropTypes.object.isRequired
  }

  render() {
    return (
        <View>
            <Image 
                source={{ uri: this.props.photo.urls.thumb }} 
                style={styles.image}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        minHeight: 200,
        marginBottom: 8
    },
})
