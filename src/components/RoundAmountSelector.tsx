import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import str from '../values/strings'
import { styled } from '../values/theme'
import { useDispatch, useGlobalState } from '../state/AppContext'

const RoundAmountSelector = () => {
  const dispatch = useDispatch()
  const state = useGlobalState()

  const decrement = () => {
    dispatch({
      type: 'changeRoundsAmount',
      payload: {
        amount: state.totalRounds - 1,
      },
    })
  }
  const increment = () => {
    dispatch({
      type: 'changeRoundsAmount',
      payload: {
        amount: state.totalRounds + 1,
      },
    })
  }
  const { roundControlsContainerStyle } = styles
  return (
    <View>
      <Text style={styled.textTitleStyle}>{`${str.rounds}`}</Text>
      <View style={roundControlsContainerStyle}>
        <TouchableOpacity
          disabled={state.totalRounds <= 1}
          onPress={() => {
            decrement()
          }}
        >
          <Text style={styled.textTitleStyle}>-</Text>
        </TouchableOpacity>
        <Text>{state.totalRounds}</Text>
        <TouchableOpacity
          onPress={() => {
            increment()
          }}
        >
          <Text style={styled.textTitleStyle}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  roundControlsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default RoundAmountSelector