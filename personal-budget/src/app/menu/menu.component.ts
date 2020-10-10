import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public colors = [
    '#0074D9',
    '#FF4136',
    '#2ECC40',
    '#FF851B',
    '#7FDBFF',
    '#B10DC9',
    '#FFDC00',
    '#39CCCC',
    '#39CCCC',
    '#01FF70',
    '#85144b',
    '#F012BE',
    '#3D9970',
    '#111111',
    '#AAAAAA',
  ]

  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: this.colors
      }
    ],
    labels: []
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        for (let i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
          this.createChart();
        }
      });
  }

  // tslint:disable-next-line: typedef
  public createChart() {
    const ctx = document.getElementById('myChart');
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
    });
  }

}
