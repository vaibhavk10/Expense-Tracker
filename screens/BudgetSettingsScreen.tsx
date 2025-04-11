import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useExpenses } from '../context/ExpenseContext';

export default function BudgetSettingsScreen() {
  const { budget, setBudget } = useExpenses();
  const [newBudget, setNewBudget] = useState('');

  const handleSetBudget = () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Budget', 'Please enter a valid budget amount');
      return;
    }
    setBudget(amount);
    setNewBudget('');
    Alert.alert('Success', 'Monthly budget has been set');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Budget Settings</Text>
      
      {budget && (
        <View style={styles.currentBudgetContainer}>
          <Text style={styles.currentBudgetText}>
            Current Budget: ${budget.amount}
          </Text>
          <Text style={styles.monthText}>
            For: {budget.month}
          </Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new monthly budget"
          keyboardType="numeric"
          value={newBudget}
          onChangeText={setNewBudget}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSetBudget}
        >
          <Text style={styles.buttonText}>Set Budget</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  currentBudgetContainer: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  currentBudgetText: {
    fontSize: 18,
    fontWeight: '600',
  },
  monthText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 