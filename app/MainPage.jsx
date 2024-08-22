import React from 'react';
import MainUI from './components/MainScreen';
import { useLocalSearchParams } from 'expo-router';


const MainPage = ({}) => {
  const params = useLocalSearchParams();  // Retrieve parameters
  const cashAmount = params.cashAmount ? parseFloat(params.cashAmount) : 0;  // Safely handle cashAmount

  return <MainUI cashAmount={cashAmount} />;  // Pass cashAmount as a prop to MainScreen
};

export default MainPage;
