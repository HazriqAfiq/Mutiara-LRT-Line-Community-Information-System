/**
 * mocks/roadClosures.js
 *
 * Fictional road closure and traffic advisory notices.
 * Academic simulation only — not affiliated with any real authority.
 */

export const MOCK_ROAD_CLOSURES = [
  {
    id: 1,
    title: 'Partial Closure – Jalan Penang (Lebuh Chulia to Lebuh Kimberley)',
    road_name: 'Jalan Penang',
    location: 'Between Lebuh Chulia and Lebuh Kimberley, George Town',
    description:
      'Jalan Penang is partially closed in the northbound direction to allow for underground utility relocation works in preparation for the Mutiara Line tunnel. One lane in each direction will remain open. Access to shophouses and businesses along this stretch will be maintained at all times. Deliveries should be arranged before 9:00 AM.',
    start_date: '2026-10-25',
    end_date: '2026-12-05',
    alternative_route:
      'Use Jalan Magazine (parallel road to the west) or Jalan Macalister as alternative routes northbound. Motorists heading south may use Jalan Burma.',
    pedestrian_access:
      'Pedestrian walkway remains open on the eastern footpath. A temporary covered walkway has been installed from Lebuh Chulia to Lebuh Kimberley.',
    status: 'scheduled',
    created_at: '2026-10-14T10:00:00+08:00',
    updated_at: '2026-10-14T10:00:00+08:00',
  },
  {
    id: 2,
    title: 'Full Closure – Jalan Dr Lim Chwee Leong (Near Komtar)',
    road_name: 'Jalan Dr Lim Chwee Leong',
    location: 'Komtar area, George Town',
    description:
      'Jalan Dr Lim Chwee Leong is fully closed between the Komtar roundabout and Penang Street to allow for viaduct column foundation works. This closure affects access to the Komtar bus terminal. Bus services will be temporarily rerouted to Jalan Magazine and Jalan Ria. Construction is expected to last until March 2027.',
    start_date: '2026-10-18',
    end_date: '2027-03-31',
    alternative_route:
      'Vehicles should use Jalan Magazine and turn onto Jalan Ria to reach Komtar. A temporary bus drop-off zone has been established at Jalan Ria.',
    pedestrian_access:
      'Pedestrians must use the designated crossing at Jalan Magazine. The pedestrian route is clearly signposted. Access to Komtar shopping mall from Jalan Penang remains open.',
    status: 'active',
    created_at: '2026-10-16T14:00:00+08:00',
    updated_at: '2026-10-18T07:00:00+08:00',
  },
  {
    id: 3,
    title: 'Lane Restriction – Gurney Drive (Tunnel Boring Zone)',
    road_name: 'Gurney Drive',
    location: 'Gurney Drive between Jalan Kelawei and Jalan Kelawai flyover',
    description:
      'The outermost lane of Gurney Drive (both directions) is closed to facilitate ground monitoring and tunnel boring operations. This restriction is in effect 24 hours a day. Speed limits in the affected area have been reduced to 30 km/h. Electronic traffic signs are in place. The restriction is expected to remain until tunnel boring is completed.',
    start_date: '2026-11-10',
    end_date: '2027-01-31',
    alternative_route:
      'For longer-distance travel, motorists are advised to use the Gurney Paragon underpass or Jalan Burma to avoid the affected stretch during peak hours.',
    pedestrian_access:
      'The Gurney Drive promenade footpath is temporarily closed. Pedestrians should use the footpath on the inland side of the road.',
    status: 'scheduled',
    created_at: '2026-10-18T11:00:00+08:00',
    updated_at: '2026-10-18T11:00:00+08:00',
  },
  {
    id: 4,
    title: 'Temporary Closure – Jalan Jelutong (Near Station Site)',
    road_name: 'Jalan Jelutong',
    location: 'Near Jelutong Market, Jelutong',
    description:
      'Jalan Jelutong is temporarily closed adjacent to the Jelutong Station construction site to allow for piling works and hoardings installation. The closure affects the section between Lorong Jelutong 1 and Jalan Todak. Local traffic will be diverted. The closure was completed ahead of schedule.',
    start_date: '2026-09-01',
    end_date: '2026-10-10',
    alternative_route:
      'Motorists used Jalan Dato Keramat and Jalan Anson as alternative routes during the closure period.',
    pedestrian_access:
      'Pedestrian access was fully maintained throughout the closure via a temporary raised platform on the western side.',
    status: 'completed',
    created_at: '2026-08-25T09:00:00+08:00',
    updated_at: '2026-10-10T17:00:00+08:00',
  },
  {
    id: 5,
    title: 'Partial Closure – Jalan Utama (Bayan Baru Station Approach)',
    road_name: 'Jalan Utama',
    location: 'Bayan Baru, near Sunway Carnival Mall',
    description:
      'Jalan Utama is partially closed in the area fronting the proposed Bayan Baru Station site. Works include the installation of sheet piles for temporary earth retention. The right lane heading northbound will be closed. Traffic management personnel will be on duty during peak hours from 7:00 AM to 9:00 AM and 5:00 PM to 8:00 PM.',
    start_date: '2026-10-28',
    end_date: '2027-02-28',
    alternative_route:
      'Northbound traffic can use Jalan Tengah as an alternative. Access to Sunway Carnival Mall car park is maintained via Jalan Tengah only.',
    pedestrian_access:
      'A temporary pedestrian footbridge is under construction. Until completed, pedestrians should use the traffic-controlled crossing point at the Jalan Tengah junction.',
    status: 'scheduled',
    created_at: '2026-10-19T13:00:00+08:00',
    updated_at: '2026-10-19T13:00:00+08:00',
  },
  {
    id: 6,
    title: 'Lane Restriction – Jalan Sultan Azlan Shah (Airport Link)',
    road_name: 'Jalan Sultan Azlan Shah',
    location: 'Near Bayan Lepas Industrial Zone, approaching Penang Airport',
    description:
      'One lane of Jalan Sultan Azlan Shah is closed in each direction due to utility diversion works connecting the Bayan Lepas Station to the airport interchange. Works include high-voltage cable installation and stormwater drain upgrades. The restriction is expected to cause minor delays during morning and evening peak hours.',
    start_date: '2026-10-15',
    end_date: '2026-12-31',
    alternative_route:
      'For airport-bound traffic, Jalan Tun Dr Awang provides an alternative route via Bayan Lepas town centre. Taxis and e-hailing vehicles should follow designated drop-off signage.',
    pedestrian_access:
      'Existing pedestrian walkways remain intact. Additional reflective safety markers have been installed for night visibility.',
    status: 'active',
    created_at: '2026-10-12T10:00:00+08:00',
    updated_at: '2026-10-15T08:00:00+08:00',
  },
];
