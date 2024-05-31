interface ICreateTaskToModelPayload {
  prompt: string
}

interface ICreateTaskToModelResponse {
  task_id: string
}

interface ICreateImageResponse {
  imageUrl: string
}

interface ICreateImagePayload {
  text: string
}
