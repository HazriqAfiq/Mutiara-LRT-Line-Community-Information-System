# Design Direction: Penang LRT Mutiara Line Community Information System

> **Dial**: ENERGY 1 / RHYTHM 2 / MOTION 1  
> **Antislop Profile**: Civic Transit Information Portal & Community Feedback System

---

## 1. Identity & Mood
- **Context**: Official public infrastructure and civic community engagement portal for the Penang LRT Mutiara Line (MRT Corp / Penang State Government simulation).
- **Mood**: Authoritative, trustworthy, transparent, civic-minded, and accessible to a wide demographic (commuters, local residents, business owners, and municipal administrators).
- **Character**: Clear legibility over decorative excess. Clean information architecture without generic SaaS clichés, fake terminal windows, or floating glassmorphic noise.

---

## 2. Color Palette & Roles

Defined around the official Penang maritime and infrastructure tones:

| Token | Hex | Role | Rationale |
| :--- | :--- | :--- | :--- |
| **Navy (Primary)** | `#12375B` | Primary headers, navigation bar, primary buttons | Conveys institutional stability, transit authority identity, and high-contrast structural anchor. |
| **Teal (Secondary)** | `#16A6A1` | Secondary accents, progress indicators, station markers | Reflects Penang's coastal island identity and LRT line branding. |
| **Amber (Accent)** | `#F4B942` | Notice alerts, road closure flags, actionable highlights | High visibility caution accent for detour advisories and construction notices. |
| **Background** | `#F5F7FA` | Application page background | Soft, cool civic grey that reduces glare compared to pure white `#FFFFFF`. |
| **Surface** | `#FFFFFF` | Cards, modals, data tables | Crisp container surfaces for readability and clear visual containment. |
| **Text Primary** | `#1F2937` | Body copy, headers | High-contrast neutral ensuring WCAG AA / AAA compliance against light backgrounds. |
| **Text Muted** | `#4B5563` | Subtitles, helper text, timestamps | Meets 4.5:1 minimum contrast ratio against `#FFFFFF` / `#F5F7FA`. |

### Status Colors
- **Success (`#10B981`)**: Resolved complaints, active stations.
- **Warning (`#F59E0B`)**: Under investigation, scheduled diversions.
- **Error (`#EF4444`)**: Emergency alerts, urgent road closures, rejected items.
- **Info (`#3B82F6`)**: Informational notices, route guidance.

---

## 3. Typography
- **Primary Typeface**: `Inter`, system-ui, -apple-system, BlinkMacSystemFont, sans-serif.
- **Rationale**: Clean, neutral, high-legibility geometric sans-serif suitable for multilingual civic interfaces, tabular transit data, and accessibility across diverse devices.
- **Hierarchy**:
  - H1: Bold, tight letter spacing, maximum 2.25rem on desktop.
  - H2: Semi-bold, 1.5rem to 1.75rem.
  - Body: 1rem (16px base) with 1.5 line height for comfortable reading.
  - Meta/Caption: 0.875rem (14px) with high contrast. No micro-text below 12px.

---

## 4. Layout & Spacing
- **Container Structure**: Centered max-width containers (`max-w-7xl` for dashboards/catalogs, `max-w-4xl` for single-column detail/forms).
- **Rhythm**:
  - Section break: 48px to 64px on desktop, 32px on mobile.
  - Component padding: 24px internal card padding.
  - Form input heights: Minimum 44px tap targets for mobile usability.
- **Elevation & Radius**:
  - Radius: Consistent `8px` (`--radius-md`) for buttons, inputs, and cards. No full-page pill shapes.
  - Shadows: Subtle, functional elevations (`--shadow-sm` and `--shadow-md`) to distinguish cards and overlays without floating-island syndrome.

---

## 5. Antislop Dials
- **ENERGY: 1 (Calm & Civic)**:
  - Focused on public service transparency and institutional clarity.
  - Avoids marketing buzzwords, flashy gradients, and neon orbs.
- **RHYTHM: 2 (Structured with Contextual Breaks)**:
  - Distinct layouts tailored to content: structured timetable/status boards for notices, map/route cards for road closures, and data grids for complaint management.
- **MOTION: 1 (Functional & Minimal)**:
  - Fast, purpose-driven transitions (150ms to 200ms ease-out) for dropdowns, modals, and tabs.
  - No auto-playing floating animations, bounce loops, or slow fade-ins.
