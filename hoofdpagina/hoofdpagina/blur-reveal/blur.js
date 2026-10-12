const ready = document.querySelector('#Ready')
const intf = document.getElementById('oldinterface')
const geven = document.querySelector('#geefantwoorden')
const changetitle = document.querySelector('#titlechange')

const froggy = document.querySelector('#removefroggy')

ready.addEventListener('click',() => {
intf.remove();
ready.remove();
geven.classList.remove('hide')
froggy.classList.add('hidingfroggy')
});

const change = document.querySelector('#titlechange')
const A = document.querySelector('#antwoordA')
const B = document.querySelector('#antwoordB')
const C= document.querySelector('#antwoordC')

A.addEventListener('click',() => {
geven.classList.add('hide')
changetitle.innerHTML = 'EINDRESULTAAT'
})
B.addEventListener('click',() => {
geven.classList.add('hide')
changetitle.innerHTML = 'EINDRESULTAAT'
})
C.addEventListener('click',() => {
geven.classList.add('hide')
changetitle.innerHTML = 'EINDRESULTAAT'
})






