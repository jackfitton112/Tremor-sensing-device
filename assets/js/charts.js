
  const labels = ["1","2","3","4","5","6","7","8","9","10",];

  const data = {
    labels: labels,
    datasets: [{
      label: 'X',
      backgroundColor: 'rgb(255, 99, 132, 0.25)',
      borderColor: 'rgb(255, 99, 132, 0.4)',
      data: [0,0,0,0,0,0,0,0,0,0],
      tension: 0.1,
      borderWidth: 1
    },
    {
      label: 'Y',
      backgroundColor: 'rgb(30,144,255, 0.25)',
      borderColor: 'rgb(30,144,255, 0.4)',
      data: [0,0,0,0,0,0,0,0,0,0],
      tension: 0.1,
      borderWidth: 1
    },{
      label: 'Z',
      backgroundColor: 'rgb(124,252,0, 0.25)',
      borderColor: 'rgb(124,252,0, 0.4)',
      data: [0,0,0,0,0,0,0,0,0,0],
      tension: 0.1,
      borderWidth: 1
    },{
      label: 'Average',
      backgroundColor: 'rgb(0,0,0)',
      borderColor: 'rgb(0,0,0)',
      data: [0,0,0,0,0,0,0,0,0,0],
      tension: 0.5,
      borderWidth: 1
    },


  ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );



function updatechart(){

fetch("https://med.clockr.net/getdata.php?token=d640914b3434813dd0240cf7d18fdd5d")
.then(x => x.json())
.then(f => {
  let x = f.x;
  let y= f.y;
  let z = f.z;
  let avg = f.avg;
  let count = f.count;
  myChart.config.data.labels = count;
  myChart.config.data.datasets[0].data = x;
  myChart.config.data.datasets[1].data = y;
  myChart.config.data.datasets[2].data = z;
  myChart.config.data.datasets[3].data = avg;
  myChart.update();
})



}

setInterval(updatechart, 100);


const label = ["1","2","3","4","5","6","7","8","9","10",];

const dat = {
  labels: label,
  datasets: [{
    label: '',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0,0,0,0,0,0,0,0,0,0],
    tension: 0.1,
    borderWidth: 1
  }


]
};

const config1 = {
  type: 'line',
  data: dat,
  options: {
    animation: {
          duration: 0 // general animation time}
},
},
}

const mYChart = new Chart(
  document.getElementById('MYChart'),
  config1
);

/*
function updatechartF(){

fetch("http://med.clockr.net/fft.php")
.then(x => x.json())
.then(f => {
  let trans = f.trans;
  let count = f.count;
  mYChart.config.data.labels = count;
  mYChart.config.data.datasets[0].data = trans;
  mYChart.update();
})

}

setInterval(updatechartF, 100);
*/
