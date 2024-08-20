import { Readable } from 'node:stream'

import { LogReader, type Path } from '#types/log'

export class MinhaCDNLogReader implements LogReader {
  async read(path: Path): Promise<NodeJS.ReadableStream | null> {
    const { body } = await fetch(path.toString())

    if (!body) {
      return null
    }

    return Readable.fromWeb(body)
  }
}
