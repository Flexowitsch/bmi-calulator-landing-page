const heightInput = document.getElementById("heightInput")
const weightInput = document.getElementById("weightInput")
const heightInputImperial = document.getElementById("heightInputImp")
const weightInputImperial = document.getElementById("weightInputImp")
const metricRadioBtn = document.getElementById("metricRadio")
const imperialRadioBtn = document.getElementById("imperialRadio")
const unitDisplayHeight = document.getElementById("unitDisplayHeight")
const unitDisplayWeight = document.getElementById("unitDisplayWeight")
const imperialInputs = document.getElementsByClassName("imperialInput")
const inputContainer = document.getElementsByClassName("input-field-container")
const inputFields = document.getElementById("inputFields")
const header = document.querySelector("header")
//  output variabled
const bmiValueOutput = document.getElementById("bmiOutput")
const bmiMessage = document.getElementById("bmiMessageOutput")
const idealWeightOutput = document.getElementById("idealWeightOutput")
const outputContainer = document.getElementById("outputContainer")


// setting the imperial inputs to display 0 and hiding the output container
window.addEventListener("load", function(){
    outputContainer.style.display = "none"
    for (let i = 0; i < imperialInputs.length; i++) {
        imperialInputs[i].style.display = "none";
    }
})


// logic for the switch of the interface

metricRadioBtn.addEventListener('change', (event) => {
    if (event.target.checked) {
      console.log('Radio button is checked!');
      unitDisplayHeight.textContent = "cm"
      unitDisplayWeight.textContent = "kg"
      console.log(imperialInputs)
      for (let i = 0; i < imperialInputs.length; i++) {
          imperialInputs[i].style.display = "none";
      }

      for (let i = 0; i < inputContainer.length; i++) {
          inputContainer[i].style.gap = "0"
      }
      inputFields.classList.add("flex")
      //background image adjustment
      header.style.backgroundPosition = "bottom left"
    }
  });

  imperialRadioBtn.addEventListener('change', (event) => {
    if (event.target.checked) {
      console.log('imperial checked!');
      unitDisplayHeight.textContent = "ft"
        unitDisplayWeight.textContent = "st"
        for (let i = 0; i < imperialInputs.length; i++) {
            imperialInputs[i].style.display = "block";
        }

        for (let i = 0; i < inputContainer.length; i++) {
            inputContainer[i].style.gap = "1.5rem"
        }

        inputFields.classList.remove("flex")
        //background image adjustment
        header.style.backgroundPosition = "top left"
    }
  });



//initializing the input variables
let userWeight = 0
let userHeight = 0
let userWeightImp = 0
let userHeightImp = 0

heightInput.addEventListener('input', function() {
    userHeight = heightInput.value;
    console.log(userHeight)
    calculateBmi()
});

weightInput.addEventListener('input', function() {
    userWeight = weightInput.value;
    console.log(userWeight)
    calculateBmi()
});

// Add event listeners for imperial inputs
heightInputImperial.addEventListener('input', function() {
    userHeightImp = heightInputImperial.value;
    calculateBmi()
});

weightInputImperial.addEventListener('input', function() {
    userWeightImp = weightInputImperial.value;
    //console.log(userWeightImp)
    calculateBmi()
});

let bmi = 0
let imperialWeight = 0
let imperialHeight = 0
let optimalWeight = 0

function calculateBmi() {
    if(metricRadioBtn.checked && userWeight > 0 && userHeight > 0) {
        console.log("bmi calculated")
        bmi = ((userWeight / userHeight / userHeight) * 10000).toFixed(1)
        console.log(bmi) 
    } 
    else if (imperialRadioBtn.checked) {
   
        // Convert stone to pounds (1 stone = 14 pounds)
        imperialWeight = +userWeightImp + (+userWeight * 14)
        
        //convert feet to inch
        imperialHeight = +userHeightImp + (+userHeight * 12)
        
        //calculate bmi
        bmi =(imperialWeight / (imperialHeight * imperialHeight) * 703).toFixed(1)
        console.log(bmi) 
    }

    calculateOptimalWeight()
    outputBmi()
    outputContainer.style.display = "flex"
}



function calculateOptimalWeight() {
    
    if(metricRadioBtn.checked) {
        optimalWeight = (50 + (0.91 *[userHeight - 152.4])).toFixed(1)
    } else {
        optimalWeight = ((bmi * imperialHeight * imperialHeight) / 703).toFixed(1);
    }
    
}



function outputBmi() {
    bmiValueOutput.textContent = bmi
    if (bmi < 18.5) {
        bmiMessage.textContent = `Your BMI suggests you are underweight.`

    } else if (bmi > 18.5 && bmi < 24.9) {  
        bmiMessage.textContent = "Your BMI suggests you are in the healty weight range."
    }   else if (bmi > 25.0 && bmi < 29.9) {
        bmiMessage.textContent = "Your BMI suggests you are in the overweight range."
    } else {
        bmiMessage.textContent = "Your BMI suggests you are in the obese weight range."
    }

    let idealMsg = ''

    if(metricRadioBtn.checked) {
        idealMsg = `Your ideal weight is ${optimalWeight}kg`
    } else {
        idealMsg = `Your ideal weight is ${optimalWeight}lbs`
    }

    idealWeightOutput.textContent = idealMsg
    calculateOptimalWeight()
}
