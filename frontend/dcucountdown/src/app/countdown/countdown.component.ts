import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectResponse, CountdownService } from '../services/countdown.service';
import { CountdownPipe } from '../pipes/countdown.pipe';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule, CountdownPipe],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css'
})
export class CountdownComponent implements OnInit {
  project: Project | null = null;
  loading = true;
  error = false;
  
  constructor(private countdownService: CountdownService) {}
  
  ngOnInit(): void {
    this.loadNextRelease();
  }
  
  loadNextRelease(): void {
    this.loading = true;
    this.error = false;
    
    this.countdownService.getNextRelease().subscribe({
      next: (data: ProjectResponse) => {
        if (data && data.project) {
          this.project = data.project;
        } else {
          this.loadLastRelease();
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = true;
        this.loading = false;
        this.loadAllProjects();
      }
    });
  }
  
  loadLastRelease(): void {
    this.countdownService.getLastRelease().subscribe({
      next: (data: ProjectResponse) => {
        if (data && data.project) {
          this.project = data.project;
        } else {
          this.loadAllProjects();
        }
        this.loading = false;
      },
      error: (error) => {
        this.loadAllProjects();
      }
    });
  }
  
  loadAllProjects(): void {
    this.countdownService.getProjects().subscribe({
      next: (data: Project[]) => {
        if (data && data.length > 0) {
          this.project = data[0];
        } else {
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}
