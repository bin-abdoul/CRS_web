import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useGetMessagesQuery } from "@/api/requests/services.request";
import "leaflet/dist/leaflet.css";

// Fix marker icon paths for some environments
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export function MessageMap() {
  const { data, isLoading, error } = useGetMessagesQuery("");

  if (isLoading) return <p>Loading map...</p>;
  if (error) return <p>Failed to load map data</p>;

  const messagesWithCoordinates = data?.filter(
    (msg) =>
      typeof msg.lat === "number" &&
      typeof msg.lng === "number" &&
      !isNaN(msg.lat) &&
      !isNaN(msg.lng)
  );

  const defaultCenter = [10.5, 7.4]; // Nigeria or default region

  return (
    <MapContainer
      center={defaultCenter as [number, number]}
      zoom={7}
      className={`w-[100%] h-[100%]  z-10`}
    //   style={{ height: "700px", width: "100%", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {messagesWithCoordinates?.map((msg) => (
        <Marker
          key={msg._id.toString()}
          position={[msg.lat!, msg.lng!] as [number, number]}
        >
          <Popup>
            <strong>{msg.issueType}</strong> in {msg.location}
            <br />
            <em>{msg.translatedText}</em>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
