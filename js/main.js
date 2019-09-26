//Init speech synth API
const synth =window.speechSynthesis

//DOM
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//INIT voices array
let voices =[]

const getVoices = ()=>{
    voices = synth.getVoices();
    //console.log(voices)

    //Loop through voices and create an option for each
    voices.forEach((voice)=>{
        //Craete an option elements
        const option = document.createElement("option")
        //Fill option with voice and languages
        option.textContent = voice.name + "(" + voice.lang + ")"

        //Set the needed option attributes
        option.setAttribute("data-lang", voice.lang)
        option.setAttribute("data-name", voice.name)
        voiceSelect.appendChild(option)
    })
}

getVoices()
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices
}

//Speak
const speak = ()=>{
    //Check if speaking
    if(synth.speaking)
    {
        console.log("Aldready speaking.... ")
        return
    }
    if(textInput.value !==""){
        //Add background animation
        body.style.background = 'url(img/wave.gif)'

        //Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value)
        
        //Speak end
        speakText.onend = (e)=>{
            body.style.background=''
            console.log("Done Speaking")
        }

        //Speak error
        speakText.onerror = (e)=>{
            console.log("Something went wrong")
        }

        //Selected voice 
        const SelectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name")
        
        //Loop through voices
        voices.forEach(voice =>{
            if(voice.name === SelectedVoice){
                speakText.voice = voice 
            }
        })

        //Set pitch and rate
        speakText.rate = rate.value
        

        //Speak
        synth.speak(speakText)
    }
}


//Adding event listener
//Form submission
textForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    speak()
    textInput.blur()
})

//Rate value change
rate.addEventListener("change",(e)=>{ 
    rateValue.textContent = rate.value
})
//Pitch value change
// pitch.addEventListener("change",(e)=>{ 
//     pitchValue.textContent = rate.value
// })
//Voice select change
voiceSelect.addEventListener("change",e=> speak())
