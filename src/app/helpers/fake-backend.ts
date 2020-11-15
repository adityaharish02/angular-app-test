import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6ZmFsc2V9.DLTdOwxPMgCsXA9p2WDJvwimoQvL2Q6Yyn_sm6B4KRE
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor{

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        console.log(body);

        return of(null)
            .pipe(mergeMap(handleRoute))
            // .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            // .pipe(delay(500))
            // .pipe(dematerialize())
            ;

        function handleRoute() {
            switch (true) {
                case url.endsWith('/api/authenticate') && method === 'POST':
                    console.log('Entered authenticate');
                    return authenticate();
                case url.endsWith('/api/orders') && method === 'GET':
                    console.log('Entered Get Orders API', headers);
                    return authenticate_order();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        function authenticate() {

            if (body.email === 'hello@domain.com' && body.password === '1234'){
                console.log(body.email + '-' + body.password);
                return ok({
                    token: token
                })
            }
            else{
                //console.log(email + '-' + password);
                return noMatch();
            }
        }

        function authenticate_order() {
            if (headers.get('Authorization') === 'Bearer' + token) {
                console.log ('True');
                return ok({
                    orderArray: [1, 2, 3]
                })
            }
            else {
                console.log ('False');
                return noMatch();
            }
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function noMatch(){
            return of(new HttpResponse({ status: 200 }))
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};