export type TaskModel = {
  task_id: string
  type: string
  status: string
  input: object
  output: {
    model: string
    rendered_image: string
  }
  running_left_time: number
  progress: number
  create_time: string
}
