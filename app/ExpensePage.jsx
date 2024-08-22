import React from "react";
import ExpenseUI from "./components/ExpenseScreen";
import { useLocalSearchParams } from "expo-router";

export default function ExpensePage() {
  const params = useLocalSearchParams();  // Retrieve the passed parameters
  const cashAmount = params.cashAmount ? parseFloat(params.cashAmount) : 0;  // Safely handle cashAmount

  return <ExpenseUI cashAmount={cashAmount} />;  // Pass cashAmount as a prop to ExpenseUI
}