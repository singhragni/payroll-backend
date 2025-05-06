// src/common/interceptors/response.interceptor.ts

import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { ResponseWrapper } from '../dto/response-wrapper.dto';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseWrapper<T>> {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<ResponseWrapper<T>> {
      return next.handle().pipe(
        map((data) => {
          // Check the context for the HTTP status code set by the controller
          const statusCode = context.switchToHttp().getResponse().statusCode || HttpStatus.OK;
  
          // Wrap the data in a ResponseWrapper object with status code
          return ResponseWrapper.success('Request successful', data, statusCode);
        }),
      );
    }
  }
  