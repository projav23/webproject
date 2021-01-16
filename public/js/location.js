

let allCenters = document.querySelector('#center')
let clonado = allCenters.cloneNode(true)

// console.log("allcenters",allCenters)

let ciudadesSpain = document.querySelector("#location")

ciudadesSpain.onchange = function filterCenter(){
  let centros = document.querySelector('#center')

  centros.innerHTML = ""
  centros.append(clonado)
  //Selecciono el value del select de location
  let ciudad = document.querySelector("#location").value

  //busco los que son de esa ciudad
  let center = document.querySelectorAll(`option[name=${ciudad}]`)
  centros.innerHTML = ""
  center.forEach((centro)=> {
    centros.append(centro)
  })
 }

