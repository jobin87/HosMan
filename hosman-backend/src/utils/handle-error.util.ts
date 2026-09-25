import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export async function handleError<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (error instanceof HttpException) {
      throw error;
    }
    const logger = new Logger('HandleErrorUtil');
    logger.error('Unhandled Exception Caught', error?.stack || error);
    throw new InternalServerErrorException({
      statusCode: 500,
      success: false,
      message: error?.message || 'Internal Server Error',
    });
  }
}
