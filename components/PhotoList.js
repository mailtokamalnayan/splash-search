import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import PhotoItem from './PhotoItem'

export default class PhotoList extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired
  }

  render() {
    return (
      <View style={styles.list}>
        <FlatList
            key={this.props.photos.id}
            data={this.props.photos}
            renderItem={({item}) => <PhotoItem photo={item}></PhotoItem> }
            keyExtractor={(item, index) => index.toString()}
            >
        </FlatList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    list: {
        marginTop: 16
    }
})

