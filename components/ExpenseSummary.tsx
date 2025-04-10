import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface CategoryData {
  category: string;
  total: number;
  color: string;
}

interface ExpenseSummaryProps {
  data: CategoryData[];
}

export default function ExpenseSummary({ data }: ExpenseSummaryProps) {
  const totalExpenses = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Summary</Text>
      <Text style={styles.totalAmount}>${totalExpenses.toFixed(2)}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {data.map((item) => (
          <View
            key={item.category}
            style={[styles.categoryCard, { backgroundColor: item.color }]}
          >
            <Text style={styles.categoryName}>{item.category}</Text>
            <Text style={styles.categoryAmount}>
              ${item.total.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
  },
  scrollView: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  categoryCard: {
    padding: 16,
    borderRadius: 8,
    marginRight: 12,
    minWidth: 120,
  },
  categoryName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryAmount: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});