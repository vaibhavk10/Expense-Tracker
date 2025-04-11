import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseList from '../components/ExpenseList';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';

export default function ExpensesScreen() {
  const { expenses } = useExpenses();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>All Expenses</ThemedText>
      {expenses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText}>No expenses yet</ThemedText>
        </View>
      ) : (
        <ExpenseList expenses={expenses} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
}); 