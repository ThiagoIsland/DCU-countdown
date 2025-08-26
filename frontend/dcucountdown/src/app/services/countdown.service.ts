import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReleaseDates {
    theatrical?: string;
    pvod?: string;
    streaming?: string;
  }
  
  export interface Project {
    slug: string;
    title: string;
    type: string;
    chapter: string;
    status: string;
    release: ReleaseDates;
  }

  export interface ProjectResponse {
    project: Project;
    nextDate?: string;
    lastDate?: string;
  }

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
    constructor (public http: HttpClient){ }

    getProjects(): Observable<Project[]>{
        return this.http.get<Project[]>('https://localhost:7242/api/projects');
    }
    getNextRelease(): Observable<ProjectResponse>{
        return this.http.get<ProjectResponse>('https://localhost:7242/api/nextRelease');
    }
    getLastRelease(): Observable<ProjectResponse>{
        return this.http.get<ProjectResponse>('https://localhost:7242/api/lastRelease');
    }
}
