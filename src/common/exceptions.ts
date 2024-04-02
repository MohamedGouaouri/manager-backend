export class CodeCLAError extends Error {
  constructor(message = 'DBOperationException') {
    super(message);
    this.message = message;
    this.name = 'DBOperationException';
  }
  getHttpCode(): number {
    return 500;
  }
  getMessage(): string {
    return this.message;
  }
}
export class DBOperationException extends CodeCLAError {
  constructor(message = 'DBOperationException') {
    super(message);
    this.message = message;
    this.name = 'DBOperationException';
  }
}

export class ResourceNotFoundException extends CodeCLAError {
  constructor(message = 'ResourceNotFoundException') {
    super(message);
    this.message = message;
    this.name = 'ResourceNotFoundException';
  }

  getHttpCode(): number {
    return 404;
  }
}

export class ResourceRestriction extends CodeCLAError {
  constructor(message = 'ResourceRestriction') {
    super(message);
    this.message = message;
    this.name = 'ResourceRestriction';
  }

  getHttpCode(): number {
    return 401;
  }
}
