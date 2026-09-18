import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appointment, Doctor, FamilyProfile, MedicalRecord, Medication, UserProfile } from './types';
import { defaultProfile, doctors as seedDoctors, familyProfiles as seedFamily, medicalRecords as seedRecords, medications as seedMeds } from './mockData';

// --- Local-first storage note -------------------------------------------------
// Everything here is persisted on-device only (AsyncStorage today; the same
// repository shape maps directly onto an on-device SQLite schema — one table
// per collection below — for the production native build). Nothing is sent to
// a server: this is the "your data never leaves your phone" promise from the
// onboarding screen.
const STORAGE_KEY = 'medrec.v1';

interface AppState {
  profile: UserProfile;
  familyProfiles: FamilyProfile[];
  activeProfileId: string;
  records: MedicalRecord[];
  medications: Medication[];
  doctors: Doctor[];
  appointments: Appointment[];
  hydrated: boolean;
}

interface AppContextValue extends AppState {
  setActiveProfileId: (id: string) => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  addFamilyProfile: (p: FamilyProfile) => void;
  addRecord: (r: MedicalRecord) => void;
  updateRecord: (id: string, patch: Partial<MedicalRecord>) => void;
  removeRecord: (id: string) => void;
  toggleStar: (id: string) => void;
  addMedication: (m: Medication) => void;
  toggleMedTaken: (id: string, time: string) => void;
  bookAppointment: (a: Appointment) => void;
  toggleDoctorConnection: (id: string) => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const initialState: AppState = {
  profile: defaultProfile,
  familyProfiles: seedFamily,
  activeProfileId: 'self',
  records: seedRecords,
  medications: seedMeds,
  doctors: seedDoctors,
  appointments: [],
  hydrated: false,
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          setState((s) => ({ ...s, ...saved, hydrated: true }));
        } else {
          setState((s) => ({ ...s, hydrated: true }));
        }
      } catch {
        setState((s) => ({ ...s, hydrated: true }));
      }
    })();
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    const { hydrated, ...persist } = state;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persist)).catch(() => {});
  }, [state]);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      setActiveProfileId: (id) => setState((s) => ({ ...s, activeProfileId: id })),
      updateProfile: (patch) => setState((s) => ({ ...s, profile: { ...s.profile, ...patch } })),
      completeOnboarding: () => setState((s) => ({ ...s, profile: { ...s.profile, onboardingComplete: true } })),
      addFamilyProfile: (p) => setState((s) => ({ ...s, familyProfiles: [...s.familyProfiles, p] })),
      addRecord: (r) => setState((s) => ({ ...s, records: [r, ...s.records] })),
      updateRecord: (id, patch) =>
        setState((s) => ({ ...s, records: s.records.map((r) => (r.id === id ? { ...r, ...patch } : r)) })),
      removeRecord: (id) => setState((s) => ({ ...s, records: s.records.filter((r) => r.id !== id) })),
      toggleStar: (id) =>
        setState((s) => ({ ...s, records: s.records.map((r) => (r.id === id ? { ...r, starred: !r.starred } : r)) })),
      addMedication: (m) => setState((s) => ({ ...s, medications: [m, ...s.medications] })),
      toggleMedTaken: (id, time) =>
        setState((s) => ({
          ...s,
          medications: s.medications.map((m) =>
            m.id === id ? { ...m, taken: { ...m.taken, [time]: !m.taken[time] } } : m
          ),
        })),
      bookAppointment: (a) => setState((s) => ({ ...s, appointments: [a, ...s.appointments] })),
      toggleDoctorConnection: (id) =>
        setState((s) => ({
          ...s,
          doctors: s.doctors.map((d) => (d.id === id ? { ...d, connected: !d.connected } : d)),
        })),
      resetApp: () => setState(initialState),
    }),
    [state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
