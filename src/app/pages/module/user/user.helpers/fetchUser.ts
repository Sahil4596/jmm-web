import {get} from 'sr/utils/axios/index'
import {UserInterface} from 'sr/constants/User'
import {PayloadType, fetchUserResponse} from '../user.interfaces'

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchUser = async (payload: PayloadType): Promise<fetchUserResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<fetchUserResponse>(`/users`, filteredPayload)

    if (res && res.status == 'success') {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No results found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// export const fetchUser = async (payload: PayloadType) => {
//   try {
//     const filteredPayload = filterPayload(payload)
//     const res = await get<any>(`/users`, filteredPayload)
//     if (res.results) {
//       return res
//     }
//   } catch (e: any) {
//     toast.error(e.message)
//     return undefined
//   }
// }
// export const fetchSingleUser = async (payload: string) => {
//   try {
//     const res = await get<any>(`/users/${payload}`, {})
//     if (res) {
//       return res
//     }
//     return res
//   } catch (e: any) {
//     toast.error(e.message)
//     return undefined
//   }
// }
export const fetchSingleUser = async (payload: string | undefined): Promise<UserInterface> => {
  await setTimeout(() => {}, 10000)
  try {
    const res = await get<UserInterface>(`/users/${payload || ''}`, {})

    if (res) {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No results found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
