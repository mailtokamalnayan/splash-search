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

type Props = {};
export default class App extends Component<Props> {
  state = {
    searchPhotos: [],
    photosArray: [],
    photoUrl: '',
  }
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
  render() {
    return (
      <View style={styles.container}>
        <SearchBar searchPhotosResults={this.searchPhotosResults} />
        { this.state.photosArray.length > 0 ? (
          <PhotoList 
            photos={this.state.photosArray}
            photoUrl = {this.state.photoUrl}>
          </PhotoList>
        )
        : (
          <Text></Text>
        )
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  }
});
