/**
 * mocks/roadClosures.js
 *
 * Road closure and traffic advisory notices matching the reference design.
 */

export const MOCK_ROAD_CLOSURES = [
  {
    id: 1,
    title: 'Jalan Sultan Azlan Shah',
    road_name: 'Jalan Sultan Azlan Shah',
    location: 'Bayan Lepas, Penang',
    latitude: 5.305,
    longitude: 100.278,
    description:
      'Partial lane closure due to utility relocation works for station construction.',
    start_date: '2024-12-10',
    end_date: '2025-01-31',
    alternative_route: 'Use parallel coastal expressway service road.',
    pedestrian_access: 'Designated pedestrian crossing remains operational.',
    status: 'active',
    created_at: '2024-12-10T10:00:00+08:00',
    updated_at: '2024-12-10T10:00:00+08:00',
  },
  {
    id: 2,
    title: 'Jalan Masjid Negeri',
    road_name: 'Jalan Masjid Negeri',
    location: 'Georgetown, Penang',
    latitude: 5.402,
    longitude: 100.303,
    description:
      'Temporary lane closure for guideway construction works.',
    start_date: '2024-12-15',
    end_date: '2025-02-28',
    alternative_route: 'Motorists advised to divert via Jalan Air Itam or Jalan Scotland.',
    pedestrian_access: 'Barricaded walkway with safety marshals on site.',
    status: 'scheduled',
    created_at: '2024-12-10T12:00:00+08:00',
    updated_at: '2024-12-10T12:00:00+08:00',
  },
  {
    id: 3,
    title: 'Jalan Tun Dr. Lim Chong Eu',
    road_name: 'Jalan Tun Dr. Lim Chong Eu',
    location: 'Gelugor, Penang',
    latitude: 5.362,
    longitude: 100.311,
    description:
      'Road works completed. All lanes are now open to traffic.',
    start_date: '2024-11-01',
    end_date: '2024-12-10',
    alternative_route: 'All lanes fully open with normal traffic flow restored.',
    pedestrian_access: 'Footpaths and pedestrian overhead bridges fully accessible.',
    status: 'completed',
    created_at: '2024-11-01T08:00:00+08:00',
    updated_at: '2024-12-10T18:00:00+08:00',
  },
];
