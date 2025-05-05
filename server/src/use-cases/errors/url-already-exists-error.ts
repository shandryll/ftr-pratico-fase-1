export class UrlAlreadyExistsError extends Error {
  constructor() {
    super('A URL já existe.')
  }
}
