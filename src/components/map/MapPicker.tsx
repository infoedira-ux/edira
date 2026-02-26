"use client";

import React, { useEffect, useRef, useState } from "react";

interface MapPickerProps {
  latitude?: number | null;
  longitude?: number | null;
  city?: string;
  onChange: (lat: number, lng: number) => void;
}

const CITY_CENTERS: Record<string, [number, number]> = {
  Nairobi: [-1.2921, 36.8219],
  Mombasa: [-4.0435, 39.6682],
  Kisumu: [-0.0917, 34.7679],
  Nakuru: [-0.3031, 36.0800],
};

export default function MapPicker({ latitude, longitude, city, onChange }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [instructions, setInstructions] = useState(true);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const init = async () => {
      const L = (await import("leaflet")).default;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const center: [number, number] =
        latitude && longitude
          ? [latitude, longitude]
          : CITY_CENTERS[city ?? ""] ?? [-1.2921, 36.8219];

      const map = L.map(mapRef.current!, {
        center,
        zoom: latitude && longitude ? 15 : 13,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '© <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom pin icon
      const pinIcon = L.divIcon({
        className: "",
        html: `
          <div style="
            width: 32px; height: 32px;
            background: linear-gradient(135deg,#D4A843,#A87E28);
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          "></div>
        `,
        iconAnchor: [16, 32],
      });

      // Place marker if coords already exist
      if (latitude && longitude) {
        markerRef.current = L.marker([latitude, longitude], { icon: pinIcon, draggable: true }).addTo(map);
        markerRef.current.on("dragend", () => {
          const pos = markerRef.current.getLatLng();
          onChange(pos.lat, pos.lng);
        });
        setInstructions(false);
      }

      // Click to place / move marker
      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng], { icon: pinIcon, draggable: true }).addTo(map);
          markerRef.current.on("dragend", () => {
            const pos = markerRef.current.getLatLng();
            onChange(pos.lat, pos.lng);
          });
        }
        onChange(lat, lng);
        setInstructions(false);
      });

      mapInstanceRef.current = map;
    };

    init();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Re-center when city changes
  useEffect(() => {
    if (!mapInstanceRef.current || !city) return;
    const center = CITY_CENTERS[city];
    if (center) mapInstanceRef.current.setView(center, 13);
  }, [city]);

  return (
    <div style={{ position: "relative" }}>
      <div ref={mapRef} style={{ width: "100%", height: 280, borderRadius: 12, overflow: "hidden", border: "1.5px solid rgba(255,255,255,0.08)" }} />

      {instructions && (
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          background: "rgba(10,14,26,0.85)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(212,168,67,0.3)",
          borderRadius: 12, padding: "14px 20px",
          fontSize: 13, color: "white", textAlign: "center",
          pointerEvents: "none", whiteSpace: "nowrap",
        }}>
          📍 Click on the map to pin your property location
        </div>
      )}

      <style>{`
        .leaflet-container { background: #0A0E1A !important; }
      `}</style>
    </div>
  );
}