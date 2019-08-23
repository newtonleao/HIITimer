import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Theme from '../values/Theme'
import useInterval from '../state/useInterval'
import Icon from 'react-native-vector-icons/AntDesign'

type Props = {
  positive?: boolean
  disabled?: boolean
  onPress: () => void
}

const ButtonStepModifier = ({ positive = true, disabled, onPress }: Props) => {
  const [pressed, setPressed] = useState(false)
  const [delay, setDelay] = useState(500)

  useInterval(disabled ? () => {} : onPress, pressed ? delay : null)

  // Make it faster every second!
  useInterval(
    () => {
      if (delay > 100) {
        setDelay(delay / 1.5)
      }
    },
    pressed ? 500 : null,
  )
  const renderIcon = positive ? (
    <Icon
      name={'plus'}
      size={Theme.sizeM}
      color={disabled ? Theme.colors.grey3 : Theme.colors.white}
      style={{
        height: Theme.sizeM,
        width: Theme.sizeM,
      }}
    />
  ) : (
    <Icon
      name={'minus'}
      size={Theme.sizeM}
      color={disabled ? Theme.colors.grey3 : Theme.colors.white}
      style={{
        height: Theme.sizeM,
        width: Theme.sizeM,
      }}
    />
  )
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => {
        setPressed(false)
        setDelay(500)
      }}
      disabled={disabled}
      style={[s.button, disabled && s.disabledButton]}
    >
      {renderIcon}
    </TouchableOpacity>
  )
}
const s = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.primaryColor,
    width: 24,
    height: 24,
    borderRadius: 24,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  disabledButton: {
    backgroundColor: Theme.colors.grey2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 1,
  },
})
export default ButtonStepModifier
