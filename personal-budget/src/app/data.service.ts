import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public d3data = {};
  public d3labels = [];
  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          'violet',
          'brown',
          'purple',
          'cyan',
          'orange'
        ]
      }
    ],
    labels: []
  };
  constructor(private http: HttpClient) {

  }
  // tslint:disable-next-line: typedef
  public getdata() {

    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        this.d3data[res.myBudget[i].title] = res.myBudget[i].budget;
        this.d3labels[i] = res.myBudget[i].title;
      }
    });
  }
}
