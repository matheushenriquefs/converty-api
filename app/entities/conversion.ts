import { type Timestamp } from 'firebase-admin/firestore'

type ConstructorParams = {
  url: string
  sourceUrls: string[]
  createdAt: Pick<Timestamp, 'seconds' | 'nanoseconds'>
}

export class Conversion {
  url: ConstructorParams['url']
  sourceUrls: ConstructorParams['sourceUrls']
  createdAt: ConstructorParams['createdAt']

  constructor({ url, sourceUrls, createdAt }: ConstructorParams) {
    this.url = url
    this.sourceUrls = sourceUrls
    this.createdAt = createdAt
  }
}
