import { destroyCookie, setCookie } from 'nookies'
import { toast } from 'react-toastify'

import ILogIn from '@interfaces/iLogIn'
import IUser from '@interfaces/iUser'
import apiClient from './apiClient'
import Notification from '@components/(shared)/custom/notification/notification'

const recoverUser = async (setUser: (user: IUser | null) => void) => {
  try {
    const response = await apiClient.get('/users/me')
    setUser(response.data)
  } catch (error) {
    setUser(null)
  }
}

const logIn = async ({ username, password, setLoading }: ILogIn) => {
  setLoading(true)

  console.log({username, password, "signin": "signin"});

  try {
    const response = await apiClient.post('/auth/login', { email:username, password })
    const session = response.data

    setCookie(null, 'moviex.session', session.token, {
      maxAge: 30 * 24 * 60 * 60,
    })
    
    window.location.href = '/'
  } catch (error: any) {

    console.log(error);

    Notification({message: error, type: 'ERROR'});
    setLoading(false)
  }
}

const logOut = async () => {
  destroyCookie(null, 'moviex.session')
  window.location.href = '/'
}

export { recoverUser, logIn , logOut }
