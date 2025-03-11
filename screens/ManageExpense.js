import { View, StyleSheet } from "react-native";
import { useContext, useLayoutEffect } from "react";
import IconButtton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/Expenses-context";
import ExpenseForm from "../ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import { useState } from "react";
import ErrorOverlay from "../UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState()
  const expenseCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try{
    await deleteExpense(editedExpenseId)
    // setIsSubmitting(false)
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
    }catch(error){
      setError('Could not delete expense! Network Error!');
      setIsSubmitting(false)
    }
  }

  function eventHandler(){
    setError(null);
  }

  if(error && !isSubmitting){
    return <ErrorOverlay message={error} onConfirm={eventHandler}/>
  }
  if(isSubmitting){
    return <LoadingOverlay/>
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try{
    if (isEditing) {
      expenseCtx.updateExpense(editedExpenseId, expenseData);
      await updateExpense(editedExpenseId, expenseData)
    } else {
      const id = await storeExpense(expenseData);
      expenseCtx.addExpense({...expenseData, id: id});
    }
    navigation.goBack();
  }catch(error){
    setError('Could not Add/Update the expense, Please check your network!');
    setIsSubmitting(false)
  }
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButtton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
