import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Axios from "axios";

const mapStyles = {
  width: "100%",
  height: "100%",
};
export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    facilities: [],
  };
  onMarkerClick = (props, marker, e) => {
    if (marker.name !== this.state.activeMarker.name) {
      this.setState({
        ...this.state,
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
      });
    }
  };
  visitFacility = (props, marker, e) => {
    window.location = "/" + marker.id;
  };
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        ...this.state,
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  componentDidMount() {
    Axios.get(process.env.REACT_APP_BACKEND_URL + "/map/all/")
      .then((res) => {
        this.setState({ ...this.state, facilities: res.data.result });
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat:
            this.state.facilities.length > 0
              ? this.state.facilities[0].lat
              : -1.9595264,
          lng:
            this.state.facilities.length > 0
              ? this.state.facilities[0].long
              : 30.0941312,
        }}
      >
        {this.state.facilities.map((item, i) => (
          <Marker
            name={item.name}
            title={"Address: " + item.address}
            key={i}
            position={{ lat: item.lat, lng: item.long }}
            onMouseover={this.onMarkerClick}
            onClick={this.visitFacility}
            description={item.description}
            averagePrice={item.averagePrice}
            stars={item.stars}
            id={item._id}
          />
        ))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            <p style={{ margin: 0, padding: 0 }}>
              {this.state.activeMarker.description}
            </p>
            <p style={{ margin: 0, padding: 0 }}>
              Average price: {this.state.activeMarker.averagePrice} RWF / $
              {this.state.activeMarker.averagePrice / 1000}
            </p>
            <p>{this.state.activeMarker.stars} stars</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(MapContainer);
