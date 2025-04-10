import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExpenseForm from '../../components/ExpenseForm';
import { useRouter } from 'expo-router';
import { useExpenses } from '../../context/ExpenseContext';

interface NewExpense {
  amount: number;
  category: string;
  date: string;
}

export default function AddScreen() {
  const router = useRouter();
  const { addExpense } = useExpenses();

  const handleSubmit = (newExpense: NewExpense) => {
    addExpense(newExpense);
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