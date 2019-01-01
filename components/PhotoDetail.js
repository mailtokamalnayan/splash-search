
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {ScrollView, View, StyleSheet, Text, Image, TouchableOpacity, CameraRoll, Alert, Platform } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image';
import api from './Api';
import { iOSUIKit } from 'react-native-typography';
import Icon from 'react-native-vector-icons/Feather';
import RNFetchBlob from 'react-native-fetch-blob';

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
    this.setState({
        photo: fullphotoDetail
    })
  }

  saveToCameraRoll = async (image) => {
    CameraRoll.saveToCameraRoll(image).then(Alert.alert('Photo Added', 'Photo added to camera roll.')).catch(err => console.log('err:', err))
    console.log('Function invoked.');
    }

  render() {
      const { photo } = this.state;
    return (
        <View style={{height: '100%'}}>
            <ScrollView style={styles.container}>
                <TouchableOpacity  
                    onPress={this.props.onBack}>
                <Text style={styles.back}>← Back</Text>
                </TouchableOpacity>
                {photo &&
                    <AutoHeightImage 
                    source={{ uri: photo.urls.small }} 
                    style={styles.image}
                    width={375}
                />
                }
                {photo &&
                <View style={styles.author}>
                    <Image 
                        style={styles.user}
                        source={{ uri: photo.user.profile_image.medium }}>
                    </Image>    
                    <Text style={[iOSUIKit.subheadEmphasized, styles.center]}>{photo.user.name}</Text>
                    <Text style={[iOSUIKit.subhead, styles.center, styles.opacity, styles.marginTop]}>{photo.user.bio}</Text>
                </View>
                }
                {photo && (
                    <View style={styles.exif}>
                        <View style={[iOSUIKit.body, styles.row]}>
                            <Icon style={styles.icon} name="camera" size={24} color="#999" />
                            {photo.exif && 
                                <View>
                                    <Text style={[iOSUIKit.subhead, styles.center]}>{photo.exif.model}</Text>
                                    <Text style={[styles.center, styles.marginTop, styles.opacity]}>ƒ/{photo.exif.aperture} · {photo.exif.focal_length}mm · {photo.exif.iso} ISO</Text>
                                </View>
                            }
                        </View>
                    </View>
                )}
            </ScrollView>
            <TouchableOpacity 
                style={styles.download} 
                onPress={() => this.saveToCameraRoll(photo.urls.regular)}
            >
                <Icon name="arrow-down" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    download: {
        backgroundColor: '#444',
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 24,
        right: 24,
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
    },
    row: {
        width: '100%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    marginTop: {
        marginTop: 4
    },
    icon: {
        paddingBottom: 8
    },
    opacity: {
        opacity: 0.65
    },
    exif: {
        marginTop: 8,
        padding: 16,
        paddingBottom: 48,
        flexDirection: 'row',
    },
    center: {
        textAlign: 'center'
    },
    back: {
        fontSize: 16,
        paddingLeft: 16,
        marginBottom: 16,
        fontWeight: '600'
    },
    container: {
      marginTop: 60,
    },
    user: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    author: {
        marginTop: 4,
        padding: 16,
    }
  });
