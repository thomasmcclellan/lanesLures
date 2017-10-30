import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { AuthService } from "./auth.service";
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataStorageService {
  constructor(
    private authService: AuthService
  ) {}
}