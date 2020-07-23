import axios from 'axios'

import { request } from '../libs/request'
import { formatData } from '../utils/helper'
import Crypto from './crypto'

export const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

export function UTF8Encode (string) {
  string = string.replace(/\r\n/g, '\n')
  var utftext = ''

  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n)
    if (c < 128) {
      utftext += String.fromCharCode(c)
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192)
      utftext += String.fromCharCode((c & 63) | 128)
    } else {
      utftext += String.fromCharCode((c >> 12) | 224)
      utftext += String.fromCharCode(((c >> 6) & 63) | 128)
      utftext += String.fromCharCode((c & 63) | 128)
    }
  }
  return utftext
}

export function encode (input) {
  var output = ''
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4
  var i = 0

  input = UTF8Encode(input)

  while (i < input.length) {
    chr1 = input.charCodeAt(i++)
    chr2 = input.charCodeAt(i++)
    chr3 = input.charCodeAt(i++)

    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63

    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }

    output =
      output +
      _keyStr.charAt(enc1) +
      _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) +
      _keyStr.charAt(enc4)
  }

  return output
}

export async function fetchUploadConfig () {
  try {
    const { data } = await request({
      api: 'songxiaocai.user.acp.getOssToken'
    })
    return data.response
  } catch (err) {
    console.log('get oss cfg err:', err)
  }
}

export function getPolicyBase64 (expireTimestamp) {
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

export function getSignature (policyBase64, AccessKeySecret) {
  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, AccessKeySecret, {
    asBytes: true
  })

  const signature = Crypto.util.bytesToBase64(bytes)

  return signature
}

export function getRandomFilename (dir, filename = 'aa.bb') {
  const pos = filename.lastIndexOf('.')
  let suffix = ''
  let name = ''
  if (pos !== -1) {
    suffix = filename.substring(pos)
    name = filename.substring(0, pos)
  }
  return `${dir}${name}_${Date.now()}${suffix}`
}

export async function upload ({ file, ossConfig, opts = {} }) {
  if (!ossConfig) {
    ossConfig = await fetchUploadConfig()
  }
  const dir = ossConfig.objectName + '/item/'
  const key = getRandomFilename(dir, file.name || 'img.png')
  const policyBase64 = getPolicyBase64(ossConfig.expireTimestamp)
  const signature = getSignature(policyBase64, ossConfig.accessKeySecret)
  // const bucketName = 'dev-sxc-pesticide'

  const url = `https://${ossConfig.bucketName}.${ossConfig.endPoint.split('//').slice(-1)[0]}`
  const options = {
    method: 'post',
    url,
    data: formatData({
      key,
      policy: policyBase64,
      OSSAccessKeyId: ossConfig.accessKeyId,
      success_action_status: '200',
      Signature: signature,
      'x-oss-security-token': ossConfig.securityToken,
      file
    }),
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: ev => {
      // 上传进度
      const progress = +((ev.loaded / ev.total) * 100).toFixed(2)
      const { onUploadProgress } = opts
      typeof onUploadProgress === 'function' && onUploadProgress(progress, ev)
    }
  }

  return axios(options)
    .then(() => `${url}/${key}`)
    .catch(err => {
      console.log('上传err:', err)
      throw err
    })
}
