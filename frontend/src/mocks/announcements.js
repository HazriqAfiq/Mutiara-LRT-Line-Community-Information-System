/**
 * mocks/announcements.js
 *
 * Construction announcements for the Penang LRT Mutiara Line.
 * Matched with the official platform reference design.
 */

export const MOCK_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Station Construction Progress at Bayan Lepas',
    description:
      'Construction works for the proposed station at Bayan Lepas are progressing well, with foundation piling and pier works underway. Traffic management measures are in place to ensure pedestrian and commuter safety.',
    category: 'Construction Progress',
    location: 'Bayan Lepas, Penang',
    start_date: '2024-12-12',
    end_date: '2025-06-30',
    status: 'published',
    created_at: '2024-12-12T09:00:00+08:00',
    updated_at: '2024-12-12T09:00:00+08:00',
    image_url: '/images/construction_viaduct.jpg',
  },
  {
    id: 2,
    title: 'Elevated Guideway Works Continue Along Tun Dr. Lim Chong Eu Expressway',
    description:
      'Elevated guideway construction is ongoing with minimal disruption to traffic. Works are expected to continue through the upcoming quarter with regular structural monitoring.',
    category: 'General Update',
    location: 'Gelugor, Penang',
    start_date: '2024-12-10',
    end_date: '2025-05-15',
    status: 'published',
    created_at: '2024-12-10T10:00:00+08:00',
    updated_at: '2024-12-10T10:00:00+08:00',
    image_url: '/images/hero_lrt.jpg',
  },
  {
    id: 3,
    title: 'Utility Relocation Works at Macallum Area',
    description:
      'Utility relocation works will be carried out along Jalan Macallum starting next week to prepare the corridor for structural viaduct columns. Access to local premises is maintained.',
    category: 'Public Notice',
    location: 'Macallum, Penang',
    start_date: '2024-12-08',
    end_date: '2025-01-20',
    status: 'published',
    created_at: '2024-12-08T08:30:00+08:00',
    updated_at: '2024-12-08T08:30:00+08:00',
    image_url: '/images/traffic_detour.jpg',
  },
  {
    id: 4,
    title: 'Safety Perimeter Established at Komtar Viaduct Works',
    description:
      'A safety perimeter has been established around the viaduct construction zone near the Komtar area. Members of the public are reminded not to enter the hoarded construction zone.',
    category: 'Safety Advisory',
    location: 'Komtar, Jalan Dr Lim Chwee Leong, George Town',
    start_date: '2024-12-01',
    end_date: '2025-03-31',
    status: 'published',
    created_at: '2024-12-01T14:00:00+08:00',
    updated_at: '2024-12-01T14:00:00+08:00',
    image_url: '/images/station_design.jpg',
  },
];
