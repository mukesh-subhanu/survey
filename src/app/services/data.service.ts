import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of,throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private memberUrl='api/members';

  constructor(private http:HttpClient) { }
  
    getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.memberUrl).pipe(
   
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

    getMember(id: number): Observable<Member> {
    
    
    const url = `${this.memberUrl}/${id}`;
    return this.http.get<Member>(url)
      .pipe(
        tap(data => console.log('getMember: ' + JSON.stringify(data))),
      );
  }

  createMember(member: Member): Observable<Member> {
       const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    

    console.log(member)
    return this.http.post<Member>(this.memberUrl,(member),{headers})
     .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
      );
  }

  editMember(member: Member): Observable<any> {
      const url = `${this.memberUrl}/${member.id}`;
       const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<Member>(url, member, {headers})
      .pipe(
        tap(() => console.log('updateMember: ' + member.id)),
        map(() => member),
      );
  }

  deleteMember(id: number): Observable<any> {
     const url = `${this.memberUrl}/${id}`;
    return this.http.delete<Member>(url, )
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
      );
  }



  }

