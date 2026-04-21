import {
  collection, addDoc, getDocs, query, where,
  orderBy, Timestamp, doc, updateDoc
} from "firebase/firestore";
import { db, isDemoMode } from "./firebase";
import { Booking } from "./types";

const STORAGE_KEY = "uniride_bookings";

function generateRef(): string {
  return "#UNI-" + Math.floor(1000 + Math.random() * 9000);
}

// ---------- localStorage helpers ----------
function loadFromStorage(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(bookings: Booking[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

// ---------- Public API ----------
export async function createBooking(
  booking: Omit<Booking, "id" | "bookingRef" | "createdAt">
): Promise<string> {
  const ref = generateRef();

  if (isDemoMode || !db) {
    const id = "local-" + Date.now();
    const newBooking: Booking = {
      ...booking,
      id,
      bookingRef: ref,
      createdAt: new Date().toISOString(),
    };
    const existing = loadFromStorage();
    saveToStorage([newBooking, ...existing]);
    return id;
  }

  const docRef = await addDoc(collection(db, "bookings"), {
    ...booking,
    bookingRef: ref,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getBookingsByEmail(email: string): Promise<Booking[]> {
  if (isDemoMode || !db) {
    const all = loadFromStorage();
    return all.filter(
      (b) => b.studentEmail.toLowerCase() === email.toLowerCase()
    );
  }

  const q = query(
    collection(db, "bookings"),
    where("studentEmail", "==", email),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() ?? new Date(),
  })) as Booking[];
}

export async function cancelBooking(bookingId: string): Promise<void> {
  if (isDemoMode || !db) {
    const all = loadFromStorage();
    const updated = all.map((b) =>
      b.id === bookingId ? { ...b, status: "cancelled" as const } : b
    );
    saveToStorage(updated);
    return;
  }

  const ref = doc(db, "bookings", bookingId);
  await updateDoc(ref, { status: "cancelled" });
}
