/**
 * mocks/announcements.js
 *
 * Fictional construction announcements for the Penang LRT Mutiara Line.
 * This is academic simulation data only. Not affiliated with the real project.
 *
 * Fields match the Laravel API response format planned for Part B.
 */

export const MOCK_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Phase 1 Construction Begins at George Town Station',
    description:
      'Construction works for the Mutiara Line Phase 1 will commence at the George Town Station site. Residents and commuters in the surrounding areas are advised that construction activities, including ground clearing, pile driving and site hoarding installation, will begin from 20 October 2026. Works will be conducted between 7:00 AM and 10:00 PM on weekdays and 8:00 AM to 6:00 PM on weekends.',
    category: 'Construction Progress',
    location: 'George Town Station, Lebuh Farquhar, George Town',
    start_date: '2026-10-20',
    end_date: '2027-06-30',
    status: 'published',
    created_at: '2026-10-10T09:00:00+08:00',
    updated_at: '2026-10-12T11:30:00+08:00',
  },
  {
    id: 2,
    title: 'Temporary Road Closure Notice – Jalan Penang',
    description:
      'A section of Jalan Penang between Lebuh Chulia and Lebuh Kimberley will be temporarily closed to facilitate underground utility relocation works. The closure is expected to last six weeks. Motorists are advised to use Jalan Magazine as an alternative route. Pedestrian access will be maintained via a dedicated walkway on the eastern side of the road.',
    category: 'Public Notice',
    location: 'Jalan Penang, George Town',
    start_date: '2026-10-25',
    end_date: '2026-12-05',
    status: 'published',
    created_at: '2026-10-14T10:00:00+08:00',
    updated_at: '2026-10-14T10:00:00+08:00',
  },
  {
    id: 3,
    title: 'Public Briefing Session – Bayan Lepas Station Design',
    description:
      'The project team invites residents and business owners in the Bayan Lepas area to attend a public briefing session on the proposed station design and construction schedule. The session will include a presentation of the architectural design, traffic management plan, and a question and answer period. Registration is not required.',
    category: 'General Update',
    location: 'Bayan Lepas Community Hall, Jalan Dato Ismail Hashim',
    start_date: '2026-11-05',
    end_date: '2026-11-05',
    status: 'published',
    created_at: '2026-10-15T08:30:00+08:00',
    updated_at: '2026-10-16T09:00:00+08:00',
  },
  {
    id: 4,
    title: 'Safety Perimeter Established at Komtar Viaduct Works',
    description:
      'A safety perimeter has been established around the viaduct construction zone near the Komtar area. Members of the public are reminded not to enter the hoarded construction zone. Warning signs and safety barriers are in place. Any safety concerns should be reported to the project hotline at 1800-88-5678.',
    category: 'Safety Advisory',
    location: 'Komtar, Jalan Dr Lim Chwee Leong, George Town',
    start_date: '2026-10-18',
    end_date: '2027-03-31',
    status: 'published',
    created_at: '2026-10-16T14:00:00+08:00',
    updated_at: '2026-10-17T08:00:00+08:00',
  },
  {
    id: 5,
    title: 'Night Works Approval – Gurney Drive Tunnel Section',
    description:
      'The project team has received approval to conduct night construction works for the tunnel boring segment beneath Gurney Drive. Night works will be carried out between 11:00 PM and 5:00 AM to minimise traffic disruption. Nearby residents may experience increased noise levels during this period. Affected households will receive notification letters.',
    category: 'Construction Progress',
    location: 'Gurney Drive, Georgetown',
    start_date: '2026-11-10',
    end_date: '2027-01-31',
    status: 'published',
    created_at: '2026-10-18T11:00:00+08:00',
    updated_at: '2026-10-18T11:00:00+08:00',
  },
  {
    id: 6,
    title: 'Pedestrian Underpass Construction – Jelutong Expressway',
    description:
      'Construction of a dedicated pedestrian underpass connecting both sides of the Jelutong Expressway near the Jelutong Station site will begin next month. The underpass is designed to ensure safe pedestrian crossing throughout the construction period. Existing pedestrian crossings at this location will be temporarily closed. Temporary crossings will be clearly signposted.',
    category: 'Public Notice',
    location: 'Jelutong Expressway, Jelutong',
    start_date: '2026-11-01',
    end_date: '2027-04-30',
    status: 'published',
    created_at: '2026-10-17T09:30:00+08:00',
    updated_at: '2026-10-19T10:00:00+08:00',
  },
  {
    id: 7,
    title: 'Monthly Construction Progress Report – September 2026',
    description:
      'The September 2026 monthly construction progress report has been published. Key highlights include completion of geotechnical surveys at six station sites, award of the civil works contract for the northern viaduct section, and finalisation of the utility relocation programme. The project remains on schedule for the first phase of construction.',
    category: 'General Update',
    location: 'All Construction Zones, Penang',
    start_date: '2026-10-01',
    end_date: null,
    status: 'published',
    created_at: '2026-10-05T08:00:00+08:00',
    updated_at: '2026-10-05T08:00:00+08:00',
  },
  {
    id: 8,
    title: 'Proposed Station Name Public Consultation',
    description:
      'The public is invited to provide feedback on the proposed names for three new stations along the Mutiara Line: the station near Penang Hill, the station at the Free Trade Zone, and the station near Queensbay Mall. A dedicated feedback form is available at the project office and online. Consultation closes 30 November 2026.',
    category: 'General Update',
    location: 'Project-wide',
    start_date: '2026-10-20',
    end_date: '2026-11-30',
    status: 'draft',
    created_at: '2026-10-19T16:00:00+08:00',
    updated_at: '2026-10-19T16:00:00+08:00',
  },
];
