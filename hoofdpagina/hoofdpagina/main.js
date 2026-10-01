const blackout = document.querySelector('#blackout')
const uitleg = document.querySelector('#uitleg')
const uitleg1 = document.querySelector('#uitleg1')
const blurin = document.querySelector('#blurin')




blackout.addEventListener('mouseover',() => {
    uitleg.textContent = 'De afbeelding wordt bedekt door zwarte vlekken. Tijdens de ronde verdwijnen steeds meer vlakken.'
uitleg.classList.remove('verborgen')
})



blackout.addEventListener('mouseout',() => {
uitleg.classList.add('verborgen')


})

blurin.addEventListener('mouseover',() => {
    uitleg1.textContent = 'De afbeelding begint volledig geblurd en wordt tijdens de ronde steeds scherper.'
uitleg1.classList.remove('verborgen1')


})



blurin.addEventListener('mouseout',() => {
uitleg1.classList.add('verborgen1')


})


