import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify/sync'

interface CsvRecord {
  'URL original': string
  'URL encurtada': string
  'Contagem de acessos': number
  'Data de criação': string
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  return date.toLocaleString('pt-BR', { timeZone: 'UTC' })
}

export function transformDateInCSV(csv: string): string {
  const records: CsvRecord[] = parse(csv, {
    columns: true,
    skip_empty_lines: true,
  })

  const modifiedRecords: CsvRecord[] = records.map((record: CsvRecord) => {
    if (record['Data de criação']) {
      record['Data de criação'] = formatDate(Number(record['Data de criação']))
    }
    return record
  })

  const modifiedCSV = stringify(modifiedRecords, {
    header: true,
    columns: Object.keys(modifiedRecords[0]),
  })

  return modifiedCSV
}
