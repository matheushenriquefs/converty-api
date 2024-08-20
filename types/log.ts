import { type PathLike } from 'node:fs'
import { type FileHandle } from 'node:fs/promises'

import { type Log } from '#entities/log'

export type Provider = 'minha-cdn'

export type Metadata = {
  request: {
    method: string
    url: string
  }
  response: {
    size: number
    statusCode: number
    timeTaken: number
  }
}

type BasePath = PathLike | FileHandle

export type Path = string | BasePath | URL

export interface LogReaderContract {
  read(path: Path): Promise<NodeJS.ReadableStream | null>
}

export interface LogExtractorContract {
  extract(content: string): Log | null
  getHeader(): string
}

export interface LogFactoryContract {
  createReader(): LogReaderContract
  createExtractor(): LogExtractorContract
}

export interface LogContract {
  toString(): string
}
