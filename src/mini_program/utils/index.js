import Crypto from '../../sts/crypto'
import { encode } from '../../sts/base64'

const DETAULT_HOST = 'https://gateway.songxiaocai.com'
const DETAULT_PATH = '/gw/api/'

export function randomString(len) {
  len = len || 32
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

export function getPolicyBase64(expireTimestamp) {
  const date = new Date(+expireTimestamp).toISOString()
  const policyText = {
    expiration: date, // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    conditions: [
      ['content-length-range', 1, 1048576000] // 设置上传文件的大小限制
    ]
  }
  const policyBase64 = encode(JSON.stringify(policyText))

  return policyBase64
}

export function getRandomFilename(dir, filename) {
  const pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos !== -1) {
    suffix = filename.substring(pos)
  }
  return dir + randomString(10) + Date.now() + suffix
}

export function getSignature(policyBase64, AccessKeySecret) {
  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, AccessKeySecret, {
    asBytes: true
  })

  const signature = Crypto.util.bytesToBase64(bytes)

  return signature
}

export function getHost(customHost) {
  return customHost || GATEWAY_HOST || DETAULT_HOST
}

export function getPath(customPath) {
  return customPath || GATEWAY_PATH || DETAULT_PATH
}

export function getUrl(host, path, api) {
  return `${getHost(host)}${getPath(path)}${api}`
}

export async function gateway ({ host = '', path = '', api = '' } = {}, reqData = {}) {
  const { method, header = {} } = reqData || {}
  return new Promise((resolve, reject) => {
    const _data = Object.assign({}, reqData || {})
    for (const key in _data) {
      if (_data.hasOwnProperty(key)) {
        const element = _data[key]
        if (typeof element === 'object') {
          _data[key] = JSON.stringify(element)
        }
      }
    }
    // eslint-disable-next-line
    wx.request({
      url: getUrl(host, path, api),
      method: method || 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...header
        // 'content-type': 'application/json' // 默认值
      },
      data: _data,
      success ({ data } = {}) {
        const { success } = data || {}
        if (success) {
          resolve(data)
        } else {
          reject(data)
        }
      },
      fail (err) {
        console.log('err:', err)
        reject(err)
      }
    })
  })
}