export default interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
  role: 'USER' | 'ADMIN'
  created_at: string
  updated_at: string
}
