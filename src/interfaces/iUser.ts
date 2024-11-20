export default interface IUser {
  id: number
  firstName: string
  lastName: string
  email: string
  role: 'USER' | 'ADMIN'
  createdAt: string
  updatedAt: string
}
