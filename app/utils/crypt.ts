import { createCipheriv, createDecipheriv, createHash } from 'node:crypto'
import { createReadStream, createWriteStream } from 'node:fs'

export const encrypt = (filename: string) => {
  const iv = createHash('sha1').update(String(process.env.APP_KEY), 'utf8').digest().subarray(0, 16) // 16 bytes
  const cipher = createCipheriv(
    'aes-256-cbc',
    createHash('sha256').update(String(process.env.APP_KEY), 'utf8').digest(),
    iv
  )

  const input = createReadStream(filename)
  const output = createWriteStream(filename + '.enc')

  input.pipe(cipher).pipe(output)
}

export const decrypt = (filename: string) => {
  const iv = createHash('sha1').update(String(process.env.APP_KEY), 'utf8').digest().subarray(0, 16) // 16 bytes
  const decipher = createDecipheriv(
    'aes-256-cbc',
    createHash('sha256').update(String(process.env.APP_KEY), 'utf8').digest(),
    iv
  )
  const input = createReadStream(filename)
  const output = createWriteStream(filename.replace('.enc', ''))

  input.pipe(decipher).pipe(output)
}
