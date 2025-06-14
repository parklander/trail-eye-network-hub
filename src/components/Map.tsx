
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Camera } from "lucide-react";

// Deployments in Canadian Prairies region (centered around current DEFAULT_CENTER)
const DEPLOYMENTS = [
  {
    id: 1,
    name: "Prairie South Cam",
    coords: [-99.3, 49.5],
  },
  {
    id: 2,
    name: "River Bend",
    coords: [-99.7, 49.8],
  },
  {
    id: 3,
    name: "North Ridge Forest",
    coords: [-99.6, 49.85],
  },
];

// We'll use the Lucide Camera icon as the marker.
function createCameraMarker(deployment: { id: number; name: string }) {
  // Create a div to render the React component into, as Mapbox markers require DOM nodes.
  const el = document.createElement("div");
  el.style.display = "flex";
  el.style.justifyContent = "center";
  el.style.alignItems = "center";
  el.style.width = "36px";
  el.style.height = "36px";
  el.style.background =
    "linear-gradient(135deg, rgba(34,197,94,0.7) 0%, rgba(21,128,61,0.75) 100%)";
  el.style.borderRadius = "9999px";
  el.style.boxShadow = "0 1px 8px 0 rgba(34,197,94,0.1)";
  el.style.cursor = "pointer";
  el.title = deployment.name;

  // Place the SVG icon inside the div
  el.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 19V7a2 2 0 0 0-2-2h-2.382a2 2 0 0 1-1.789-1.106l-.447-.894a2 2 0 0 0-1.789-1.106h-2.386a2 2 0 0 0-1.789 1.106l-.447.894A2 2 0 0 1 5.382 5H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"></path><circle cx="12" cy="13" r="3"></circle></svg>`;

  return el;
}

const DEFAULT_CENTER: [number, number] = [-99.5, 49.7];

const Map: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!accessToken || !mapContainer.current) return;

    mapboxgl.accessToken = accessToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      projection: "mercator",
      zoom: 9,
      center: DEFAULT_CENTER,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      "top-right"
    );

    map.current.scrollZoom.disable();

    map.current.on("style.load", () => {
      map.current?.setFog({
        color: "rgb(255, 255, 255)",
        "high-color": "rgb(200, 200, 225)",
        "horizon-blend": 0.2,
      } as any);
    });

    // Add camera deployment markers
    DEPLOYMENTS.forEach((deployment) => {
      const el = createCameraMarker(deployment);
      const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
        .setLngLat(deployment.coords as [number, number])
        .addTo(map.current!);

      el.addEventListener("mouseenter", () => {
        const canvas = map.current && map.current.getCanvas();
        if (canvas) canvas.style.cursor = "pointer";
      });
      el.addEventListener("mouseleave", () => {
        const canvas = map.current && map.current.getCanvas();
        if (canvas) canvas.style.cursor = "";
      });
      // Optionally, show a popup on click
      el.addEventListener("click", () => {
        new mapboxgl.Popup({ offset: 18 })
          .setLngLat(deployment.coords as [number, number])
          .setHTML(
            `<div style="font-weight:bold;">${deployment.name}</div>`
          )
          .addTo(map.current!);
      });
    });

    // Clean up
    return () => {
      map.current?.remove();
    };
  }, [accessToken]);

  return (
    <div className="relative w-full h-96 md:h-[500px] mt-4 rounded-lg overflow-hidden shadow">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;
