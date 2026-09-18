export type RootStackParamList = {
  // Onboarding / auth
  Onboarding: undefined;
  Login: undefined;
  ProfileBasics: undefined;
  HealthBasics: undefined;
  EmergencyContact: undefined;

  // Main
  MainTabs: { screen?: keyof MainTabParamList } | undefined;

  // Records
  AddDocument: undefined;
  ConfirmDetails: { imageCaptured?: boolean; photoUri?: string } | undefined;
  RecordDetail: { recordId: string };
  TypeManually: undefined;
  ViewRecord: { recordId: string };
  AddVoiceNote: { recordId?: string } | undefined;

  // Family
  FamilyProfiles: undefined;

  // AI
  AIAssistant: undefined;

  // Medications
  AddMedication: undefined;
  LockScreenReminder: { medicationId: string };

  // Doctors
  FindDoctor: undefined;
  DoctorProfile: { doctorId: string };
  SelectAppointmentTime: { doctorId: string };
  ConfirmBooking: { doctorId: string; date: string; time: string };
  ConsultationCall: { doctorId: string };
  RateDoctor: { doctorId: string };
  ConnectWithDoctor: undefined;
  DoctorConnections: undefined;
  RequestMedicineChange: { doctorId?: string } | undefined;
  Prescription: { recordId?: string } | undefined;

  // Profile
  PersonalProfileEdit: undefined;
  EmergencyProfile: undefined;
  ShareProfileChoose: undefined;
  ShareProfileQR: undefined;
  SubscriptionPlans: undefined;
  ConfirmSubscription: { plan: 'Family' | 'Premium' };
};

export type MainTabParamList = {
  Home: undefined;
  Medications: undefined;
  Doctors: undefined;
  Profile: undefined;
};
