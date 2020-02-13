import React from "react";
import { PropTypes } from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_TODO } from "../data/mutations";

const TodoItem = ({ item }) => {
  const { id, text, is_completed } = item
  const [updateTodo, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_TODO)

  if (updateError) {
    return <Text>`Error! ${updateError.message}`</Text>
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
    alignItems: 'center'
  }
})

export default TodoItem
