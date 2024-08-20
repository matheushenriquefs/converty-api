import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'

const app = initializeApp({
  credential: applicationDefault(),
})
const db = getFirestore(app)

export class FirebaseClient {
  private db: Firestore

  constructor() {
    this.db = db
  }

  getDb(): Firestore {
    return this.db
  }
}
