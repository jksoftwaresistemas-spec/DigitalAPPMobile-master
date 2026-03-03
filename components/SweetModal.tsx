import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './themed-text';

interface SweetModalProps {
  visible: boolean;
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
  onClose: () => void;
}

export function SweetModal({ visible, type, title, message, onClose }: SweetModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'success': return { name: 'checkmark-circle', color: '#a5dc86' };
      case 'error': return { name: 'close-circle', color: '#f27474' };
      case 'warning': return { name: 'alert-circle', color: '#f8bb86' };
      default: return { name: 'information-circle', color: '#3fc3ee' };
    }
  };

  const icon = getIcon();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Ionicons name={icon.name as any} size={80} color={icon.color} style={styles.icon} />
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.message}>{message}</ThemedText>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#7066e0' }]} onPress={onClose}>
            <ThemedText style={styles.buttonText}>OK</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  alertBox: { width: '80%', backgroundColor: 'white', borderRadius: 15, padding: 25, alignItems: 'center', elevation: 10 },
  icon: { marginBottom: 15 },
  title: { fontSize: 22, fontFamily: 'PoppinsBold', color: '#595959', marginBottom: 10, textAlign: 'center' },
  message: { fontSize: 16, fontFamily: 'Poppins', color: '#545454', textAlign: 'center', marginBottom: 20 },
  button: { paddingHorizontal: 30, paddingVertical: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontFamily: 'PoppinsSemiBold', fontSize: 16 }
});