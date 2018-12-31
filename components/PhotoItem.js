import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, StyleSheet } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image';

export default class PhotoItem extends Component {
  static propTypes = {
    photo: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
  };
  handlePress = () => {
    this.props.onPress(this.props.photo.id);
  }

  render() {
    return (
        <TouchableOpacity onPress={this.handlePress}>
            <AutoHeightImage 
                source={{ uri: this.props.photo.urls.thumb }} 
                style={styles.image}
                width={375}
            />
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    image: {
        marginBottom: 8
    },
})
