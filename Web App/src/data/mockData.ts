import { Doctor, FamilyProfile, MedicalRecord, Medication, UserProfile } from './types';

export const defaultProfile: UserProfile = {
  fullName: '',
  phone: '',
  dob: '',
  gender: '',
  bloodType: '',
  height: '',
  weight: '',
  allergies: [],
  conditions: [],
  emergencyContact: { name: '', relation: '', phone: '' },
  onboardingComplete: false,
  plan: 'Free',
};

export const familyProfiles: FamilyProfile[] = [
  { id: 'self', name: 'You', relation: 'self', dob: '1994-03-12', bloodType: 'O+', avatarColor: '#2DA6B2', initials: 'Y' },
  { id: 'fp1', name: 'Ayesha Khan', relation: 'spouse', dob: '1996-07-02', bloodType: 'A+', avatarColor: '#43C871', initials: 'AK' },
  { id: 'fp2', name: 'Zain Khan', relation: 'child', dob: '2021-11-19', bloodType: 'O+', avatarColor: '#D98C2B', initials: 'ZK' },
  { id: 'fp3', name: 'Rafiq Khan', relation: 'parent', dob: '1962-01-30', bloodType: 'B+', avatarColor: '#5B6169', initials: 'RK' },
];

export const medicalRecords: MedicalRecord[] = [
  {
    id: 'r1', profileId: 'self', title: 'Complete Blood Count (CBC)', category: 'Lab Result',
    provider: 'Shaukat Khanum Lab', date: '2026-09-10', summary: 'All values within normal range. Hemoglobin 14.2 g/dL.',
    tags: ['Blood', 'Routine'], hasPhoto: true, starred: true,
  },
  {
    id: 'r2', profileId: 'self', title: 'Chest X-Ray Report', category: 'Imaging',
    provider: 'Aga Khan University Hospital', date: '2026-08-22', summary: 'No acute cardiopulmonary abnormality identified.',
    tags: ['X-Ray', 'Chest'], hasPhoto: true,
  },
  {
    id: 'r3', profileId: 'self', title: 'Dr. Farah Malik — Visit Summary', category: 'Visit Summary',
    provider: 'Dr. Farah Malik, Cardiologist', date: '2026-08-22', summary: 'Follow-up in 3 months. Continue current medication.',
    tags: ['Cardiology'], hasPhoto: false, hasVoiceNote: true,
  },
  {
    id: 'r4', profileId: 'self', title: 'Amoxicillin 500mg', category: 'Prescription',
    provider: 'Dr. Bilal Ahmed', date: '2026-07-15', summary: 'Twice daily for 7 days, after meals.',
    tags: ['Antibiotic'], hasPhoto: true,
  },
  {
    id: 'r5', profileId: 'self', title: 'COVID-19 Booster', category: 'Vaccination',
    provider: 'National Immunization Center', date: '2026-05-03', summary: 'Pfizer-BioNTech booster dose administered.',
    tags: ['Vaccine'], hasPhoto: true,
  },
  {
    id: 'r6', profileId: 'self', title: 'State Life Health Card', category: 'Insurance',
    provider: 'State Life Insurance', date: '2026-01-01', summary: 'Policy #SL-88213 — valid through Dec 2026.',
    tags: ['Insurance'], hasPhoto: true,
  },
  {
    id: 'r7', profileId: 'fp2', title: 'Growth Chart — 4 Year Checkup', category: 'Visit Summary',
    provider: 'Dr. Sana Riaz, Pediatrician', date: '2026-09-01', summary: 'Height and weight tracking normally for age.',
    tags: ['Pediatric'], hasPhoto: false,
  },
];

export const medications: Medication[] = [
  {
    id: 'm1', profileId: 'self', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily',
    times: ['08:00', '20:00'], startDate: '2026-06-01', color: '#2DA6B2',
    taken: { '08:00': true, '20:00': false }, instructions: 'Take after meals',
  },
  {
    id: 'm2', profileId: 'self', name: 'Atorvastatin', dosage: '10mg', frequency: 'Once daily',
    times: ['21:00'], startDate: '2026-05-10', color: '#43C871',
    taken: { '21:00': false }, instructions: 'Take at night',
  },
  {
    id: 'm3', profileId: 'self', name: 'Vitamin D3', dosage: '2000 IU', frequency: 'Once daily',
    times: ['09:00'], startDate: '2026-01-01', color: '#D98C2B',
    taken: { '09:00': true },
  },
];

export const doctors: Doctor[] = [
  {
    id: 'd1', name: 'Dr. Farah Malik', specialty: 'Cardiologist', hospital: 'Aga Khan University Hospital',
    rating: 4.9, reviews: 214, fee: 3000, distanceKm: 2.4, nextAvailable: 'Today, 5:30 PM',
    languages: ['English', 'Urdu'], avatarColor: '#2DA6B2', initials: 'FM', connected: true,
  },
  {
    id: 'd2', name: 'Dr. Bilal Ahmed', specialty: 'General Physician', hospital: 'South City Hospital',
    rating: 4.7, reviews: 342, fee: 1500, distanceKm: 1.1, nextAvailable: 'Tomorrow, 10:00 AM',
    languages: ['English', 'Urdu'], avatarColor: '#43C871', initials: 'BA',
  },
  {
    id: 'd3', name: 'Dr. Sana Riaz', specialty: 'Pediatrician', hospital: "Children's Hospital",
    rating: 4.8, reviews: 189, fee: 2000, distanceKm: 4.8, nextAvailable: 'Today, 7:00 PM',
    languages: ['English', 'Urdu', 'Sindhi'], avatarColor: '#D98C2B', initials: 'SR', connected: true,
  },
  {
    id: 'd4', name: 'Dr. Omar Siddiqui', specialty: 'Dermatologist', hospital: 'Liaquat National Hospital',
    rating: 4.6, reviews: 98, fee: 2500, distanceKm: 6.2, nextAvailable: 'Fri, 3:00 PM',
    languages: ['English', 'Urdu'], avatarColor: '#5B6169', initials: 'OS',
  },
];

export const recordCategories = ['Lab Result', 'Prescription', 'Imaging', 'Vaccination', 'Visit Summary', 'Insurance', 'Other'] as const;
