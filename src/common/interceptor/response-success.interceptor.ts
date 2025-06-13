import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseSuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    const statusCode = res.statusCode;
    const baseUrl = `http://localhost:3070/api-docs`;
    const methodName = context.getHandler().name;
    const controllerName = context.getClass().name;
    const tag = controllerName.replace('Controller', '');
    const docUrl = `${baseUrl}#${tag}/${controllerName}_${methodName}`;

    const now = new Date;
    return next.handle().pipe(
      map((data) => {
        return {
          status: 'Success',
          statusCode: statusCode,
          data,
          doc: docUrl,
          datetime: now.toLocaleString()
        };
      }),
    );
  }
}
