import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const myToken=localStorage.getItem('astrologicalReportToken');
  const cloneRequest=req.clone({
    setHeaders:{
      Authozrization:`Bearer ${myToken}`
    }
  });
  return next(cloneRequest);
};
