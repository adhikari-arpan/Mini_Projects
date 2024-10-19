const buttons = document.querySelectorAll('.button');
const body = document.querySelector('body');

buttons.forEach( (button)=>{
    button.addEventListener('click',function(e){
        console.log(e.target);
    switch (e.target.id) {
        case 'red':
            body.style.backgroundColor = e.target.id;
            break;

        case 'yellow':
            body.style.backgroundColor = e.target.id;
            break;

        case 'orange':
            body.style.backgroundColor = e.target.id;
            break;

        case 'blue':
            body.style.backgroundColor = e.target.id;
            break;

        case 'pink':
            body.style.backgroundColor = e.target.id;
            break;
        
        default:
            break;
    }
    })
})