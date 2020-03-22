import React, { Component } from 'react';
import { Image } from 'react-native';

const image = require('./me.jpg');

class Images extends Component {
  render() {
    return <Image source={image} style={{ width: 400, height: 400 }} />;
  }
}

export default Images;
