export interface Driver {
  id: string;
  name: string;
  initials: string;
  vehicle: string;
  plate: string;
  rating: number;
  trips: number;
  status: "available" | "busy" | "offline";
  eta: number; // minutes
  avatarColor: string;
  routeIds: string[];
  phone: string;
}

export interface Route {
  id: string;
  name: string;
  from: string;
  to: string;
  stops: string[];
  duration: number; // minutes
  fare: number; // naira
  type: "express" | "regular" | "evening";
  schedule: string[];
}

export interface Booking {
  id?: string;
  studentName: string;
  studentEmail: string;
  routeId: string;
  routeName: string;
  driverId: string;
  driverName: string;
  vehicle: string;
  plate: string;
  fare: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  pickupPoint: string;
  dropoffPoint: string;
  createdAt: Date | string;
  eta: number;
  bookingRef: string;
}
