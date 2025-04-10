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
        name="add"
        options={{
          title: 'Add Expense',
          headerTitle: 'Add Expense',
          tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={24} color={color} />,
          tabBarLabel: 'Add'
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
    </Tabs>
  );
}
