import {View, Text} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/Expenses-context';

function AllExpenses() {

  const expenseCtx = useContext(ExpensesContext)
  return (
    <ExpensesOutput expenses={expenseCtx.expenses} expensePeriod={"Total"} fallBackText={"No registered expenses found!!"}/>
  )
}


export default AllExpenses;