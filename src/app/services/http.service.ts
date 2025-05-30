import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { AuthService } from './auth.service';
import { SwalService } from './swal.service';
import { api } from '../constants';
import { ErrorService } from './error.service';
import { ResultModel } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  @Input() isLoading:boolean = false;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private error: ErrorService
  ) { }

  post<T>(apiUrl:string, body:any, callBack:(res:T) => void, errorCallBack?:() => void){
    this.http.post<ResultModel<T>>(`${api}${apiUrl}`, body,{
      headers:{
        "Authorization": "Bearer " + this.auth.token
      }
    }).subscribe({
      next:(res) => {
        if(res.data){
          callBack(res.data);
        }
      },
      error: (err:HttpErrorResponse) => {
        this.error.errorHandler(err);
        if(errorCallBack){
          errorCallBack();
        }
        this.isLoading = false;
      }
    });
  }

  get<T>(apiUrl:string, callBack:(res:T) => void, errorCallBack?:() => void){
    this.http.get<ResultModel<T>>(`${api}${apiUrl}`, {
      headers:{
        "Authorization": "Bearer " + this.auth.token
      }
    }).subscribe({
      next:(res) => {
        if(res.data){
          callBack(res.data);
        }
      },
      error: (err:HttpErrorResponse) => {
        this.error.errorHandler(err);
        if(errorCallBack){
          errorCallBack();
        }
      }
    })
  }
}
