import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as Notifications from 'expo-notifications';

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

interface Budget {
  amount: number;
  month: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  budget: Budget | null;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  getTotalExpenses: () => number;
  setBudget: (amount: number) => void;
  getRemainingBudget: () => number;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudgetState] = useState<Budget | null>(null);

  useEffect(() => {
    // Configure notifications
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    // Request permissions
    const requestPermissions = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
    };

    requestPermissions();
  }, []);

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses(prev => {
      const updatedExpenses = [...prev, { ...newExpense, id: Date.now().toString() }];
      checkBudgetExceeded(updatedExpenses);
      return updatedExpenses;
    });
  };

  const getTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const setBudget = (amount: number) => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    setBudgetState({ amount, month: currentMonth });
  };

  const getRemainingBudget = () => {
    if (!budget) return 0;
    return budget.amount - getTotalExpenses();
  };

  const checkBudgetExceeded = async (currentExpenses: Expense[]) => {
    if (!budget) return;

    const totalExpenses = currentExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const percentageUsed = (totalExpenses / budget.amount) * 100;

    try {
      if (percentageUsed >= 100) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Budget Exceeded!",
            body: `You have exceeded your monthly budget of $${budget.amount}.`,
          },
          trigger: null,
        });
      } else if (percentageUsed >= 80) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Budget Warning",
            body: `You have used ${Math.round(percentageUsed)}% of your monthly budget.`,
          },
          trigger: null,
        });
      }
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  return (
    <ExpenseContext.Provider 
      value={{ 
        expenses, 
        budget,
        addExpense, 
        getTotalExpenses,
        setBudget,
        getRemainingBudget
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
} 