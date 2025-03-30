import { Task } from '@doist/todoist-api-typescript';

export interface ITask extends Task {
  _top: number
  _width: number
}