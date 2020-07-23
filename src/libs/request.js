import axios from 'axios'

import { getDeviceUUID, getUA, formatData } from '../utils/helper'

export async function request ({
  api = '',
  data = {},
  path = '/gw/api/',
  headers = {},
  method = 'post'
}) {
  const { name, version , os } = getUA()
  const extra = {
    appKey: process.env.APP_KEY,
    bizCode: process.env.BIZ_CODE,
    clientSysName: name,
    clientSysVersion: version,
    clientVersion: os || 'windows',
    deviceUUID: getDeviceUUID()
  }

  const defaultHeaders = {
    'Content-Type': 'multipart/form-data',
    appKey: process.env.APP_KEY
  }

  return axios({
    method,
    withCredentials: true,
    responseType: 'json',
    timeout: 30000,
    headers: {
      ...defaultHeaders,
      ...headers
    },
    url: `${process.env.GATEWAY}${path}${api}`,
    transformRequest: [
      _data => formatData(_data)
      // _data => {
        // const data = new window.FormData()
        // for (const key in _data) {
        //   if (_data[key] === '') break
        //   data.append(
        //     key,
        //     _data[key] instanceof Object ? JSON.stringify(delEmptyString(_data[key])) : _data[key]
        //   )
        // }
        // return data
      // }
    ],
    // 这里不直接转成 formData 是因为转换后调试起来看参数不方便，就在 transformRequest 中才转换
    data: {
      ...extra,
      ...data
    }
  })
}

function delEmptyString (obj) {
  for (const key in obj) {
    if (obj[key] === '') delete obj[key]
  }
  return obj
}
