//Varibales partido tenis individual
const scoreInd = document.querySelector("#score").value
const games = document.querySelector("#games").value
const perdidos = games - scoreInd

//Variables partidos tenis dobles
const scoreDob = document.querySelector("#scoreDob").value
const gamesDob = document.querySelector("#gamesDob").value
const perdidosDob = gamesDob - scoreDob

//Variables partidos padel individual
const scorePadelInd = document.querySelector("#scorePadInd").value
const gamesIndPadel = document.querySelector("#gamesPadInd").value
const perdidosIndPad = gamesIndPadel - scorePadelInd

//Variables partidos padel dobles
const scorePadelDob = document.querySelector("#scorePadDob").value
const gamesDobPadel = document.querySelector("#gamesPadDob").value
const perdidosDobPad = gamesDobPadel - scorePadelDob


//Canvas ind tenis
const canvas = document.getElementById('my-canvas')
//Canvas dob tenis
const canvasDob = document.getElementById('my-canvas-dob')
//Canvas ind padel
const canvasPadelInd = document.getElementById('my-canvas-padel-ind')
//Canvas dob padel
const canvasPadelDob = document.getElementById('my-canvas-padel-dob')


//Funcion para el grafico
function ChartStats(canvas,lost, wins){
  

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
              data: [lost, wins ],
    // Notice the borderColor 
              borderColor:	['black', 'black'],
              borderWidth: [1,1]
          }
      ]
    };
    let options = {
      title: {
                display: true,
                text: 'Victorias/Derrotas',
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
ChartStats(canvas, perdidos, scoreInd)
ChartStats(canvasDob, perdidosDob, scoreDob)
ChartStats(canvasPadelInd, perdidosIndPad, scorePadelInd)
ChartStats(canvasPadelDob,perdidosDobPad, scorePadelDob)