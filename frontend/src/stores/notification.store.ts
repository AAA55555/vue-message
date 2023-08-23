import { defineStore } from 'pinia'
import { ref } from 'vue'

type NotificationType = 'info' | 'error' | 'success'

type MessageType = 'Successfully'

type NotificationDataType = {
  isShow: boolean
  message: string | MessageType
  type: NotificationType
}

export const useNotification = defineStore('notification', () => {
  const data = ref<NotificationDataType>({
    isShow: false,
    message: 'Successfully',
    type: 'info'
  })

  const resetData = () => {
    data.value.isShow = false
    data.value.message = 'Successfully'
    data.value.type = 'info'
  }

  const setParamNotification = ({ message, type }: Omit<NotificationDataType, 'isShow'>) => {
    data.value.isShow = true
    data.value.message = message
    data.value.type = type
    setTimeout(() => {
      resetData()
    }, 3500)
  }

  return { data, setParamNotification, resetData }
})
