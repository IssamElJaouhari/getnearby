import React, { useState, useEffect } from "react";
import FacilityCard from "./FacilityCard";
import "./App.css";

// Define typeColors object outside of the component
const typeColors = {
  pharmacy: "#57C5B6",
  school: "#1A5F7A",
  supermarket: "#3CB371",
  restaurant: "#FF6347",
  cafe: "#FFA07A",
  bank: "#ADD8E6",
  hospital: "#CD5C5C",
  fuel: "#FFD700",
  parking: "#245953",
  post_office: "#BA55D3",
  library: "#FFE4C4",
  atm: "#00CED1",
};

// Function to group facilities by type
const groupFacilitiesByType = (facilities) => {
  return facilities.reduce((accumulator, facility) => {
    const type = facility.type;
    if (!accumulator[type]) {
      accumulator[type] = [];
    }
    accumulator[type].push(facility);
    return accumulator;
  }, {});
};

function Map() {
  const [location, setLocation] = useState(null);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    // Function to fetch nearby facilities based on the current location
      // Function to fetch nearby facilities based on the current location
  const getNearbyFacilities = async () => {
    if (!location) return;

    try {
      const response = await fetch(
        `http://localhost:8080/https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyAhE18I5xrKhDuGwPThz7ZRHXMp3h9lu5s`
      );
      const data = await response.json();
      const osmType = data.osm_type;
      const osmId = data.osm_id;

      let facilities = [];
      let next_page_token;

      // Fetch facilities for each type
      for (let type in typeColors) {
        do {
          let url = `http://localhost:8080/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=500000&type=${type}&key=AIzaSyAhE18I5xrKhDuGwPThz7ZRHXMp3h9lu5s`;
          if (next_page_token) {
            url += `&pagetoken=${next_page_token}`;
          }
          const facilitiesResponse = await fetch(url);
          const facilitiesData = await facilitiesResponse.json();
          facilities = [...facilities, ...facilitiesData.results];
          next_page_token = facilitiesData.next_page_token;
        } while (next_page_token);
      }

      // Normalize facilities data
      facilities = facilities.map((result) => {
        return {
          name: result.name,
          type: result.types[0],
          link: `https://www.google.com/maps/place/?q=place_id:${result.place_id}`,
        };
      });

      setFacilities(facilities);
    } catch (error) {
      console.log(error);
    }
  };

    if (location) {
      getNearbyFacilities();
    }
  }, [location]);

  // Function to handle location button click
  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position);
    });
  };

  return (
    <div className="App">
      <h1 className="facility-name">Get your Nearby Facilities📍</h1>
      {!location && (
        <div id="wrapper">
          <a href="#search" className="my-super-cool-btn">
            <div className="dots-container">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <span onClick={handleLocationClick}>Get 🗺️!</span>
          </a>
        </div>
      )}

      {location && (
        <p>
          Your latitude is {location.coords.latitude} and your longitude is{" "}
          {location.coords.longitude}.
        </p>
      )}

      {facilities.length > 0 && (
        <div className="card-container">
          {Object.keys(groupFacilitiesByType(facilities)).map((type, index) => {
            return (
              <FacilityCard
                key={type}
                type={type}
                facilities={groupFacilitiesByType(facilities)[type]}
                color={typeColors[type]}
              />
            );
          })}
        </div>
      )}

      {!facilities.length && location && (
        <div className="loader">
          <div className="spinner"></div>
          Fetching nearby facilities...
        </div>
      )}
    </div>
  );
}

export default Map;