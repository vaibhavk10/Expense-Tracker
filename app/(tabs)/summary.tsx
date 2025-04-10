import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useExpenses } from '../../context/ExpenseContext';
import { expenseCategories } from '../../constants/categories';
import { BarChart } from 'react-native-chart-kit';

type TimeFrame = 'day' | 'week' | 'month';

export default function SummaryScreen() {
  const { expenses } = useExpenses();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('week');

  const getFilteredExpenses = (frame: TimeFrame) => {
    const now = new Date();
    const filtered = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      switch (frame) {
        case 'day':
          return expenseDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.setDate(now.getDate() - 7));
          return expenseDate >= weekAgo;
        case 'month':
          return expenseDate.getMonth() === now.getMonth() &&
                 expenseDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
    return filtered;
  };

  const getCategoryTotals = () => {
    const filteredExpenses = getFilteredExpenses(timeFrame);
    return expenseCategories.map(category => ({
      name: category.name,
      total: filteredExpenses
        .filter(expense => expense.category === category.name)
        .reduce((sum, expense) => sum + expense.amount, 0),
      color: category.color
    }));
  };

  const chartData = {
    labels: expenseCategories.map(cat => cat.name.substring(0, 3)),
    datasets: [{
      data: expenseCategories.map(category => 
        expenses
          .filter(expense => expense.category === category.name)
          .reduce((sum, expense) => sum + expense.amount, 0)
      )
    }]
  };

  const categoryTotals = getCategoryTotals();
  const totalAmount = categoryTotals.reduce((sum, cat) => sum + cat.total, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.timeFrameContainer}>
        <TouchableOpacity 
          style={[styles.timeButton, timeFrame === 'day' && styles.activeTimeButton]}
          onPress={() => setTimeFrame('day')}
        >
          <Text style={[styles.timeButtonText, timeFrame === 'day' && styles.activeTimeButtonText]}>
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.timeButton, timeFrame === 'week' && styles.activeTimeButton]}
          onPress={() => setTimeFrame('week')}
        >
          <Text style={[styles.timeButtonText, timeFrame === 'week' && styles.activeTimeButtonText]}>
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.timeButton, timeFrame === 'month' && styles.activeTimeButton]}
          onPress={() => setTimeFrame('month')}
        >
          <Text style={[styles.timeButtonText, timeFrame === 'month' && styles.activeTimeButtonText]}>
            Month
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Expenses</Text>
        <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Expense Chart</Text>
        <BarChart
          data={chartData}
          width={Dimensions.get('window').width - 32}
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.7,
            propsForLabels: {
              fontSize: 12,
              rotation: 45,
            }
          }}
          style={styles.chart}
          showValuesOnTopOfBars
          fromZero
        />
      </View>

      <View style={styles.categoriesList}>
        <Text style={styles.sectionTitle}>Expenses by Category</Text>
        {categoryTotals.map(category => (
          <View key={category.name} style={styles.categoryItem}>
            <View style={styles.categoryHeader}>
              <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
            <Text style={styles.categoryAmount}>${category.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 20,
  },
  timeFrameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  timeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTimeButton: {
    backgroundColor: '#007AFF',
  },
  timeButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  activeTimeButtonText: {
    color: 'white',
  },
  totalContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  chartContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    paddingBottom: 16,
  },
  categoriesList: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    color: '#333',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
}); 