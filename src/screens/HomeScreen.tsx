import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExpenseSummary from '../../components/ExpenseSummary';
import ExpenseForm from '../../components/ExpenseForm';
import ExpenseList from '../../components/ExpenseList';
import { expenseCategories } from '../../constants/categories';

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

interface Category {
  name: string;
  color: string;
}

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', amount: 25.99, category: 'Food', date: new Date().toISOString() },
    { id: '2', amount: 45.00, category: 'Transport', date: new Date().toISOString() },
    { id: '3', amount: 100.00, category: 'Shopping', date: new Date().toISOString() }
  ]);

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [...prev, { ...newExpense, id: Date.now().toString() }]);
  };

  const getTotalByCategory = () => {
    return expenseCategories.map((category: Category) => ({
      category: category.name,
      total: expenses
        .filter(expense => expense.category === category.name)
        .reduce((sum, expense) => sum + expense.amount, 0),
      color: category.color
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ExpenseSummary data={getTotalByCategory()} />
        <ExpenseForm onSubmit={addExpense} />
        <ExpenseList expenses={expenses} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollView: {
    flex: 1
  }
}); 