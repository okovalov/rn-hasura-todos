import React from "react";
import { PropTypes } from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_TODO, DELETE_TODO } from "../data/mutations";
import { GET_TODOS } from "../data/queries";

const TodoItem = ({ item }) => {
  const { id, text, is_completed } = item
  const [updateTodo, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_TODO)
  const [deleteTodo, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_TODO)

  if (updateError) {
    return <Text>`Error! ${updateError.message}`</Text>
  }

  if (deleteError) {
    return <Text>`Error! ${deleteError.message}`</Text>
  }

  return (
    <View style={styles.container}>
      <Text
        style={ [styles.icon, is_completed ? styles.completed: {}] }
        onPress={() => {
          if (!updateLoading) {
            updateTodo({
              variables: { id, isCompleted: !is_completed },
            })
          }
        }}
      >
        { is_completed ? '✓' : '🆇'}
      </Text>
      <Text style={ [styles.item, is_completed ? styles.completed: {}] }>{text}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (!deleteLoading) {
            deleteTodo({
              variables: { id },
              refetchQueries: [{ query: GET_TODOS}]
            })
          }
        }}
        disabled={ deleteLoading }
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}

TodoItem.propTypes = {
  item: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 24,
  },
  completed: {
    color: 'lightgrey'
  },
  icon: {
    fontSize: 30,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
    marginLeft: 'auto',
    padding: 13,
  },
  buttonText: {
    color: 'white',
    fontSize: 15
  }
})

export default TodoItem
