import { join } from 'node:path'

import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import { decrypt } from '../app/utils/crypt.js'

export default class FirebaseCredentials extends BaseCommand {
  static commandName = 'firebase:credentials'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    const path = join('config', 'firebase')
    const filenames = ['service_account.json.enc', 'firebase_config.json.enc']

    for (const filename of filenames) {
      decrypt(join(path, filename))
    }
  }
}
