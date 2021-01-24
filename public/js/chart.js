//Varibales partido tenis individual
const scoreInd = document.querySelector("#score").value
const games = document.querySelector("#games").value
const perdidos = games - scoreInd

//Variables partidos tenis dobles
const scoreDob = document.querySelector("#scoreDob").value
const gamesDob = document.querySelector("#gamesDob").value
const perdidosDob = gamesDob - scoreDob

// Variables nulos tenis
const nulTenis = document.getElementById("nuloTenis").value
// Variables nulos padel
const nulPadel = document.getElementById("nuloPadel").value

//Variables partidos padel individual
const scorePadelInd = document.querySelector("#scorePadInd").value
const gamesIndPadel = document.querySelector("#gamesPadInd").value
const perdidosIndPad = gamesIndPadel - scorePadelInd
console.log(perdidosIndPad)

//Variables partidos padel dobles
const scorePadelDob = document.querySelector("#scorePadDob").value
const gamesDobPadel = document.querySelector("#gamesPadDob").value
const perdidosDobPad = gamesDobPadel - scorePadelDob


//Canvas ind tenis
const canvas = document.getElementById('my-canvas')
//Canvas dob tenis
const canvasDob = document.getElementById('my-canvas-dob')
//Canvas ind padel
const canvasPadelInd = document.getElementById('my-canvas-padel')
console.log(canvasPadelInd)
//Canvas dob padel
const canvasPadelDob = document.getElementById('my-canvas-padel-dob')



//Score total
const scoreTotal = Number(scoreInd) + Number(scoreDob)
console.log("scoretotal", scoreTotal)
const scoreTotalPadel = Number(scorePadelInd) + Number(scorePadelDob)
console.log("scoretotalPadel", scoreTotalPadel)

//Games total
const gamestotal = Number(games) + Number(gamesDob)
console.log("gamestotal", gamestotal)
const gamestotalPadel = Number(gamesIndPadel) + Number(gamesDobPadel)
console.log("gamestotalPadel", gamestotalPadel)


// Perdidos
const perdidosTenis = gamestotal - nulTenis - scoreTotal
console.log("perdidosTenis", perdidosTenis)
const perdidosPadel = gamestotalPadel - nulPadel - scoreTotalPadel
console.log("perdidosPadel", perdidosPadel)

//Funcion para el grafico
function ChartStats(canvas,lost,nulo, wins){
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0,0,300,300)
    let data = {
      labels: ["Perdidos ","Nulo", "Ganados"],
        datasets: [
          {
              fill: true,
              backgroundColor: [
                  '#6fc1f9',
                  "grey",
                  '#aadd4f'],
              data: [lost,nulo, wins ],
    // Notice the borderColor 
              borderColor:	['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)'],
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



ChartStats(canvas, perdidosTenis,nulTenis, scoreTotal)
ChartStats(canvasPadelInd, perdidosPadel, nulPadel, scoreTotalPadel)
// ChartStats(canvasPadelInd, perdidosDob, scoreDob)
// ChartStats(canvasPadelDob,perdidosDobPad, scorePadelDob)