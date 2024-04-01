let start = document.getElementById("start")
let title
let input
let preTitle
let img1
let img2

let questions = 0
let trueAnswers = 0
let falseAnswers = 0
let gamer


let body = document.body

start.addEventListener("click", () => {
    start.parentNode.removeChild(start)

    title = document.createElement("h1")
    input  = document.createElement("input")

    title.textContent = "Введите ваше имя"

    body.append(title)
    body.append(input)


    input.addEventListener("keyup", (event) => {
        if (event.code == "Enter") {
            title.textContent = "Добро пожаловать " + input.value
            gamer = input.value
            input.parentNode.removeChild(input)

            setTimeout( () => {
                title.parentNode.removeChild(title)
                iLoveMath()
            }, 2000)
        }
    })
})


function createTextLevel (question, answer, nextLevel) {
    questions += 1
    title = document.createElement("h1")
    input = document.createElement("input")
    preTitle = document.createElement("h2")

    title.textContent = question

    body.append(title)
    body.append(input)
    body.append(preTitle)

    input.addEventListener("keyup", (event) => {
        if (event.code == "Enter") {
            if (input.value.toLowerCase() == answer) {
                input.parentNode.removeChild(input)
                preTitle.textContent = "Верно!!!"
                trueAnswers += 1
                setTimeout( () => {
                    title.parentNode.removeChild(title)
                    preTitle.parentNode.removeChild(preTitle)
                    if (nextLevel != null) {
                        nextLevel()
                    }
                }, 2000)
            }
            else {
                falseAnswers += 1
                console.log("falseansw " + falseAnswers)
                preTitle.textContent = "НЕверно!!!"
                input.value = " "
            }
        }
    })
}

function createImgLevel (question, trueLink, falseLink, nextLevel) {
    questions += 1
    title = document.createElement("h1");
    preTitle = document.createElement("h2")

    img1 = document.createElement("img")
    img2 = document.createElement("img")


    if (Math.floor(Math.random() * 10) % 2 == 1) {
        img1.src = trueLink
        img2.src = falseLink

        img1.addEventListener("click", trueAns)

        img2.addEventListener("click", falseAns)
    } else {
        
        img1.src = falseLink
        img2.src = trueLink
        img1.addEventListener("click", falseAns)

        img2.addEventListener("click", trueAns)
    }



    title.textContent = question

    body.append(title)
    body.append(preTitle)
    body.append(img1)
    body.append(img2)


    function trueAns() {
        trueAnswers += 1
        img1.parentNode.removeChild(img1)
        img2.parentNode.removeChild(img2)
        preTitle.textContent = "Верно!!!"
        setTimeout(() => {
            title.parentNode.removeChild(title)
            preTitle.parentNode.removeChild(preTitle)
            if (nextLevel != null) {
                nextLevel()
            }
        }, 2000)
    }

    function falseAns() {
        falseAnswers += 1
        preTitle.textContent = "НЕверно!!!"
    }


}

function createMediaLevel (question, track, answer, nextLevel) {
    questions += 1
    title = document.createElement("h1")
    preTitle = document.createElement("h2")
    input = document.createElement("input")
    media = document.createElement("audio")

    media.src = track
    media.controls = true

    title.textContent = question

    body.append(title)
    body.append(preTitle)
    body.append(input)
    body.append(media)

    input.addEventListener("keyup", (event) => {
        if (event.code == "Enter") {
            if (input.value.toLowerCase() == answer) {
                input.parentNode.removeChild(input)
                preTitle.textContent = "Верно!!!"
                trueAnswers += 1
                setTimeout( () => {
                    title.parentNode.removeChild(title)
                    preTitle.parentNode.removeChild(preTitle)
                    media.parentNode.removeChild(media)
                    if (nextLevel != null) {
                        nextLevel()
                    }
                }, 2000)
            }
            else {
                falseAnswers += 1
                preTitle.textContent = "НЕверно!!!"
                input.value = ""
            }
        }
    })

}

function gameOver () {
    title = document.createElement("h1")
    preTitle = document.createElement("h2")
    stats = document.createElement("ul")
    total_q = document.createElement("li")
    total_t = document.createElement("li")
    total_f = document.createElement("li")


    title.textContent = "Game Over"
    preTitle.textContent = `${gamer} Stats:`

    body.append(title)
    body.append(preTitle)
    body.append(stats)
    total_q.textContent = `Total questions - ${questions}`
    stats.append(total_q)
    total_t.textContent = `True answers - ${trueAnswers}`
    stats.append(total_t)
    total_f.textContent = `Total false attempt - ${falseAnswers}`
    stats.append(total_f)

}

function iLoveMath () {
    createTextLevel("Cколько будет 2*6", 12, iLoveGeography)
}

function iLoveGeography () {
    createTextLevel("Назовите столицу Грузии", "тбилиси", iLoveMountains)
}

function iLoveMountains () {
    createImgLevel("На какой картинке Эверест?", "./img/everst.jpg", "./img/elbrus.jpg", iLoveMusic)
}

function iLoveMusic () {
    createMediaLevel("Назовите исполнителя...", "./music/Bring Me The Horizon - LosT.mp3", "bring me the horizon", iLoveSnakes)
}

function iLoveSnakes () {
    createImgLevel("На какой картинке питон?", "./img/python.jpg", "./img/boa.jpg", iLoveWine)
}

function iLoveWine () {
    createTextLevel("Из чего делают вино?", "виноград", iLoveSongs)
}

function iLoveSongs () {
    createTextLevel("Что собирался копать герой известной песни (Антошка)?", "картошку", iLoveRock)
}

function iLoveRock () {
    createMediaLevel("Напишите название песни", "./music/queen_-_we_will_rock_you_(muztune.me).mp3", "we will rock you", gameOver)
}



