const blackout = document.querySelector('#blackout')


const uitleg = document.querySelector('#uitleg')


blackout.addEventListener('mouseover',() => {
uitleg.textContent = 'ik ben haydar'
uitleg.appendChild(blackout)
})



blackout.addEventListener('mouseout',() => {
uitleg.remove();



})
