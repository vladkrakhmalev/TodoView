import { Task } from '@doist/todoist-api-typescript';

export interface ITask extends Task {
  _top: number
  _height: number
  _width: number
}

export interface IEmptyTask {
  content: string
  _top: number
  _height: number
  _width: number
}