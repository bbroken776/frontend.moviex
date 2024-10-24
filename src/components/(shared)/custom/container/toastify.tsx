import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastifyContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        rtl={false}
      />
    </>
  )
}

export default ToastifyContainer
