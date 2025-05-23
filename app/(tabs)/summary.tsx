import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useExpenses } from '../../context/ExpenseContext';
import { expenseCategories } from '../../constants/categories';
import { BarChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';

type TimeFrame = 'day' | 'week' | 'month' | 'year';

export default function SummaryScreen() {
  const { expenses } = useExpenses();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('week');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(expenseCategories.map(cat => cat.name));
  const [animation] = useState(new Animated.Value(0));
  const [barHeights] = useState(expenseCategories.map(() => new Animated.Value(0)));

  useFocusEffect(
    React.useCallback(() => {
      // Reset and animate each bar
      barHeights.forEach((anim, index) => {
        anim.setValue(0);
        Animated.timing(anim, {
          toValue: 1,
          duration: 1000,
          delay: index * 100,
          useNativeDriver: true,
        }).start();
      });

      // Animate the entire view
      animation.setValue(0);
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, [timeFrame, selectedCategories])
  );

  const getFilteredExpenses = (frame: TimeFrame) => {
    const now = new Date();
    let filtered = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      
      if (!selectedCategories.includes(expense.category)) {
        return false;
      }

      switch (frame) {
        case 'day':
          return expenseDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return expenseDate >= weekAgo;
        case 'month':
          return expenseDate.getMonth() === now.getMonth() &&
                 expenseDate.getFullYear() === now.getFullYear();
        case 'year':
          return expenseDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
    return filtered;
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const getCategoryTotals = () => {
    const filteredExpenses = getFilteredExpenses(timeFrame);
    return expenseCategories
      .filter(category => selectedCategories.includes(category.name))
      .map(category => ({
        name: category.name,
        total: filteredExpenses
          .filter(expense => expense.category === category.name)
          .reduce((sum, expense) => sum + expense.amount, 0),
        color: category.color
      }));
  };

  const categoryTotals = getCategoryTotals();
  const totalAmount = categoryTotals.reduce((sum, cat) => sum + cat.total, 0);

  const chartData = {
    labels: categoryTotals.map(cat => cat.name.substring(0, 3)),
    datasets: [{
      data: categoryTotals.map(cat => cat.total),
      colors: categoryTotals.map(cat => () => cat.color)
    }]
  };

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
        <TouchableOpacity 
          style={[styles.timeButton, timeFrame === 'year' && styles.activeTimeButton]}
          onPress={() => setTimeFrame('year')}
        >
          <Text style={[styles.timeButtonText, timeFrame === 'year' && styles.activeTimeButtonText]}>
            Year
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryFilterContainer}>
        <Text style={styles.filterTitle}>Filter Categories:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {expenseCategories.map(category => (
            <TouchableOpacity
              key={category.name}
              style={[
                styles.categoryFilterButton,
                selectedCategories.includes(category.name) && { backgroundColor: category.color }
              ]}
              onPress={() => toggleCategory(category.name)}
            >
              <Text style={[
                styles.categoryFilterText,
                selectedCategories.includes(category.name) && styles.categoryFilterTextSelected
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Expenses</Text>
        <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Expense Chart</Text>
        {categoryTotals.length > 0 ? (
          <Animated.View style={{
            transform: [{
              scaleY: animation
            }],
            height: 220,
            alignItems: 'stretch'
          }}>
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
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                barPercentage: 0.7,
                propsForLabels: {
                  fontSize: 12,
                  rotation: 45,
                }
              }}
              withCustomBarColorFromData={true}
              flatColor={true}
              style={styles.chart}
              showValuesOnTopOfBars
              fromZero
            />
          </Animated.View>
        ) : (
          <Text style={styles.noDataText}>No expenses to display</Text>
        )}
      </View>

      <Animated.View style={[
        styles.categoriesList,
        {
          transform: [{
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [200, 0]
            })
          }],
          opacity: animation
        }
      ]}>
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
      </Animated.View>
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
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTimeButton: {
    backgroundColor: '#007AFF',
  },
  timeButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 12,
  },
  activeTimeButtonText: {
    color: 'white',
  },
  categoryFilterContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryFilterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  categoryFilterText: {
    color: '#666',
    fontSize: 12,
  },
  categoryFilterTextSelected: {
    color: 'white',
    fontWeight: '600',
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
  noDataText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    paddingVertical: 20,
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