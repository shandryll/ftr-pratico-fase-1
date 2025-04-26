import type { UrlDataToCSV } from '@/types/url-data-to-csv'
import type { IExportsRepository } from '../exports-repository'

export class InMemoryExportsRepository implements IExportsRepository {
  public urls: UrlDataToCSV[] = []

  async exportUrls() {
    return this.urls
  }
}
