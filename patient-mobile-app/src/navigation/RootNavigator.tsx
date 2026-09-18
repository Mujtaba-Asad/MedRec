import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp } from '../data/AppContext';
import type { RootStackParamList } from './types';

import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ProfileBasicsScreen from '../screens/profilesetup/ProfileBasicsScreen';
import HealthBasicsScreen from '../screens/profilesetup/HealthBasicsScreen';
import EmergencyContactScreen from '../screens/profilesetup/EmergencyContactScreen';

import MainTabs from './MainTabs';

import AddDocumentScreen from '../screens/records/AddDocumentScreen';
import ConfirmDetailsScreen from '../screens/records/ConfirmDetailsScreen';
import RecordDetailScreen from '../screens/records/RecordDetailScreen';
import TypeManuallyScreen from '../screens/records/TypeManuallyScreen';
import ViewRecordScreen from '../screens/records/ViewRecordScreen';
import AddVoiceNoteScreen from '../screens/records/AddVoiceNoteScreen';

import FamilyProfilesScreen from '../screens/family/FamilyProfilesScreen';
import AIAssistantScreen from '../screens/ai/AIAssistantScreen';

import AddMedicationScreen from '../screens/medications/AddMedicationScreen';
import LockScreenReminderScreen from '../screens/medications/LockScreenReminderScreen';

import DoctorProfileScreen from '../screens/doctors/DoctorProfileScreen';
import SelectAppointmentTimeScreen from '../screens/doctors/SelectAppointmentTimeScreen';
import ConfirmBookingScreen from '../screens/doctors/ConfirmBookingScreen';
import ConsultationCallScreen from '../screens/doctors/ConsultationCallScreen';
import RateDoctorScreen from '../screens/doctors/RateDoctorScreen';
import ConnectWithDoctorScreen from '../screens/doctors/ConnectWithDoctorScreen';
import DoctorConnectionsScreen from '../screens/doctors/DoctorConnectionsScreen';
import RequestMedicineChangeScreen from '../screens/doctors/RequestMedicineChangeScreen';
import PrescriptionScreen from '../screens/doctors/PrescriptionScreen';

import PersonalProfileEditScreen from '../screens/profile/PersonalProfileEditScreen';
import EmergencyProfileScreen from '../screens/profile/EmergencyProfileScreen';
import ShareProfileChooseScreen from '../screens/profile/ShareProfileChooseScreen';
import ShareProfileQRScreen from '../screens/profile/ShareProfileQRScreen';
import SubscriptionPlansScreen from '../screens/subscription/SubscriptionPlansScreen';
import ConfirmSubscriptionScreen from '../screens/subscription/ConfirmSubscriptionScreen';
// Note: FindDoctorScreen is only mounted as the "Doctors" tab inside
// MainTabs — it is not a top-level stack route.

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { profile } = useApp();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ProfileBasics" component={ProfileBasicsScreen} />
      <Stack.Screen name="HealthBasics" component={HealthBasicsScreen} />
      <Stack.Screen name="EmergencyContact" component={EmergencyContactScreen} />

      <Stack.Screen name="MainTabs" component={MainTabs} />

      <Stack.Screen name="AddDocument" component={AddDocumentScreen} />
      <Stack.Screen name="ConfirmDetails" component={ConfirmDetailsScreen} />
      <Stack.Screen name="RecordDetail" component={RecordDetailScreen} />
      <Stack.Screen name="TypeManually" component={TypeManuallyScreen} />
      <Stack.Screen name="ViewRecord" component={ViewRecordScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="AddVoiceNote" component={AddVoiceNoteScreen} />

      <Stack.Screen name="FamilyProfiles" component={FamilyProfilesScreen} />
      <Stack.Screen name="AIAssistant" component={AIAssistantScreen} options={{ animation: 'slide_from_bottom' }} />

      <Stack.Screen name="AddMedication" component={AddMedicationScreen} />
      <Stack.Screen name="LockScreenReminder" component={LockScreenReminderScreen} options={{ animation: 'fade' }} />

      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
      <Stack.Screen name="SelectAppointmentTime" component={SelectAppointmentTimeScreen} />
      <Stack.Screen name="ConfirmBooking" component={ConfirmBookingScreen} />
      <Stack.Screen name="ConsultationCall" component={ConsultationCallScreen} options={{ animation: 'fade', gestureEnabled: false }} />
      <Stack.Screen name="RateDoctor" component={RateDoctorScreen} />
      <Stack.Screen name="ConnectWithDoctor" component={ConnectWithDoctorScreen} />
      <Stack.Screen name="DoctorConnections" component={DoctorConnectionsScreen} />
      <Stack.Screen name="RequestMedicineChange" component={RequestMedicineChangeScreen} />
      <Stack.Screen name="Prescription" component={PrescriptionScreen} />

      <Stack.Screen name="PersonalProfileEdit" component={PersonalProfileEditScreen} />
      <Stack.Screen name="EmergencyProfile" component={EmergencyProfileScreen} />
      <Stack.Screen name="ShareProfileChoose" component={ShareProfileChooseScreen} />
      <Stack.Screen name="ShareProfileQR" component={ShareProfileQRScreen} />
      <Stack.Screen name="SubscriptionPlans" component={SubscriptionPlansScreen} />
      <Stack.Screen name="ConfirmSubscription" component={ConfirmSubscriptionScreen} />
    </Stack.Navigator>
  );
}
