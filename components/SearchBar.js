import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
import debounce from 'lodash.debounce';

export default class SearchBar extends Component {
  static propTypes = {
    searchPhotosResults: PropTypes.func.isRequired,
  };
  state = {
    searchTerm: ''
  };
  debouncedSearchResults = debounce(this.props.searchPhotosResults, 300);
  handleChange = (searchTerm) => {
    this.setState({ searchTerm }, () => {
      //Deboubce
      this.debouncedSearchResults(this.state.searchTerm);
    });
  };
  render() {
    return (
        <TextInput 
          placeholder='Search photos' 
          style={styles.input} 
          onChangeText={this.handleChange}/>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    backgroundColor: '#eee',
    width: '90%',
    borderRadius: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 16
  },
})

