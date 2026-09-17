import React, { useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import Input from './Input';
import { colors } from '../theme';

interface Props {
  label?: string;
  value: string; // The formatted string value like "DD / MM / YYYY" or "YYYY-MM-DD"
  onChangeText: (text: string) => void;
  containerStyle?: any;
}

export default function DatePickerInput({ label, value, onChangeText, containerStyle }: Props) {
  const [show, setShow] = useState(false);

  // Try to parse the existing value, otherwise default to a date 30 years ago
  let parsedDate = new Date(1990, 0, 1);
  if (value) {
    // Basic parsing assuming it might be DD/MM/YYYY or similar
    // Since Date object parsing can be tricky with formatted strings,
    // we'll try to extract numbers.
    const parts = value.match(/\d+/g);
    if (parts && parts.length >= 3) {
      if (value.includes('/')) {
        // Assume DD / MM / YYYY
        parsedDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
      } else if (value.includes('-')) {
        // Assume YYYY-MM-DD
        parsedDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      }
    }
  }
  
  // Check if date is valid
  if (isNaN(parsedDate.getTime())) {
    parsedDate = new Date(1990, 0, 1);
  }

  const onChange = (event: any, selectedDate?: Date) => {
    // For Android, we need to hide the picker after selection
    if (Platform.OS === 'android') {
      setShow(false);
    }
    
    if (selectedDate) {
      // Format as DD / MM / YYYY
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear();
      onChangeText(`${day} / ${month} / ${year}`);
    }
  };

  return (
    <View style={containerStyle}>
      <Pressable onPress={() => setShow(true)}>
        <View pointerEvents="none">
          <Input
            label={label}
            placeholder="DD / MM / YYYY"
            value={value}
            editable={false}
            rightIcon={<Ionicons name="calendar-outline" size={20} color={colors.mist} />}
            containerStyle={{ marginBottom: 0 }}
          />
        </View>
      </Pressable>
      
      {show && (
        <DateTimePicker
          value={parsedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}
