import { type WithFieldValue, type DocumentData } from 'firebase-admin/firestore'

import { FirebaseClient } from '#clients/firebase'
import { Conversion } from '#entities/conversion'

export class ConversionRepository {
  private collection: string

  constructor() {
    this.collection = 'conversions'
  }

  async add(data: WithFieldValue<DocumentData>): Promise<Conversion> {
    const firebaseClient = new FirebaseClient()
    const ref = await firebaseClient.getDb().collection(this.collection).add(data)
    const snapshot = await ref.get()

    return new Conversion({
      id: ref.id,
      url: snapshot.get('url'),
      sourceUrls: snapshot.get('source_urls'),
      createdAt: snapshot.get('created_at'),
    })
  }
}
