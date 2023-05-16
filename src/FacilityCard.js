import React from "react";

const FacilityCard = ({ type, facilities, color }) => {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <div className="card-header">{type}</div>
      <ul>
        {facilities.map((facility, index) =>
          facility.name !== undefined && facility.name.trim() !== "" ? (
            <li key={`${facility.name}-${index}`}>
              <a target="_blank" rel="noreferrer" href={facility.link}>{facility.name}</a>
            </li>
          ) : null
        )}
      </ul>
      <div className="card-footer">{facilities.length} facilities found</div>
    </div>
  );
};

export default FacilityCard;



// const typeColors = {
  
  // AIzaSyAhE18I5xrKhDuGwPThz7ZRHXMp3h9lu5s

  
//   pharmacy: "#57C5B6",
//   school: "#1A5F7A",
//   supermarket: "#3CB371",
//   restaurant: "#FF6347",
//   cafe: "#FFA07A",
//   bank: "#ADD8E6",
//   hospital: "#CD5C5C",
//   fuel: "#FFD700",
//   parking: "#245953",
//   post_office: "#BA55D3",
//   library: "#FFE4C4",
//   atm: "#00CED1",
// };

// https://overpass-api.de/api/interpreter?data=[out:json];(node(around:5000,33.9539948,-6.8640673)[amenity];way(around:5000,33.9569948,-6.8640573)[amenity];relation(around:5000,33.9539948,-6.8640673)[amenity];);out%20center;

//https://overpass-api.de/api/interpreter?data=[out:json];(node(around:5000,33.9539948,-6.8640673)[amenity];way(around:5000,33.9539948,-6.8640673)[amenity];relation(around:5000,33.9539948,-6.8640673)[amenity];);out center;

// https://www.mapbox.com/contribute/#/?owner=mapbox&id=streets-v9&access_token=pk.eyJ1IjoieWV4dCIsImEiOiJqNzVybUhnIn0.hTOO5A1yqfpN42-_z_GuLw&utm_source=https%3A%2F%2Fwww.tesco.com%2F&utm_medium=attribution_link&utm_campaign=referrer&q=&l=14%2F33.954%2F-6.8641