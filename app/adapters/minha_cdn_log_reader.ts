import { Readable } from 'node:stream'

import { LogReaderContract, type Path } from '#types/log'

export class MinhaCDNLogReader implements LogReaderContract {
  async read(path: Path): Promise<NodeJS.ReadableStream | null> {
    const { body } = await fetch(path.toString())

    if (!body) {
      return null
    }

    return Readable.fromWeb(body)
  }
}
