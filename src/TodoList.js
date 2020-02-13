import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { StyleSheet, Text, FlatList, View } from "react-native";
import TodoItem from "./TodoItem";
import { getTodos } from "../data/queries";

const TodoList = () => {
  const { loading, error, data } = useQuery(getTodos)

  if (loading) return <View><Text>`Loading...`</Text></View>
  if (error) return <View><Text>`Error! ${error.message}`</Text></View>

  return (
    <View style={styles.container}>
      <FlatList
        data={ data.todos }
        renderItem={({ item }) => <TodoItem item={ item } />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 500,
  }
})

export default TodoList
