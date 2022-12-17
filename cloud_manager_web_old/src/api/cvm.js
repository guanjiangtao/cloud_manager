import { server } from '@/utils/request'

export function getCvmByList(params) {
  return server.connection('GET', 'getCvmByList', params)
}
