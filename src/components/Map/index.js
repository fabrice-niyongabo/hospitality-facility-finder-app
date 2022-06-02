import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
  Polygon,
} from "google-maps-react";
import Axios from "axios";
import {
  fetchCoordinates,
  calCulateDistance,
  toastMessage,
  errorHandler,
} from "../../helpers/";
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
    triangleCoords: [],
    lat: "",
    long: "",
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
    fetchCoordinates()
      .then((res) => {
        console.log(res);
        this.setState({ ...this.state, lat: res.lat, long: res.long });
        Axios.get(
          process.env.REACT_APP_BACKEND_URL +
            "/map/all/" +
            res.lat +
            "/" +
            res.long
        )
          .then((res) => {
            toastMessage("info", res.data.msg);
            this.setState({ ...this.state, facilities: res.data.result });
            const dt = [];
            for (let i = 0; i < res.data.result.length; i++) {
              dt.push({
                lat: parseFloat(res.data.result[i].lat),
                lng: parseFloat(res.data.result[i].long),
              });
            }
            this.setState({ ...this.state, triangleCoords: dt });
          })
          .catch((error) => {
            console.log(error);
            errorHandler(error);
          });
      })
      .catch(() => {
        toastMessage(
          "error",
          "Failed to get your current location. Please try again later and make sure you have turned on location on your device."
        );
      });
  }
  render() {
    return (
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
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
              lat={item.lat}
              long={item.long}
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
              <p style={{ margin: 0, padding: 0 }}>
                {this.state.activeMarker.stars} stars
              </p>
              <p>
                {calCulateDistance(
                  this.state.lat,
                  this.state.long,
                  this.state.activeMarker.lat,
                  this.state.activeMarker.long
                ).toFixed(1)}{" "}
                KM
              </p>
            </div>
          </InfoWindow>
          {/* <Polygon
          paths={this.state.triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35}
        /> */}
        </Map>
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <a href="/">
            <div className="p-2">
              <button className="btn bg-orange text-white">Back to home</button>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(MapContainer);
