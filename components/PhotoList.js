import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import PhotoItem from './PhotoItem'

export default class PhotoList extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onEndReached: PropTypes.func.isRequired
  }

  render() {
    return (
      <View style={styles.list}>
        <FlatList
            onEndReached={this.props.onEndReached}
            onEndReachedThreshold={0} 
            key={this.props.photos.id}
            data={this.props.photos}
            renderItem={({item}) => 
                <PhotoItem 
                    onPress={this.props.onItemPress}
                    photo={item}>
                </PhotoItem> }
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

