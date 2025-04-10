import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExpenseSummary from '../components/ExpenseSummary';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { expenseCategories } from '../constants/categories';

export default function HomeScreen() {
  const [expenses, setExpenses] = useState([
    { id: '1', amount: 25.99, category: 'Food', date: new Date().toISOString() },
    { id: '3', amount: 100.00, category: 'Shopping', date: new Date().toISOString() }
  ]);

  const addExpense = (newExpense) => {
    setExpenses(prev => [...prev, { ...newExpense, id: Date.now().toString() }]);
  };

  const getTotalByCategory = () => {
    return expenseCategories.map(category => ({
      category: category.name,
      total: expenses
        .filter(expense => expense.category === category.name)
        .reduce((sum, expense) => sum + parseFloat(expense.amount), 0),
      color: category.color
    }));
  };  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <ExpenseSummary data={getTotalByCategory()} />
        <ExpenseForm onSubmit={addExpense} />
        <ExpenseList expenses={expenses} />      </ScrollView>
      <Footer />
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