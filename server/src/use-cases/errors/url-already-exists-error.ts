export class UrlAlreadyExistsError extends Error {
  constructor() {
    super('Url already exists.')
  }
}
