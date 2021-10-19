import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GrowthChartComponent } from './components/growth-chart/growth-chart.component';
import { GrowthChartTsComponent } from './components/growth-chart-ts/growth-chart-ts.component';

@NgModule({
  declarations: [
    AppComponent,
    GrowthChartComponent,
    GrowthChartTsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
