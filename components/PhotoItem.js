import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Dimensions, Image } from 'react-native'
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
      getWidth = (width, height) => {
        const ratio = Math.min(w.width / width, w.height / height);
        return (width * ratio)
      }
      getHeight = (width, height) => {
        const ratio = Math.min(w.width / width, w.height / height);
        return (height * ratio)
      }
    return (
        <TouchableOpacity onPress={this.handlePress}>
            <ProgressiveImage
                thumbnailSource={{ uri: this.props.photo.urls.thumb }} 
                source={{ uri: this.props.photo.urls.small }} 
                style={{ aspectRatio: 3/2, width: getWidth(this.props.photo.width, this.props.photo.height) , height: getHeight(this.props.photo.width , this.props.photo.height), marginBottom: 8 }}
                resizeMode="cover"
            />
        </TouchableOpacity>
    )
  }
}
