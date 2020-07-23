
import Fingerprint2 from 'fingerprintjs2sync'

import { parse } from './ua'
import { encode } from '../sts/base64'

// 判断是否为小程序
export async function isMiniProgram () {
  return new Promise((resolve, reject) => {
      if(navigator && navigator.userAgent && navigator.userAgent.toLowerCase().indexOf("micromessenger") === -1){
        console.log('8')
          resolve(false)
          return
      }else{
        console.log('12')
          wx.miniProgram.getEnv((res) => {
              if(!res.miniprogram){
                  resolve(false)
                  return
              }else{                        
                  resolve(true)
              }
          })  
      }
  })
}

export async function getUA() {
  return new Promise(async (resolve, reject) => {
    // const isMP = await isMiniProgram()
    if (navigator && navigator.userAgent) {
      console.log('29')
      if (parse(navigator.userAgent)) {
        console.log('31:', parse(navigator.userAgent))
        resolve(parse(navigator.userAgent))
      } else {
        console.log('34')
        resolve({})
      }
    } else{
      wx.getSystemInfo({
        success: function(res) {
          resolve(res)
        },
        fail: () => resolve({})
      })
    }
  })
}

export async function getDeviceUUID () {
  const { version, platform, name, system, os, model } = (await getUA()) || {}
  let deviceUUID = ''
  if (navigator && navigator.userAgent) {
    deviceUUID = new Fingerprint2().getSync().fprint
  } else {
    const ramdom = `${Date.now()}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 100)}`
    deviceUUID = encode(
      (`${model}-${system}-${version}-${ramdom}`).replace(/\s/g, '')
    )
  }
  return deviceUUID
}

export function formatData (d = {}) {
  if (navigator && navigator.userAgent) {
    const formData = new FormData()
    Object.keys(d).forEach(k => {
      formData.append(k, d[k])
    })
  } else {
    return d
  }
}