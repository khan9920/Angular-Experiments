import { Component, OnInit } from '@angular/core';

import { girls_head_circumference_for_age_0_to_24_months } from 'src/app/utils/growth-chart-data-points/girls_head_circumference_for_age_0_to_24_months';
import { girls_head_circumference_for_age_24_to_72_months } from 'src/app/utils/growth-chart-data-points/girls_head_circumference_for_age_24_to_72_months';

import { girls_weight_for_age_0_to_24_months } from 'src/app/utils/growth-chart-data-points/girls_weight_for_age_0_to_24_months';
import { girls_weight_for_age_24_to_72_months } from 'src/app/utils/growth-chart-data-points/girls_weight_for_age_24_to_72_months';
import { girls_weight_for_age_4_to_18_years } from 'src/app/utils/growth-chart-data-points/girls_weight_for_age_4_to_18_years';

import { girls_height_for_age_0_to_24_months } from 'src/app/utils/growth-chart-data-points/girls_height_for_age_0_to_24_months';
import { girls_height_for_age_24_to_72_months } from 'src/app/utils/growth-chart-data-points/girls_height_for_age_24_to_72_months';
import { girls_height_for_age_4_to_18_years } from 'src/app/utils/growth-chart-data-points/girls_height_for_age_4_to_18_years';

import { girls_bmi_0_to_24_months } from 'src/app/utils/growth-chart-data-points/girls_bmi_0_to_24_months';
import { girls_bmi_24_to_72_months } from 'src/app/utils/growth-chart-data-points/girls_bmi_24_to_72_months';
import { girls_bmi_6_to_18_years } from 'src/app/utils/growth-chart-data-points/girls_bmi_6_to_18_years';

declare function display_custom_growth_chart(patient: any, el: any, chartType: any, data_points: any): any;

@Component({
  selector: 'app-growth-chart',
  templateUrl: './growth-chart.component.html',
  styleUrls: ['./growth-chart.component.scss']
})
export class GrowthChartComponent implements OnInit {

  public chartTypes: any[] = [
    { value: 'girls_head_circumference_for_age_0_to_24_months', option: 'Head Circumference G 0 to 24 months' },
    { value: 'girls_head_circumference_for_age_24_to_72_months', option: 'Head Circumference G 24 to 72 months' },

    { value: 'girls_weight_for_age_0_to_24_months', option: 'Weight G 0 to 24 months' },
    { value: 'girls_weight_for_age_24_to_72_months', option: 'Weight G 24 to 72 months' },
    { value: 'girls_weight_for_age_4_to_18_years', option: 'Weight G 4 to 18 years' },

    { value: 'girls_height_for_age_0_to_24_months', option: 'Height G 0 to 24 months' },
    { value: 'girls_height_for_age_24_to_72_months', option: 'Height G 24 to 72 months' },
    { value: 'girls_height_for_age_4_to_18_years', option: 'Height G 4 to 18 years' },

    { value: 'girls_bmi_0_to_24_months', option: 'BMI G 0-24 months' },
    { value: 'girls_bmi_24_to_72_months', option: 'BMI G 24 to 72 months' },
    { value: 'girls_bmi_6_to_18_years', option: 'BMI G 6 to 18 years' },
  ]
  constructor() {

  }

  ngOnInit() {
    display_custom_growth_chart(
      patientGrowth,
      '#drawCustomHere',
      'girls_head_circumference_for_age_0_to_24_months',
      girls_head_circumference_for_age_0_to_24_months
    );
  }

  onChangeGraph(event: any) {
    let data_points: any;

    // Assign data points based on the selected chart type 
    switch (event.target.value) {
      // GIRLS HEAD CIRCUMFERENCE - AGE 0 - 24 MONTHS
      case 'girls_head_circumference_for_age_0_to_24_months':
        data_points = girls_head_circumference_for_age_0_to_24_months;
        break;

      // GIRLS HEAD CIRCUMFERENCE - AGE - 24 - 72 MONTHS
      case 'girls_head_circumference_for_age_24_to_72_months':
        data_points = girls_head_circumference_for_age_24_to_72_months;
        break;

      // GIRLS WEIGHT - AGE - 0 - 24 MONTHS
      case 'girls_weight_for_age_0_to_24_months':
        data_points = girls_weight_for_age_0_to_24_months;
        break;

      // GIRLS WEIGHT - AGE - 24 - 72 MONTHS
      case 'girls_weight_for_age_24_to_72_months':
        data_points = girls_weight_for_age_24_to_72_months;
        break;

      // GIRLS WEIGHT - AGE - 4 - 18 YEARS
      case 'girls_weight_for_age_4_to_18_years':
        data_points = girls_weight_for_age_4_to_18_years;
        break;

      // GIRLS WEIGHT - AGE - 0 - 24 MONTHS
      case 'girls_height_for_age_0_to_24_months':
        data_points = girls_height_for_age_0_to_24_months;
        break;

      // GIRLS HEIGHT - AGE - 24 - 72 MONTHS
      case 'girls_height_for_age_24_to_72_months':
        data_points = girls_height_for_age_24_to_72_months;
        break;

      // GIRLS HEIGHT - AGE - 4  - 18 YEARS
      case 'girls_height_for_age_4_to_18_years':
        data_points = girls_height_for_age_4_to_18_years;
        break;

      // GIRLS BMI - 0 - 24 MONTHS
      case 'girls_bmi_0_to_24_months':
        data_points = girls_bmi_0_to_24_months;
        break;

      // GIRLS BMI - 24 - 72 MONTHS
      case 'girls_bmi_24_to_72_months':
        data_points = girls_bmi_24_to_72_months;
        break;

      // GIRLS BMI - 6- 18 YEARS
      case 'girls_bmi_6_to_18_years':
        data_points = girls_bmi_6_to_18_years;
        break;

      default:
        break;
    }

    display_custom_growth_chart(
      patientGrowth,
      '#drawCustomHere',
      event.target.value || 'girls_head_circumference_for_age_0_to_24_months',
      data_points
    );
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
  // [16.67, 6.8],
  // [17.9, 7.7],
  // [19.3, 7.9],
  // [22.23, 7.5],
  // [24.2, 8.2],
  // [26.07, 9.6],
  // [28.4, 9.5],
  // [30, 9.4],
  // [31, 10.7],
  // [32, 12.1],
  // [33, 13.8],
  // [60, 18.3],
];