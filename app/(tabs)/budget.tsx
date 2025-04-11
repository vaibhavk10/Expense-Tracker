import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useExpenses } from '../../context/ExpenseContext';

export default function BudgetScreen() {
  const { budget, setBudget, getRemainingBudget } = useExpenses();
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
          <Text style={styles.remainingText}>
            Remaining: ${getRemainingBudget()}
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

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About Budget Notifications</Text>
        <Text style={styles.infoText}>
          • You'll receive a warning when you've used 80% of your budget
        </Text>
        <Text style={styles.infoText}>
          • You'll receive an alert when you exceed your budget
        </Text>
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
  remainingText: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 5,
    fontWeight: '600',
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
  infoContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
}); 