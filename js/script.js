const typingText = document.querySelector(".typing-test p"),
inpField = document.querySelector(".wrapped .input-field"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
trybtn = document.querySelector("button");

let timer,
maxTime = 20,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;


function randomParagraphs(){
    //getting random number and it'll always less than the paragraphs length
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span =>{
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    // focusing input field on keydown or click event
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
    
        //if user hasn't entered any chareacter or pressed backspace
        if(typedChar == null){
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else{
            if(characters[charIndex].innerText === typedChar){
                /* if user typed character and shown character matched then add the correct class
                 else increment the mistakes and add the incorrect class */
                characters[charIndex].classList.add("correct");
            }
            else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++; // increment charIndex either user typed correct or incorrect character
    
        }
    
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    
        let wpm = Math.round((((charIndex - mistakes)/5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === infinity ? 0: wpm;
    
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes; //cpm won't count the mistakes
    } else{
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer(){
    // if timeLeft is greater than 0 then decrement the timeLeft else clear the timer
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else{
        clearInterval(timer);
    }
}

function resetGame(){
    randomParagraphs();
    inpField.value = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0; 
}

randomParagraphs();
inpField.addEventListener("input", initTyping);
trybtn.addEventListener("click", resetGame);
