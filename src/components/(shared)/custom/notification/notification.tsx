import { toast } from 'react-toastify'

type NotificationProps = {
  message: string
  type?: 'SUCCESS' | 'ERROR' | 'INFO' | 'DEFAULT'
}

const Notification = ({ message, type = 'DEFAULT' }: NotificationProps) => {
  return {
    SUCCESS: toast.success,
    ERROR: toast.error,
    INFO: toast.info,
    DEFAULT: toast,
  }[type](message, { className: 'bg-slate-900 text-white' })
}

export default Notification
