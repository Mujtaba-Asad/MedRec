export type ProfileType = 'self' | 'child' | 'parent' | 'spouse' | 'other';

export interface FamilyProfile {
  id: string;
  name: string;
  relation: ProfileType;
  dob: string;
  bloodType?: string;
  avatarColor: string;
  initials: string;
}

export type RecordCategory = 'Lab Result' | 'Prescription' | 'Imaging' | 'Vaccination' | 'Visit Summary' | 'Insurance' | 'Other';

export interface MedicalRecord {
  id: string;
  profileId: string;
  title: string;
  category: RecordCategory;
  provider: string;
  date: string;
  summary: string;
  tags: string[];
  hasPhoto: boolean;
  hasVoiceNote?: boolean;
  starred?: boolean;
}

export interface Medication {
  id: string;
  profileId: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  taken: Record<string, boolean>;
  color: string;
  instructions?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviews: number;
  fee: number;
  distanceKm: number;
  nextAvailable: string;
  languages: string[];
  avatarColor: string;
  initials: string;
  connected?: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  mode: 'Video Call' | 'In Person';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  fee: number;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface UserProfile {
  fullName: string;
  phone: string;
  email?: string;
  dob: string;
  gender: string;
  bloodType: string;
  height: string;
  weight: string;
  allergies: string[];
  conditions: string[];
  emergencyContact: EmergencyContact;
  onboardingComplete: boolean;
  plan: 'Free' | 'Family' | 'Premium';
}
