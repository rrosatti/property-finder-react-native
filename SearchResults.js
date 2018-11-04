'use strict';

import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableHighlight, FlatList, Text, } from 'react-native';

class ListItem extends React.PureComponent {

  onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  render() {
    const item = this.props.item;
    const price = item.price_formatted.split(' ')[0];
    return (
      <TouchableHighlight
        onPress={this.onPress}
        underlayColor='#DDDDDD'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item.img_url }} />
            <View style={styles.textContainer}>
              <Text style={styles.price}>{price}</Text>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

}

type Props = {};
export default class SearchResults extends Component<Props> {

  static navigationOptions = {
    title: 'Results',
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, index}) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this.onPressItem}
    />
  );

  onPressItem = (index) => {
    console.log("Pressed row: " + index);
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <FlatList
        data={params.listings}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }

}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC',
  },
  title: {
    fontSize: 20,
    color: '#656565',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
  },
});
