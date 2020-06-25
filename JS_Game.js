
random_names = ["Priyanka", "Nasr", "Ariadne", "Sonya", "Mona", "Noah", "Joe", "Mango", "Ajanta"]
document.addEventListener('click', event => {
    if (event.target.classList.contains('box')){
        event.target.style.backgroundColor = 'grey'
        event.target.innerText = rando
    }
})


