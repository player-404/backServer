import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MongoServerError } from 'mongodb';
import { Response } from 'express';

interface IErrors {
  path: string;
  message: string;
  type: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    // mongoose验证器错误
    if (exception.errors) {
      const firstErrorKey = Object.keys(exception.errors)[0];
      const error = exception.errors as Record<
        string,
        { properties?: IErrors }
      >;
      if (error[firstErrorKey]?.properties) {
        const properties = error[firstErrorKey].properties;
        response.status(400).json({
          msg: properties.message,
          code: 400,
        });
      }
    } else {
      // mongodb 错误
      const mongoError = exception.errorResponse;
      console.log('mongo error', mongoError);
      if (mongoError.code === 11000) {
        response.status(400).json({
          msg: '数据已存在',
          code: 400,
          data: mongoError.keyValue as unknown,
        });
      }
    }

    return {
      msg: '出错了',
      code: 500,
    };
  }
}
