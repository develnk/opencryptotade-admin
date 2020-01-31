import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const re = /uaa\/oauth\/token/gi;
        if (req.url.search(re)  === -1) {
            const authReq = req.clone({
                headers: req.headers.set('Content-Type', 'application/json; charset=utf-8')
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}
