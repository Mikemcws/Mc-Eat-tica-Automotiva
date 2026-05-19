const ctx = document.getElementById('revenueChart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun'
    ],
    datasets: [{
      label: 'Faturamento',
      data: [
        12000,
        19000,
        15000,
        22000,
        18000,
        26000
      ],
      borderColor: '#d4af37',
      backgroundColor: 'rgba(212,175,55,0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor:'#d4af37',
      pointRadius:5
    }]
  },

  options: {
    responsive:true,

    plugins:{
      legend:{
        labels:{
          color:'#fff'
        }
      }
    },

    scales:{
      x:{
        ticks:{
          color:'#aaa'
        },
        grid:{
          color:'rgba(255,255,255,0.05)'
        }
      },

      y:{
        ticks:{
          color:'#aaa'
        },
        grid:{
          color:'rgba(255,255,255,0.05)'
        }
      }
    }
  }
});