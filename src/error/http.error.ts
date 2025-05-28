import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MongoServerError } from 'mongodb';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const mongoError = exception.errorResponse;

    if (mongoError.code === 11000) {
      response.status(400).json({
        msg: '数据已存在',
        code: 400,
        data: mongoError.keyValue as unknown,
      });
      return;
    }
    return {
      msg: '出错了',
    };
  }
}
