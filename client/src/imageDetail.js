import React, { Component } from "react";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "./imageDetail.css";

class ImageDetails extends Component {
  state = {
    lat: 25.096,
    lng: 85.313,
    zoom: 13,
    loading: false,
  };

  componentDidMount() {
    this.parseQueryParams();
  }

  parseQueryParams() {
    const query = this.props.match.params.value;
    console.log(query);
    let location = query.split(",");
    this.setState({ lat: +location[0], long: +location[1] });
  }

  // handleClick = (e) => {
  //   const { lat, lng } = e.latlng;
  //   console.log(typeof lat, lng);
  // };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>Nice</Popup>
        </Marker>
      </Map>
    );
  }
}

export default ImageDetails;
