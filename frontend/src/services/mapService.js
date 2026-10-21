/**
 * services/mapService.js
 *
 * Dedicated service layer providing geographic data for the Penang LRT
 * Mutiara Line interactive construction & traffic information map.
 *
 * Part A (Current):
 *   - Serves verified station coordinates, gazetted alignment polyline, and
 *     active construction zones from mocks/mapLocations.
 *   - Integrates live road closure records via the shared roadClosureService.
 *
 * Part B (Future Laravel Integration):
 *   - Seamlessly switch these functions to Axios endpoints:
 *     GET /api/stations
 *     GET /api/construction-zones
 *     GET /api/map/locations
 *     GET /api/road-closures (already wired through roadClosureService)
 */
import {
  MOCK_STATIONS,
  MOCK_CONSTRUCTION_ZONES,
  MUTIARA_LINE_POLYLINE,
} from '../mocks/mapLocations';
import { getRoadClosures } from './roadClosureService';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch all planned and gazetted stations along the LRT Mutiara Line.
 * @returns {Promise<{ data: Array }>}
 */
export async function getStations() {
  await delay(180);
  return {
    data: MOCK_STATIONS.map((station) => ({
      ...station,
      type: 'station',
    })),
  };
}

/**
 * Fetch active and scheduled construction zones along the rail alignment.
 * @returns {Promise<{ data: Array }>}
 */
export async function getConstructionZones() {
  await delay(180);
  return {
    data: MOCK_CONSTRUCTION_ZONES.map((zone) => ({
      ...zone,
      type: 'construction_zone',
    })),
  };
}

/**
 * Fetch road closure markers directly from the existing roadClosureService.
 * Excludes records without valid coordinates to preserve backward compatibility.
 *
 * @returns {Promise<{ data: Array }>}
 */
export async function getRoadClosureMarkers() {
  const response = await getRoadClosures();
  const rawList = response?.data || [];

  // Filter only records that have valid numeric geographic coordinates
  const validClosures = rawList
    .filter((closure) => {
      const lat = Number(closure.latitude);
      const lng = Number(closure.longitude);
      return (
        closure.latitude !== undefined &&
        closure.longitude !== undefined &&
        !isNaN(lat) &&
        !isNaN(lng) &&
        lat !== 0 &&
        lng !== 0
      );
    })
    .map((closure) => ({
      id: `rc-${closure.id}`,
      road_closure_id: closure.id,
      type: 'road_closure',
      name: closure.title || closure.road_name,
      road_name: closure.road_name,
      location: closure.location,
      latitude: Number(closure.latitude),
      longitude: Number(closure.longitude),
      description: closure.description,
      start_date: closure.start_date,
      end_date: closure.end_date,
      status: closure.status,
      alternative_route: closure.alternative_route,
      pedestrian_access: closure.pedestrian_access,
    }));

  return { data: validClosures };
}

/**
 * Fetch all combined map locations across Stations, Construction Zones, and Road Closures.
 * @returns {Promise<{ data: Array }>}
 */
export async function getMapLocations() {
  const [stationsRes, constructionRes, closuresRes] = await Promise.all([
    getStations(),
    getConstructionZones(),
    getRoadClosureMarkers(),
  ]);

  return {
    data: [
      ...stationsRes.data,
      ...constructionRes.data,
      ...closuresRes.data,
    ],
  };
}

/**
 * Fetch the gazetted LRT Mutiara Line polyline path coordinates.
 * @returns {Promise<{ data: Array<[number, number]> }>}
 */
export async function getRoutePolyline() {
  await delay(100);
  return {
    data: MUTIARA_LINE_POLYLINE,
  };
}
