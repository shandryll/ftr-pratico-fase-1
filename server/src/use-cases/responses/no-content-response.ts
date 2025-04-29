export class NoContentResponse {
  public readonly message: string

  constructor(message = 'No content available.') {
    this.message = message
  }
}
