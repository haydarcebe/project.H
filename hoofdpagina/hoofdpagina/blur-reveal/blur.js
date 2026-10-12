const ready = document.querySelector('#Ready')
const intf = document.getElementById('oldinterface')
const geven = document.querySelector('#geefantwoorden')
const changetitle = document.querySelector('#titlechange')

const froggy = document.querySelector('#removefroggy')
const antwoordis = document.querySelector('#antwoordis')

const scoreyg = document.querySelector('#scoreyg')

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
antwoordis.innerHTML = 'GOED'
antwoordis.style.color = 'green'
scoreyg.innerHTML = 'score: ???'
})
B.addEventListener('click',() => {
geven.classList.add('hide')
changetitle.innerHTML = 'EINDRESULTAAT'
antwoordis.innerHTML = 'FOUT'
antwoordis.style.color = 'red'
scoreyg.innerHTML = 'score: 0'
})
C.addEventListener('click',() => {
geven.classList.add('hide')
changetitle.innerHTML = 'EINDRESULTAAT'
antwoordis.innerHTML = 'FOUT'
antwoordis.style.color = 'red'
scoreyg.innerHTML = 'score: 0'
})






