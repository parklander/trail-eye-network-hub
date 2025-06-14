
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const DEFAULT_CENTER: [number, number] = [-99.5, 49.6];

const Map: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!accessToken || !mapContainer.current) return;

    mapboxgl.accessToken = accessToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      projection: "globe",
      zoom: 11,
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
