import React from "react";
import { useLocalSearchParams } from "expo-router";
import MainUI from "./components/MainScreen";  // Import the MainScreen component

export default function LandingPage() {
  const params = useLocalSearchParams();  // Retrieve the passed parameters
  const cashAmount = params.cashAmount ? parseFloat(params.cashAmount) : 0;  // Safely handle cashAmount
  return <MainUI cashAmount={cashAmount}/>;  // Pass cashAmount as a prop to MainScreen
}
