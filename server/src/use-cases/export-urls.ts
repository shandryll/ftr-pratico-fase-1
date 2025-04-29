import type { IUrlsRepository } from '@/repositories/urls-repository'
import { transformDateInCSV } from '@/utils/dates'
import { databaseTableNameToCSV } from '@/utils/handlerDatabaseTableNameToCSV'
import { stringify } from 'csv-stringify/sync'
import { NoContentResponse } from './responses/no-content-response'

export class ExportUrlsUseCase {
  constructor(private urlsRepository: IUrlsRepository) {}

  async execute(): Promise<string | NoContentResponse> {
    const urls = await this.urlsRepository.fetchUrls()

    if (urls.length === 0) {
      return new NoContentResponse()
    }

    const csv = stringify(urls, {
      delimiter: ',',
      header: true,
      columns: databaseTableNameToCSV,
    })

    const transformedCSV = transformDateInCSV(csv)

    return transformedCSV
  }
}
