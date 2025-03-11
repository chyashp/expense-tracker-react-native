
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ExpensesSummary from '../components/ExpensesOutput/ExpensesSummary';
import { ExpensesContext } from '../store/Expenses-context';
import { getDateMinusDay } from '../util/date';
import { useContext, useEffect , useState} from 'react';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from '../UI/ErrorOverlay';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const[error, setError] = useState(null)

  const expenseCtx = useContext(ExpensesContext);


  useEffect(()=>{
    async function getExpenses(){
      setIsFetching(true);
      try{
        const expenses =  await fetchExpenses();
        expenseCtx.setExpense(expenses)
      }catch(error){
        setError('Could not fetch expenses!')
      }finally{
        setIsFetching(false)
      }
      const expenses =  await fetchExpenses();
      
    } 
    getExpenses();
  },[])

  function errorHandler(){
    setError(null)
  }
  if(error && !isFetching){
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }
  if(isFetching){
   return <LoadingOverlay/>
  }
  const recentExpenses = expenseCtx.expenses.filter((expense)=>{
    const today = new Date();

    const date7DaysAgo = getDateMinusDay(today, 7);

    return (expense.date >= date7DaysAgo) && (expense.date <= today);
  })
  return <ExpensesOutput expenses={recentExpenses} expensePeriod={"Last 7 Days"} fallBackText={"No expenses registered for the last 7 days"}/>
}


export default RecentExpenses;