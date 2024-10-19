const form = document.querySelector('form')

form.addEventListener('submit',function(e){
    e.preventDefault();

    const height = parseFloat(document.querySelector('#height').value)
    const weight = parseFloat(document.querySelector('#weight').value)
    const result = document.querySelector('#result')

    if(height < 0 || isNaN(height)){
        result.innerText = 'Please give a valid height'
    }
    else if(weight < 0 || isNaN(weight)){
        result.innerText = 'Please give a valid weight'
    }
    else{
        const bmi = (weight / ((height * height) / 10000)).toFixed(2);
        let message;
        if(bmi < 18.5)
        {
            message = "Underweight"
        }
        if(bmi >= 18.5 && bmi < 25)
        {
            message = "Normal Weight"
        }
        if(bmi >= 25 && bmi < 30)
        {
            message = "Overweight"
        }
        if(bmi >= 30)
        {
            message = "Obesity"
        }
        result.innerHTML = `BMI: ${bmi} <br> Status: ${message}` ;
    }

})