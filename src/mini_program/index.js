import { gateway, getPolicyBase64, getRandomFilename, getSignature } from './utils'

let ossConfig = null

async function getOssConfig({ host, path } = {}, reqData = {}) {
  const config = await gateway({
    host,
    path,
    api: 'songxiaocai.user.acp.getOssToken'
  }, reqData)
  ossConfig = { ...config }
  return config
}

export async function upload({ file, name = `file` }, { host, path, api } = {}, reqData = {}) {
  let ossCfg = {}
  return new Promise(async (resolve, reject) => {
    // eslint-disable-next-line
    if (wx && wx.uploadFile) {
      if (ossConfig) {
        ossCfg = { ...ossConfig }
      } else {
        const { response: config = {} } = await getOssConfig({ host, path }, reqData)
        ossCfg = { ...config }
      }

      const dir = ossCfg.objectName + '/item/'
      const key = getRandomFilename(dir, file)
      const policyBase64 = getPolicyBase64(ossCfg.expireTimestamp)
      const signature = getSignature(policyBase64, ossCfg.accessKeySecret)
      const url = `https://${ossCfg.bucketName}.${ossCfg.endPoint.split('//').slice(-1)[0]}`
      const formData = {
        key,
        policy: policyBase64,
        OSSAccessKeyId: ossCfg.accessKeyId,
        success_action_status: '200',
        signature,
        'x-oss-security-token': ossCfg.securityToken
      }
      // eslint-disable-next-line
      wx.uploadFile({
        url,
        filePath: file,
        name,
        formData: {
          ...reqData,
          ...formData
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(`${url}/${key}`)
          } else {
            reject(new Error('上传失败'))
          }
        },
        fail: (err) => {
          reject(err)
        },
      })
    } else {
      reject(new Error('Web 应用请使用 STSUpload or GWUpload!'))
    }
  })
}