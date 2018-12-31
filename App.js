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
import debounce from 'lodash.debounce';

type Props = {};
export default class App extends Component<Props> {
  state = {
    searchPhotos: [],
    photosArray: [],
    photoUrl: '',
    currentPhotoId: null,
    page: 1,
    loading: false,
    searchTerm: ''
  }
  setCurrentPhoto = (photoId) => {
    this.setState({
      currentPhotoId: photoId
    })
  };
  searchPhotosResults = async (searchTerm) => {
    try {
      console.log(searchTerm);
      let searchPhotosFromApi = [];
      if (searchTerm) {
        searchPhotosFromApi = await api.fetchSearchResults(this.state.searchTerm, this.state.page);
        this.setState(state => ({
          searchPhotos: searchPhotosFromApi,
          photosArray: [...state.photosArray, ...searchPhotosFromApi.results],
        }));
      }
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
  handleChange = () => {
    this.setState(state => ({ 
      page: state.page + 1}), () => 
      this.searchPhotosResults(this.state.searchTerm)
      )
  }
  
  debouncedSearchResults = debounce(this.searchPhotosResults, 300);
  handleChangeSearch = (searchTerm) => {
    this.setState({ searchTerm }, () => {
      this.debouncedSearchResults(this.state.searchTerm);
      this.setState({
        photosArray: []
      })
    });
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
          <SearchBar onSearch={this.handleChangeSearch} />
            <PhotoList
              onEndReached={this.handleChange} 
              onItemPress = {this.setCurrentPhoto}
              photos={this.state.photosArray}
              photoUrl = {this.state.photoUrl}>
            </PhotoList>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SearchBar onSearch={this.handleChangeSearch} />
      </View>
    );
}}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginBottom: 120
  }
});
