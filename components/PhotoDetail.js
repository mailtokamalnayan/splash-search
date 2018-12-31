
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image';
import api from './Api';

export default class PhotoDetail extends Component {
  static propTypes = {
    initialPhotoData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired
  }
  state = {
      photo: this.props.initialPhotoData
  }
  async componentDidMount() {
    const fullphotoDetail = await api.fetchPhotoDetail(this.state.photo.id);
    console.log(fullphotoDetail);
    this.setState({
        photo: fullphotoDetail
    })
  }
  render() {
      const { photo } = this.state;
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={this.props.onBack}>
                <Text>Back</Text>
            </TouchableOpacity>
            <AutoHeightImage 
                source={{ uri: photo.urls.small }} 
                style={styles.image}
                width={375}
            />
            <Text>{photo.user.name}</Text>
            <Image 
                style={styles.user}
                source={{ uri: photo.user.profile_image.small }}>
            </Image>
            {photo.exif && (
                <Text>{photo.exif.model}</Text>
            )}
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 60,
    },
    user: {
        width: 60,
        height: 60
    }
  });
