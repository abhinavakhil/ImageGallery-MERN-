import React, { Component } from "react";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "./imageDetail.css";

const DEFAULT_LONG = -123;
const DEFAULT_LAT = 48;

class ImageDetails extends Component {
  state = {
    lat: 0,
    long: 0,
    img: "",
  };

  componentDidMount() {
    this.parseQueryParams();
  }

  parseQueryParams() {
    const query = this.props.match.params.value;
    console.log(query);
    let location = query.split(",");
    this.setState({ lat: location[0], long: location[1] });
    console.log(this.state.long);
  }

  render() {
    let longitude = this.state.long ? this.state.long : DEFAULT_LONG;
    let latitude = this.state.lat ? this.state.lat : DEFAULT_LAT;
    return (
      <Map
        center={[longitude, latitude]}
        zoom={13}
        className="leaflet-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        ></TileLayer>
        {!this.state.lang ? (
          <div className="loading">Loading</div>
        ) : (
          <Marker position={[longitude, latitude]}>
            <Popup>Nice</Popup>
          </Marker>
        )}
      </Map>
    );
  }
}

export default ImageDetails;
