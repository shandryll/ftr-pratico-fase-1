export class ShortlinkAlreadyExistsError extends Error {
  constructor() {
    super('Shortlink already exists.')
  }
}
