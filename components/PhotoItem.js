import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Dimensions, Image } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image';
import ProgressiveImage from './ProgressiveImage';

const w = Dimensions.get('window');

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
            <ProgressiveImage
                thumbnailSource={{ uri: this.props.photo.urls.thumb }} 
                source={{ uri: this.props.photo.urls.small }} 
                style={{ width: w.width, height: w.width, marginBottom: 8 }}
                resizeMode="cover"
            />
        </TouchableOpacity>
    )
  }
}
