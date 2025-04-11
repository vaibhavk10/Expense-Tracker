import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExpenseSummary from '../components/ExpenseSummary';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { expenseCategories } from '../constants/categories';
import { useExpenses } from '../context/ExpenseContext';

export default function HomeScreen() {
  const { expenses, addExpense, budget, getRemainingBudget } = useExpenses();

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
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        {budget && (
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetTitle}>Monthly Budget</Text>
            <View style={styles.budgetInfo}>
              <Text style={styles.budgetAmount}>${budget.amount}</Text>
              <Text style={styles.remainingBudget}>
                Remaining: ${getRemainingBudget()}
              </Text>
            </View>
          </View>
        )}
        <ExpenseSummary data={getTotalByCategory()} />
        <ExpenseForm onSubmit={addExpense} />
        <ExpenseList expenses={expenses} />
      </ScrollView>
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
  },
  budgetContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  remainingBudget: {
    fontSize: 16,
    color: '#666',
  },
});