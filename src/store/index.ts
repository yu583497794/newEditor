import { createStore } from 'redux'
import editorApp from './reducers'
import { Value } from 'slate'
import { IMention } from '../components/MyEditor/plugins/mentions'
export default createStore(editorApp)

export interface IStoreState {
  value: Value;
  users: IMention[];
  curIndex: number;
}