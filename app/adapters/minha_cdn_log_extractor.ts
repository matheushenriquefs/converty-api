import { DateTime } from 'luxon'

import { Log } from '#entities/log'
import { type Provider, LogExtractorContract } from '#types/log'

enum CacheStatus {
  HIT = 'HIT',
  MISS = 'MISS',
  REFRESH_HIT = 'REFRESH_HIT',
}

export class MinhaCDNLogExtractor implements LogExtractorContract {
  private pattern: RegExp =
    /(\d+)\|(\d+)\|(\w+)\|"(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH) ([^ ]+) HTTP\/\d(?:\.\d)?"\|(\d+(?:\.\d+)?)/
  private provider: Provider = 'minha-cdn'
  private header: string[]

  private getCacheStatus(status: string): string {
    switch (status) {
      case 'INVALIDATE':
        return CacheStatus.REFRESH_HIT
      case CacheStatus.HIT:
        return status
      case CacheStatus.MISS:
        return status
      default:
        return CacheStatus.MISS
    }
  }

  constructor() {
    const date = DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss')
    this.header = [
      '#Version: 1.0',
      `#Date: ${date}`,
      '#Fields: provider http-method status-code uri-path time-taken response-size cache-status',
    ]
  }

  extract(content: string): Log | null {
    const provider = this.provider.toUpperCase().replaceAll('-', ' ')
    const match = this.pattern.exec(content)

    if (!match) {
      return null
    }

    let [, size, statusCode, cacheStatus, method, url, timeTaken] = match
    cacheStatus = this.getCacheStatus(cacheStatus)
    const formattedTimeTaken = Math.round(Number.parseFloat(timeTaken))
    const metadata = {
      request: {
        method,
        url,
      },
      response: {
        size: Number(size),
        statusCode: Number(statusCode),
        timeTaken: formattedTimeTaken,
      },
    }

    return new Log(provider, cacheStatus, metadata)
  }

  getHeader(): string {
    return this.header.join('\n')
  }
}
