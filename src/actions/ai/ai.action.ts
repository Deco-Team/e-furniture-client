'use server'

import { callApi } from '@actions/actions'
import { TaskModel } from '@data/ai/ai.dto'

const ROOT_ENDPOINT = '/ai-generation/text-to-model'

export const createTextToModelTask = async (payload: ICreateTaskToModelPayload) => {
  const endpoint = `${ROOT_ENDPOINT}`
  try {
    const { data } = await callApi<ICreateTaskToModelResponse>({ method: 'post', endpoint, body: payload })

    return data
  } catch (error) {
    return null
  }
}

export const getTextToModelTask = async (taskId: string) => {
  const endpoint = `${ROOT_ENDPOINT}/${taskId}`
  try {
    const response = await callApi<TaskModel>({ method: 'get', endpoint })

    return response.data
  } catch (error) {
    return null
  }
}
