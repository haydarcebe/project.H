const ready = document.querySelector('#Ready')
const intf = document.getElementById('oldinterface')
const geven = document.querySelector('#geefantwoorden')



ready.addEventListener('click',() => {
intf.remove();
ready.remove();
geven.classList.remove('hide')
});

const change = document.querySelector('#titlechange')
const A = document.querySelector('#antwoordA')
const B = document.querySelector('#antwoordB')
const C= document.querySelector('#antwoordC')

A.addEventListener('click',() => {

})

