export type TaskModel = {
  task_id: string
  type: string
  status: string
  input: object
  output: {
    model: string
    rendered_image: string
  }
  progress: number
  create_time: string
}
