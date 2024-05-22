import { GrMapLocation } from "react-icons/gr";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.icon({
  iconUrl: "https://i.ibb.co/41CDQmy/3448653-removebg-preview.png",
  iconSize: [30, 40],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

const OurLocation = () => {
  const latitude = 23.7946;
  const longitude = 90.4041;

  const location = "Banani, Dhaka";

  return (
    <section className="my-6">
      <div>
        <div className="flex justify-between px-6 font-bold text-xl my-4 dark:text-gray-600">
          <h3>Our Location</h3>
          <p className="flex items-center gap-1">
            <GrMapLocation />
            {location}
          </p>
        </div>
        <div className="map-container flex justify-center">
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            className="h-[30vh] md:h-[60vh] w-3/4 md:w-2/3 lg:w-1/2 xl:w-[40%] rounded-2xl relative"
          >
            <div className="map-wrapper z-[1] relative">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[latitude, longitude]} icon={customIcon}>
                <Popup>{location}</Popup>
              </Marker>
            </div>
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default OurLocation;
