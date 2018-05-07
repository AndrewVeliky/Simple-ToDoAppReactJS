import React, { Component } from 'react';
import Col  from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image'

export default class Gif extends Component {
    constructor(props){
      super(props);
    }
  
    render() {
      return (
        <Col xs={6} md={4}>
            <Image src={this.props.src} responsive/>
            <div>{this.props.title}</div>
        </Col>
      );
    }
  }

