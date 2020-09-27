// // As a user, I should see the timer increment every second once the page has loaded.
//     - DOMContentLoaded listener
//     - get the h1 from the DOM
//     - increment the counter h1 every second (add 1 to current value)
//     - update the node on the DOM


// // As a user, I can manually increment and decrement the counter using the plus and minus buttons.
//     - click listeners on +/- buttons
//     - adjust counter accordingly

// As a user, I can 'like' an individual number of the counter. I should see count of the number of 'likes' associated with that number.

// As a user, I can pause the counter, which should
//      - pause the counter
//      - disable all buttons except the pause button
//      - the pause button should then show the text "resume."
//      - When 'resume' is clicked, it should restart the counter and re-enable the buttons.

// As a user, I can leave comments on my gameplay, such as: "Wow, what a fun game this is."
const currentNum = parseInt(counter.textContent)


document.addEventListener('DOMContentLoaded', e => {
    let timer = setInterval(() => {
        incrementCounter(1)
    }, 1000)


const currentNumber = () => {
    const counter = document.querySelector('#counter')
    const currentNum = parseInt(counter.textContent)
    return currentNum
}

const incrementCounter = (num) => {
    newNum = currentNumber() + num
    
    counter.textContent = newNum

}

const likeMap = {}

const clickHandler = () => {
    document.addEventListener('click', e => {
        if (e.target.matches('#minus')){
            incrementCounter(-1)

        } else if (e.target.matches("#plus")){
            incrementCounter(1)

        } else if (e.target.matches("#heart")){
            const num = currentNumber()

            if(likeMap[num]){
                const numLi = likeMap[num]
                const newCount = parseInt(numLi.dataset.likeCount) + 1
                numLi.dataset.likeCount = newCount
                numLi.textContent = `${num} has been liked ${newCount} times`
            } else {
                const numLi = document.createElement("li")
                numLi.dataset.likeCount = 1
                numLi.textContent = `${num} has been liked 1 time`
                likeMap[num] = numLi
                document.querySelector('.likes').append(numLi)
            }
        } else if (e.target.matches('#pause')){
            // built in function that stops the timer
            clearInterval(timer)

            e.target.textContent = "resume"
            e.target.id = "resume"
            
            document.querySelector('#minus').disabled = true
            document.querySelector('#plus').disabled = true
            document.querySelector('#heart').disabled = true
            document.querySelector('#submit').disabled = true

        } else if (e.target.matches("#resume")){
            timer = setInterval(() => {
                incrementCounter(1)
            }, 1000)

            e.target.textContent = "pause"
            e.target.id = "pause"

            document.querySelector('#minus').disabled = false
            document.querySelector('#plus').disabled = false
            document.querySelector('#heart').disabled = false
            document.querySelector('#submit').disabled = false
        }
    })
}
// example of opotomistic rendering?
const submitHandler = () => {
    document.addEventListener('submit', e => {
        e.preventDefault()
        const form = e.target
        const comment = form.comment.value
        const pTag = document.createElement('p')
        pTag.textContent = comment

        document.querySelector('#list').append(pTag)
        form.reset()
    })
}

clickHandler()
submitHandler()
})