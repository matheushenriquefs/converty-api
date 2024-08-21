import { type Timestamp } from 'firebase-admin/firestore'

type ConstructorParams = {
  id: string
  url: string
  sourceUrls: string[]
  createdAt: Pick<Timestamp, 'seconds' | 'nanoseconds'>
}

export class Conversion {
  id: ConstructorParams['id']
  url: ConstructorParams['url']
  sourceUrls: ConstructorParams['sourceUrls']
  createdAt: ConstructorParams['createdAt']

  constructor({ id, url, sourceUrls, createdAt }: ConstructorParams) {
    this.id = id
    this.url = url
    this.sourceUrls = sourceUrls
    this.createdAt = createdAt
  }
}
