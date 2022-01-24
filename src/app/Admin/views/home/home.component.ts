import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import {
  BarChartOption,
  ChartData,
  ChartOption,
  ChartView,
  PieChartView,
} from 'ngx-chart';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  template: `
    
  `,
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: HomeService) {}
  data: any;
  etat: any;
  nbe?: any;

  resulst: any = [];
  resulst2: any = [];

  pieView: PieChartView = {
    height: 400,
    width: 400,
    radius: 100,
  };
  chartOptions: ChartOption = {
    showLegend: true,
    legendTitle: 'Total',
  };

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getDataS1().subscribe((res) => {
      this.data = res;
      this.resulst = res;

      // this.etat = this.data
      //  this.chartData.push(this.resulst)
      // console.log(this.chartData)
      // this.chartData = [...this.chartData]
      console.log(this.resulst);
    });

    this.service.getDataS2().subscribe((res) => {
      this.data = res;
      this.resulst2 = res;

      // this.etat = this.data
      //  this.chartData.push(this.resulst)
      // console.log(this.chartData)
      // this.chartData = [...this.chartData]
      console.log(this.resulst);
    });
  }
}
