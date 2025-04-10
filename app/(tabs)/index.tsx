import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ExpenseSummary from '../../components/ExpenseSummary';
import ExpenseForm from '../../components/ExpenseForm';
import ExpenseList from '../../components/ExpenseList';
import { expenseCategories } from '../../constants/categories';
import { useExpenses } from '../../context/ExpenseContext';

interface Category {
  name: string;
  color: string;
}

export default function HomeScreen() {
  const { expenses, addExpense } = useExpenses();

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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <ExpenseSummary data={getTotalByCategory()} />
        <ExpenseForm onSubmit={addExpense} />
        <ExpenseList expenses={expenses} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 20
  }
});
