import type { IUrlsRepository } from '@/repositories/urls-repository'
import { databaseTableNameToCSV } from '@/utils/handlerDatabaseTableNameToCSV'
import { stringify } from 'csv-stringify/sync'

export class TransformDataFromUrlsToCSVUseCase {
  constructor(private urlsRepository: IUrlsRepository) {}

  async execute(): Promise<string> {
    const urls = await this.urlsRepository.fetchUrls()

    if (urls.length === 0) {
      return ''
    }

    const csv = stringify(urls, { header: true, columns: databaseTableNameToCSV })
    return csv
  }
}
