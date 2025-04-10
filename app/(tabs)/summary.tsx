import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ExpenseSummary from '../../components/ExpenseSummary';
import { expenseCategories } from '../../constants/categories';

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

export default function SummaryScreen() {
  const [expenses] = useState<Expense[]>([
    { id: '1', amount: 25.99, category: 'Food', date: new Date().toISOString() },
    { id: '2', amount: 45.00, category: 'Transport', date: new Date().toISOString() },
    { id: '3', amount: 100.00, category: 'Shopping', date: new Date().toISOString() }
  ]);

  const getTotalByCategory = () => {
    return expenseCategories.map(category => ({
      category: category.name,
      total: expenses
        .filter(expense => expense.category === category.name)
        .reduce((sum, expense) => sum + expense.amount, 0),
      color: category.color
    }));
  };

  return (
    <View style={styles.container}>
      <ExpenseSummary data={getTotalByCategory()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 