import axios from 'axios'

import { getDeviceUUID, getUA, formatData } from '../utils/helper'

export function encode(timestamp, appKey) {
  let last = ''
  for (let i = 0; i < timestamp.length; i++) {
    let index = timestamp.charAt(i)
    if (i - 1 < appKey.length && i > 0) {
      const r = parseInt(appKey[i - 1]) % 2
      if (r > 0) {
        index = timestamp.charAt(i) ^ 0x1
      }
    }
    last += index
  }
  return last
}

export const generateToken = appKey => {
  const _appKey = appKey || process.env.APP_KEY
  const timestamp = Date.now() + ''
  const reverseAppKey = (_appKey + '')
    .split('')
    .reverse()
    .join('')
  return encode(timestamp, reverseAppKey)
}

export const upload = async ({
  headers = {},
  data = {},
  filename = 'image',
  file,
  withCredentials = true
}) => {
  const { name, version, os } = await getUA()
  const _data = {
    token: generateToken(),
    appKey: process.env.APP_KEY,
    bizCode: process.env.BIZ_CODE,
    clientSysName: name,
    clientSysVersion: version,
    clientVersion: os || 'windows',
    deviceUUID: getDeviceUUID(),
    ...data
  }
  return axios({
    method: 'POST',
    url: `${process.env.GATEWAY}/upload/image`,
    data: formatData(_data),
    headers: {
      ...headers,
      'Content-Type': 'multipart/form-data;'
    },
    withCredentials,
    timeout: 40000
  })
    .then(res => {
      if (!res.data.success || !res.data.result) {
        throw res.data
      }
      return res.data.result
    })
    .catch(err => {
      throw err
    })
}
