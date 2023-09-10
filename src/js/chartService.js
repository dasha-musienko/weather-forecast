import Chart from 'chart.js/auto';

export function createsChart(tempValues) {
  let ctx = document.getElementById('chart').getContext('2d');

  let gradient = ctx.createLinearGradient(0, -10, 0, 100);
  gradient.addColorStop(0, 'rgba(250, 0, 0, 1)');
  gradient.addColorStop(1, 'rgba(136, 255, 0, 1)');

  tempValues.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: tempValues.labels,
      datasets: [
        {
          label: 'Celcius Degrees',
          data: tempValues.data,
          borderColor: gradient,
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 2,
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
          grid: {
            drawOnChartArea: false,
          },
          gridLines: {
            display: false,
          },
        },
        y1: {
          type: 'linear',
          display: false,
          position: 'left',
          title: {
            display: false,
            text: 'Capital Partners',
          },
          ticks: {
            color: 'transparent',
          },
          grid: {
            drawOnChartArea: false,
          },
          gridLines: {
            display: false,
          },
        },
      },

      animation: {
        duration: 750,
      },
    },
  });
}
