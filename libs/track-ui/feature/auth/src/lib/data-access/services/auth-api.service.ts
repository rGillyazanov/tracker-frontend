import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthApiService {
  constructor(private readonly _http: HttpClient) {}
}
