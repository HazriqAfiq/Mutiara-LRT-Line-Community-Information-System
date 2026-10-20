/**
 * mocks/users.js
 *
 * Demo user accounts for Part A simulation.
 * Passwords here are DEMO ONLY and NOT real credentials.
 * In Part B, Laravel Sanctum handles real authentication.
 *
 * NEVER store real passwords in frontend code.
 */

export const MOCK_USERS = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@demo.test',
    password: 'Demo12345!',   // Demo only — not real security
    role: 'admin',
    phone: '+60 11-1234 5678',
    address: 'Penang LRT Project Office, George Town, Penang',
    is_active: true,
    created_at: '2026-01-10T08:00:00+08:00',
    updated_at: '2026-10-01T09:00:00+08:00',
  },
  {
    id: 2,
    name: 'Ahmad Rahman',
    email: 'user@demo.test',
    password: 'Demo12345!',   // Demo only — not real security
    role: 'user',
    phone: '0123456789',
    address: '12 Jalan Utama, George Town, 10200 Penang',
    is_active: true,
    created_at: '2026-10-01T10:00:00+08:00',
    updated_at: '2026-10-01T10:00:00+08:00',
  },
  {
    id: 3,
    name: 'Siti Norzahira',
    email: 'siti@demo.test',
    password: 'demo1234',
    role: 'user',
    phone: '+60 16-5678 9012',
    address: '34 Lorong Batu Lanchang, Bayan Baru, 11950 Penang',
    is_active: true,
    created_at: '2026-04-22T11:00:00+08:00',
    updated_at: '2026-10-05T08:30:00+08:00',
  },
  {
    id: 4,
    name: 'Raj Kumar',
    email: 'raj@demo.test',
    password: 'demo1234',
    role: 'user',
    phone: '+60 14-7890 1234',
    address: '7 Jalan Masjid Negeri, Air Itam, 11500 Penang',
    is_active: false,
    created_at: '2026-05-10T09:15:00+08:00',
    updated_at: '2026-08-18T16:45:00+08:00',
  },
];
