import { MinhaCDNLogExtractor } from '#adapters/minha_cdn_log_extractor'
import { MinhaCDNLogReader } from '#adapters/minha_cdn_log_reader'
import { type LogExtractor, type LogFactory, type LogReader } from '#types/log'

export class MinhaCDNLogFactory implements LogFactory {
  createReader(): LogReader {
    return new MinhaCDNLogReader()
  }

  createExtractor(): LogExtractor {
    return new MinhaCDNLogExtractor()
  }
}
