import { Log as LogInterface, type Metadata } from '#types/log'

export class Log implements LogInterface {
  private provider: string
  private cacheStatus: string
  private metadata: Metadata
  protected headers: string[]

  constructor(provider: string, cacheStatus: string, metadata: Metadata) {
    this.provider = provider
    this.cacheStatus = cacheStatus
    this.metadata = metadata
    this.headers = []
  }

  toString(): string {
    this.provider.toUpperCase().replaceAll('-', ' ')
    const { request, response } = this.metadata

    return `"${this.provider}" ${request.method} ${response.statusCode} ${request.url} ${response.timeTaken} ${response.size} ${this.cacheStatus}`
  }
}
