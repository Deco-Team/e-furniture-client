'use server'

import { callApi, callAuthApi } from '@actions/actions'
import { IAIOrder } from '@app/(customer)/order/order.interface'
import { TaskModel } from '@data/ai/ai.dto'
import { cookies } from 'next/headers'

const ROOT_ENDPOINT = '/ai-generation'
const cookieStore = cookies()

export const createTextToModelTask = async (payload: ICreateTaskToModelPayload) => {
  const endpoint = `${ROOT_ENDPOINT}/text-to-model`
  try {
    const { data } = await callAuthApi<ICreateTaskToModelResponse>(
      { method: 'post', endpoint, body: payload },
      cookieStore
    )

    return data
  } catch (error) {
    return null
  }
}

export const getTextToModelTask = async (taskId: string) => {
  const endpoint = `${ROOT_ENDPOINT}/text-to-model/${taskId}`
  try {
    const response = await callAuthApi<TaskModel>({ method: 'get', endpoint }, cookieStore)

    return response.data
  } catch (error) {
    return null
  }
}

export const createTextToImage = async (payload: ICreateImagePayload) => {
  const endpoint = `${ROOT_ENDPOINT}/text-to-image`
  try {
    const data = await callAuthApi<ICreateImageResponse>({ method: 'post', endpoint, body: payload }, cookieStore)
    return data
  } catch (error) {
    return null
  }
}

export const createAiCreditOrder = async (data: IAIOrder) => {
  const endpoint = `${ROOT_ENDPOINT}/pricing`
  const cookieStore = cookies()
  try {
    const response = await callAuthApi<{
      bin: string
      accountNumber: string
      accountName: string
      amount: number
      description: string
      orderCode: number
      currency: string
      paymentLinkId: string
      status: string
      checkoutUrl: string
      qrCode: string
    }>({ method: 'post', endpoint, body: data }, cookieStore)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
