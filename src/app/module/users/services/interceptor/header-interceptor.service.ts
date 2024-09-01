
import {HttpInterceptorFn } from "@angular/common/http";

export const HeaderInterceptorService:HttpInterceptorFn=(req,next)=> {
  const token= localStorage.getItem("token");
      req=req.clone({
        setHeaders:{
            'Authorization':'Bearer '+token  // must give space after Bearer

            }
    });
return next(req);
}
