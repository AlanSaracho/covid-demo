import AsyncStorage from '@react-native-async-storage/async-storage'
import { AtomEffect } from 'recoil'

const buildPersistEffect = (defaultValue : any): AtomEffect<any> => ({ node, setSelf, onSet }) => {
  setSelf(
    AsyncStorage.getItem(node.key).then((savedValue) =>
        savedValue != null ? JSON.parse(savedValue) : defaultValue,
    ),
  )
  onSet((newValue) => {
    AsyncStorage.setItem(node.key, JSON.stringify(newValue))
  })
};

export { buildPersistEffect };
