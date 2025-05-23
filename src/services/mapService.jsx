// services/mapService.js
export const fetchLocationAndZones = async (searchText) => {
  if (!searchText) return null;

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`
    );
    const data = await response.json();

    if (!data || data.length === 0) {
      return { position: null, zones: [] };
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    const center = [lat, lon];

    // توليد مناطق حول الإحداثيات
    const zones = [
      { name: "Danger Zone", position: [lat + 0.01, lon + 0.01], level: "high" },
      { name: "Suspected Mine Area", position: [lat - 0.008, lon + 0.005], level: "medium" },
      { name: "Historical Zone", position: [lat + 0.015, lon - 0.009], level: "low" },
      { name: "Safe Zone", position: [lat - 0.01, lon - 0.01], level: "safe" },
    ];

    return { position: center, zones };
  } catch (error) {
    console.error("Failed to fetch location:", error);
    return { position: null, zones: [] };
  }
};
