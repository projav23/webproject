const scoreInd = document.querySelector("#score").value
const games = document.querySelector("#games").value
const perdidos = games - scoreInd

console.log(scoreInd)
console.log(games)
function ChartStats(){
  const canvas = document.getElementById('my-canvas')

  const ctx = canvas.getContext('2d')
  // ctx.clearRect(0,0,300,300)
    let data = {
      labels: ["Perdidos ", "Ganados"],
        datasets: [
          {
              fill: true,
              backgroundColor: [
                  'red',
                  'green'],
              data: [perdidos, scoreInd ],
    // Notice the borderColor 
              borderColor:	['black', 'black'],
              borderWidth: [1,1]
          }
      ]
    };
    let options = {
      title: {
                display: true,
                text: '% Victorias/Derrotas',
                position: 'top'
            },
      rotation: -0.7 * Math.PI
    };
  
      const myBarChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
      });
}
ChartStats()