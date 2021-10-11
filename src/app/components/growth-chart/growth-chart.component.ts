import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

declare function display_growth_chart(patient: any, el: any, chartType: any ) : any;

@Component({
  selector: 'app-growth-chart',
  templateUrl: './growth-chart.component.html',
  styleUrls: ['./growth-chart.component.scss']
})
export class GrowthChartComponent implements OnInit {

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document : any
  ) {
    
  }

  ngOnInit() {
    let script = this._renderer2.createElement('script');

    script.var = patientGrowth;
    script.growthChart = display_growth_chart(patientGrowth, 'body' , 'wfa_haiti_0_to_5')
    
    script.type = `application/ld+json`;
    this._renderer2.appendChild(this._document.body, script);
  }
}

const patientGrowth = [
  [5.27, 7.4],
  [6.17, 7.2],
  [6.9, 7.3],
  [8.03, 7.0],
  [9.37, 7.2],
  [12, 6.4],
  [12.53, 6.4],
  [13.7, 6.7],
  [14.83, 6.8],
  [16.67, 6.8],
  [17.9, 7.7],
  [19.3, 7.9],
  [22.23, 7.5],
  [24.2, 8.2],
  [26.07, 9.6],
  [28.4, 9.5],
  // [30, 9.4],
  // [31, 10.7],
  // [32, 12.1],
  // [33, 13.8],
  // [60, 18.3],
];