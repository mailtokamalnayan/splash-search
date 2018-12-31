/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SearchBar from './components/SearchBar';
import api from './components/Api';
import PhotoList from './components/PhotoList';
import PhotoDetail from './components/PhotoDetail';

type Props = {};
export default class App extends Component<Props> {
  state = {
    searchPhotos: [],
    photosArray: [],
    photoUrl: '',
    currentPhotoId: null,
  }
  setCurrentPhoto = (photoId) => {
    this.setState({
      currentPhotoId: photoId
    })
  };
  searchPhotosResults = async (searchTerm) => {
    try {
      let searchPhotos = [];
      if (searchTerm) {
        searchPhotos = await api.fetchSearchResults(searchTerm);
      }
      this.setState({
        searchPhotos: searchPhotos,
        photosArray: searchPhotos.results,
        photoUrl: searchPhotos.results.urls
      });
    } catch (e) {
      console.log(e);
    }
  };
  currentPhoto = () => {
    return this.state.photosArray.find(
      (photo) => photo.id === this.state.currentPhotoId
    )
  };
  unsetCurrentPhoto = () => {
    this.setState({
      currentPhotoId: null
    })
  }
  render() {
    if (this.state.currentPhotoId) {
      return <PhotoDetail 
      onBack={this.unsetCurrentPhoto} 
      initialPhotoData={this.currentPhoto()}/>
    }
    if (this.state.photosArray.length > 0) {
      return (
        <View style={styles.container}>
          <SearchBar searchPhotosResults={this.searchPhotosResults} />
            <PhotoList 
              onItemPress = {this.setCurrentPhoto}
              photos={this.state.photosArray}
              photoUrl = {this.state.photoUrl}>
            </PhotoList>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SearchBar searchPhotosResults={this.searchPhotosResults} />
      </View>
    );
}}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  }
});
