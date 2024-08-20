import { type PathLike } from 'node:fs'
import { type FileHandle } from 'node:fs/promises'

import { type Log as LogEntity } from '#entities/log'

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

export interface LogReader {
  read(path: Path): Promise<NodeJS.ReadableStream | null>
}

export interface LogExtractor {
  extract(content: string): LogEntity | null
  getHeader(): string
}

export interface LogFactory {
  createReader(): LogReader
  createExtractor(): LogExtractor
}

export interface Log {
  toString(): string
}
