import { MinhaCDNLogExtractor } from '#adapters/minha_cdn_log_extractor'
import { MinhaCDNLogReader } from '#adapters/minha_cdn_log_reader'
import {
  type LogExtractorContract,
  type LogFactoryContract,
  type LogReaderContract,
} from '#types/log'

export class MinhaCDNLogFactory implements LogFactoryContract {
  createReader(): LogReaderContract {
    return new MinhaCDNLogReader()
  }

  createExtractor(): LogExtractorContract {
    return new MinhaCDNLogExtractor()
  }
}
