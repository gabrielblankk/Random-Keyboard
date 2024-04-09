const keys = Array.from(document.querySelectorAll('.key'))
const orderedKeyValues = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm'
]
const currentKeyValues = []
keys.forEach((key, index) => {
    currentKeyValues.push(orderedKeyValues[index])
    key.textContent = currentKeyValues[index]
})

let isCapsOn = false

function changeKeyCase(isShiftPressed) {
    currentKeyValues.length = 0
    keys.forEach(key => {
        if (isShiftPressed) {
            if (isCapsOn) {
                key.textContent = key.textContent.toLowerCase()
            } else {
                key.textContent = key.textContent.toUpperCase()
            }
        } else {
            if (isCapsOn) {
                key.textContent = key.textContent.toUpperCase()
            } else {
                key.textContent = key.textContent.toLowerCase()
            }
        }
        currentKeyValues.push(key.textContent)
    })
}

const textArea = document.querySelector('#textarea')

textArea.addEventListener('keydown', key => pressKey(key))
document.addEventListener('keyup', key => pressKey(key))
document.addEventListener('keydown', (key) => {
    if (key.key === 'CapsLock') {
        isCapsOn = !isCapsOn
    
        changeKeyCase(false)
    }
})

function pressKey(keyPressed) {
    if (keyPressed.type === 'keydown') {
        if (currentKeyValues.includes(keyPressed.key)) {
            keyPressed.preventDefault()

            const index = orderedKeyValues.indexOf(keyPressed.key.toLowerCase())

            keys[index].style.boxShadow = "0px 0px 15px #111"
            keys[index].style.transform = "scale(0.8)"

            textArea.value += currentKeyValues[index]
        }

        if (keyPressed.key === 'Shift') {
            changeKeyCase(true)
        }
    }

    if (keyPressed.type === 'keyup') {
        if (currentKeyValues.includes(keyPressed.key)) {
            keyPressed.preventDefault()

            const index = orderedKeyValues.indexOf(keyPressed.key.toLowerCase())

            keys[index].style.boxShadow = "0px 0px 5px #111"
            keys[index].style.transform = "scale(1)"
        }

        if (keyPressed.key === 'Shift') {
            changeKeyCase(false)
        }
    }
}

const shuffleBtn = document.querySelector('#shuffleBtn')

shuffleBtn.addEventListener('click', () => {
    shuffleBtn.disabled = true
    textArea.disabled = true

    shuffle(() => {
        shuffleBtn.disabled = false
        textArea.disabled = false
        
        currentKeyValues.length = 0
        keys.forEach(key => {
            currentKeyValues.push(key.textContent)
        })
    })
})

function shuffle(callback) {
    const shuffledKeyValues = []

    const numberRow = document.querySelector('#row1')
    const numberKeys = Array.from(numberRow.querySelectorAll('.key'))

    shuffledKeyValues.push(...numberKeys
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value.textContent))

    const letterRows = Array.from(document.querySelectorAll('.row:not(#row1)'))
    const letterKeys = []

    letterRows.forEach(letterRow => {
        letterKeys.push(...letterRow.querySelectorAll('.key'))
    })

    shuffledKeyValues.push(...letterKeys
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value.textContent))

    const rows = document.querySelectorAll('.row')
    let shuffledKeysIndex = 0

    rows.forEach(row => {
        const rowKeys = row.querySelectorAll('.key')

        rowKeys.forEach((key, keyIndex) => {
            setTimeout((shuffledKeysIndex) => {
                key.classList.add('changeKeysAnimation')

                setTimeout(() => {
                    key.textContent = shuffledKeyValues[shuffledKeysIndex]
                }, 500)
            }, 100 * keyIndex, shuffledKeysIndex++);

            setTimeout(() => {
                key.classList.remove('changeKeysAnimation')
                callback()
            }, 2000)
        })
    })
}