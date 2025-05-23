import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          color: '#007AFF',
          fontSize: 20,
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Expense Tracker',
          headerTitle: 'Expense Tracker',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          tabBarLabel: 'Home'
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'All Expenses',
          headerTitle: 'All Expenses',
          tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
          tabBarLabel: 'Expenses'
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: 'Expense Summary',
          headerTitle: 'Expense Summary',
          tabBarIcon: ({ color }) => <Ionicons name="stats-chart" size={24} color={color} />,
          tabBarLabel: 'Summary'
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: 'Budget Settings',
          headerTitle: 'Budget Settings',
          tabBarIcon: ({ color }) => <Ionicons name="wallet" size={24} color={color} />,
          tabBarLabel: 'Budget'
        }}
      />
    </Tabs>
  );
}
