import { CodeCLAError } from './exceptions';

export class ServiceResponseSuccess<T> {
  constructor(
    public data: T,
    public resourceCreated = false,
  ) {}

  getHttpResponse(): { status: string; data: T } {
    return {
      status: 'success',
      data: this.data,
    };
  }

  getHttpStatus(): number {
    return this.resourceCreated ? 201 : 200;
  }
}

export class ServiceResponseFailure {
  constructor(public error: CodeCLAError) {}

  getHttpResponse(): { status: string; message: string; error: string } {
    return {
      status: 'error',
      message: this.error.getMessage(),
      error: this.error.name,
    };
  }

  getHttpStatus(): number {
    return this.error.getHttpCode() || 500;
  }
}
