import CONFIG from '../config/env.conf'
import path from 'path'
import fs from 'fs'

export const saveImage = (
  pathfile: string,
  originalName: string,
  filename: string
) => {
  const tmpPath = pathfile
  const originalExt =
    originalName.split('.')[originalName.split('.').length - 1]

  const fileName = `${Date.now()}-${filename}.${originalExt}`
  const targetPath = path.resolve(CONFIG.ROOTPATH, `public/uploads/${fileName}`)

  const src = fs.createReadStream(tmpPath)
  const dest = fs.createWriteStream(targetPath)

  src.pipe(dest)

  return filename
}
