# UniRide — Campus Transport Booking System

A full-stack Next.js + Firebase web app for university students to book campus transport, view available drivers, and manage rides.

## Features

- **Home** — landing page with live stats
- **Book a Ride** — 4-step flow: Route → Driver → Your Info → Confirm → Success
- **Drivers** — real-time driver listing with availability filter
- **Schedule** — expandable route timetables with stop-by-stop breakdown
- **My Bookings** — search by email, view status, cancel confirmed rides

---

## Quick Start (demo mode — no Firebase needed)

```bash
npm install
npm run dev
# Open http://localhost:3000
```

The app runs fully on mock data. Firebase is only needed to persist real bookings.

---

## Project Structure

```
uniride/
├── app/
│   ├── page.tsx              # Home
│   ├── book/page.tsx         # 4-step booking flow
│   ├── drivers/page.tsx      # Driver availability
│   ├── schedule/page.tsx     # Route timetables
│   ├── my-bookings/page.tsx  # Booking history
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Design tokens + styles
├── components/
│   ├── Navbar.tsx
│   ├── DriverCard.tsx
│   └── RouteCard.tsx
├── lib/
│   ├── firebase.ts           # Firebase init
│   ├── mockData.ts           # Demo drivers & routes
│   ├── bookingService.ts     # Firestore CRUD
│   └── types.ts              # TypeScript interfaces
├── .env.example              # Firebase config template
└── .env.local                # Local config (demo values pre-filled)
```

---

## Firebase Setup

### 1. Create project
Go to [console.firebase.google.com](https://console.firebase.google.com) → Add project → name it `uniride`.

### 2. Add Web App
Click the `</>` icon → register app → copy the `firebaseConfig` values shown.

### 3. Enable Firestore
Build → Firestore Database → Create database → Start in test mode → Enable.

### 4. Set environment variables
```bash
cp .env.example .env.local
# Fill in your 6 Firebase values
```

---

## Deploy to Vercel (free, ~2 minutes)

```bash
# Push to GitHub first
git init && git add . && git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/uniride.git
git push -u origin main
```

1. Go to [vercel.com](https://vercel.com) → sign in with GitHub
2. Import your `uniride` repo
3. Add all 6 `NEXT_PUBLIC_FIREBASE_*` environment variables
4. Click **Deploy**

Your live URL will be ready in under 2 minutes.

---

## Customisation

- **Routes/Drivers** — edit `lib/mockData.ts`
- **Branding/Colors** — edit CSS variables `--navy` and `--gold` in `globals.css`
- **University name** — update footer in `app/page.tsx` and title in `app/layout.tsx`
- **Fares** — edit the `fare` field in each route in `mockData.ts`

---

## Demo Mode

Search `demo@uniport.edu.ng` on the My Bookings page to see example bookings. No Firebase config required for the full booking flow demo.

## Tech Stack

Next.js 15 · TypeScript · Firebase Firestore · CSS Variables · Lucide React · React Hot Toast · Vercel
