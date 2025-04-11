import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Footer() {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="home" size={24} color="#007AFF" />
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Expenses')}
      >
        <Ionicons name="list" size={24} color="#007AFF" />
        <Text style={styles.tabText}>Expenses</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Summary')}
      >
        <Ionicons name="stats-chart" size={24} color="#007AFF" />
        <Text style={styles.tabText}>Summary</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  tabText: {
    marginTop: 4,
    fontSize: 12,
    color: '#007AFF',
  },
});