import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ExpenseForm from '../../components/ExpenseForm';
import { useRouter } from 'expo-router';

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

export default function AddScreen() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleSubmit = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [...prev, { ...newExpense, id: Date.now().toString() }]);
    router.back();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 