/**
 * mocks/responses.js
 *
 * Admin responses to community feedback complaints.
 * Each response links to a feedback_id from feedback.js.
 */

export const MOCK_RESPONSES = [
  {
    id: 1,
    feedback_id: 1,
    admin_id: 1,
    admin_name: 'Admin User',
    message:
      'Thank you for your report. We have reviewed the construction schedule for the George Town Station site. Noise-intensive works such as pile driving are scheduled between 9:00 AM and 5:00 PM on weekdays. We have reminded the contractor to adhere strictly to approved working hours. If excessive noise continues outside approved hours, please contact our hotline at 1800-88-5678.',
    created_at: '2026-10-17T14:30:00+08:00',
  },
  {
    id: 2,
    feedback_id: 3,
    admin_id: 1,
    admin_name: 'Admin User',
    message:
      'Thank you for raising this concern about pedestrian access near Komtar. We have inspected the site and confirmed that the temporary pedestrian walkway signage requires improvement. Additional directional signs will be installed by end of this week. A safety marshal will be stationed at the crossing point during morning and evening peak hours.',
    created_at: '2026-10-19T10:15:00+08:00',
  },
  {
    id: 3,
    feedback_id: 5,
    admin_id: 1,
    admin_name: 'Admin User',
    message:
      'We have received your complaint regarding traffic congestion at Jalan Utama. The traffic management plan for this section has been reviewed with the contractor. Additional traffic cones and a traffic marshal will be deployed during the morning peak period. The traffic management plan will be updated and shared with MPPP.',
    created_at: '2026-10-18T16:00:00+08:00',
  },
  {
    id: 4,
    feedback_id: 7,
    admin_id: 1,
    admin_name: 'Admin User',
    message:
      'Thank you for contacting us regarding access to your business premises. We have arranged for a dedicated loading and unloading bay on Jalan Tengah which will be available from 6:00 AM to 10:00 AM daily. Our on-site coordinator will contact you directly within two working days to discuss your specific access requirements.',
    created_at: '2026-10-15T11:00:00+08:00',
  },
];
