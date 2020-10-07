import { AdminStatisticsDTO } from './../../../core/models/adminStatisticsDTO';
import { DataService } from 'src/app/core/service/data.service';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit {

  pageLoading: boolean;
  errorMessage: string;
  response: any;
  statistics: AdminStatisticsDTO;
  chart1Canvas;
  chart1CTX;
  chart2Canvas;
  chart2CTX;
  chart3Canvas;
  chart3CTX;
  chart4Canvas;
  chart4CTX;

  constructor(private service: DataService) { }

  ngOnInit() {
    this.pageLoading = true;
    this.service.getStatisticsData().subscribe(
      data => {
        this.response = data;
        this.statistics = this.response.response;
        this.response = undefined;
        this.generateChart1();
        this.generateChart2();
        this.generateChart3();
        this.generateChart4();
        this.pageLoading = false;
      },
      err => {
        console.log(err);
        this.response = err;
        this.errorMessage = this.response.error.eror.message;
        this.response = undefined;
        this.pageLoading = false;
      }
    );
  }

  generateChart1() {
    if (this.statistics.productCategories.length == 0) {
      let element = document.getElementById('chart1Warning');
      element.innerHTML = "No Data found...";
      return;
    }
    if (this.statistics.productCategories.includes('Gift Card')) {
      let indexOfGiftCard = this.statistics.productCategories.indexOf('Gift Card');
      this.statistics.productCategories.splice(indexOfGiftCard, 1);
      this.statistics.productCountByCategory.splice(indexOfGiftCard, 1);
    }
    this.chart1CTX = document.getElementById('chart1');
    this.chart1CTX = this.chart1CTX.getContext('2d');
    let colorSet = [];
    this.statistics.productCategories.forEach(
      product => {
        colorSet.push(getRandomColor());
      }
    )
    let myChart = new Chart(this.chart1CTX, {
      type: 'pie',
      data: {
        labels: this.statistics.productCategories,
        datasets: [{
          label: '# of Products',
          data: this.statistics.productCountByCategory,
          backgroundColor: colorSet,
          hoverBackgroundColor: "rgba(0, 0, 0, 1)",
          hoverBorderColor: "orange",
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        display: true,
      }
    });
  }

  generateChart2() {
    if (this.statistics.purchaseTimes.length == 0) {
      let element = document.getElementById('chart2Warning');
      element.innerHTML = "No Data found...";
      return;
    }
    this.chart2CTX = document.getElementById('chart2');
    this.chart2CTX = this.chart2CTX.getContext('2d');
    let colorSet = [];
    this.statistics.purchaseTimes.forEach(
      product => {
        colorSet.push(getRandomColor());
      }
    )
    let myChart = new Chart(this.chart2CTX, {
      type: 'bar',
      data: {
        labels: this.statistics.purchaseTimes,
        datasets: [{
          label: '# of Purchases',
          data: this.statistics.purchaseTimesCount,
          backgroundColor: colorSet,
          hoverBackgroundColor: "rgba(0, 0, 0, 1)",
          hoverBorderColor: "orange",
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        display: true,
      }
    });
  }

  generateChart3() {
    if (this.statistics.topSellingProducts.length == 0) {
      let element = document.getElementById('chart3Warning');
      element.innerHTML = "No Data found...";
      return;
    }
    this.chart3CTX = document.getElementById('chart3');
    this.chart3CTX = this.chart3CTX.getContext('2d');
    let colorSet = [];
    this.statistics.topSellingProducts.forEach(
      product => {
        colorSet.push(getRandomColor());
      }
    )
    let myChart = new Chart(this.chart3CTX, {
      type: 'doughnut',
      data: {
        labels: this.statistics.topSellingProducts,
        datasets: [{
          label: 'Top Selling Products',
          data: this.statistics.topSellingProductsCount,
          backgroundColor: colorSet,
          hoverBackgroundColor: "rgba(0, 0, 0, 1)",
          hoverBorderColor: "orange",
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        display: true,
      }
    });
  }

  generateChart4() {
    if (this.statistics.usersJoiningDate.length == 0) {
      let element = document.getElementById('chart4Warning');
      element.innerHTML = "No Data found...";
      return;
    }
    this.chart4CTX = document.getElementById('chart4');
    this.chart4CTX = this.chart4CTX.getContext('2d');
    let colorSet = [];
    this.statistics.usersJoiningDate.forEach(
      product => {
        colorSet.push(getRandomColor());
      }
    )
    let myChart = new Chart(this.chart4CTX, {
      type: 'horizontalBar',
      data: {
        labels: this.statistics.usersJoiningDate,
        datasets: [{
          label: 'Users Joining Rate',
          data: this.statistics.usersJoiningDateCount,
          backgroundColor: colorSet,
          hoverBackgroundColor: "rgba(0, 0, 0, 1)",
          hoverBorderColor: "orange",
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        display: true,
      }
    });
  }

}


function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
