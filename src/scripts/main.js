// Initial states
let initialX, initialY = 0
let moveElement = false

const events = {
    mouse: { 
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
}

// Define touch or mouse input type
function deviceType() {
    try {
        document.createEvent("TouchEvent")
        return "touch"
    } catch(error) {
        return "mouse"
    }
}

let inputType = deviceType()

// Action functions
const moveWindows = (appWindow) => {        
    const titleBar = appWindow.querySelector(".title-bar")
    
    // Start movement
    titleBar.addEventListener(events[inputType].down, (e) => {
        e.preventDefault()
        
        initialX = inputType === "mouse" ? e.clientX : e.touches[0].clientX
        initialY = inputType === "mouse" ? e.clientY : e.touches[0].clientY

        moveElement = true
    })

    // Move
    titleBar.addEventListener(events[inputType].move, (e) => {
        if(moveElement) {
            e.preventDefault()

            let newX = inputType === "mouse" ? e.clientX : e.touches[0].clientX
            let newY = inputType === "mouse" ? e.clientY : e.touches[0].clientY

            appWindow.style.left = `${ appWindow.offsetLeft - (initialX - newX) }px`
            appWindow.style.top = `${ appWindow.offsetTop - (initialY - newY) }px`
        
            initialX = newX
            initialY = newY
        }
        
    })

    // End movement
    const stopMovement = () => { moveElement = false }

    titleBar.addEventListener(events[inputType].up, stopMovement)
    titleBar.addEventListener("mouseleave", stopMovement)
}

const titleBarActions = (appWindow) => {

    const minimizeButton = appWindow.querySelector(".title-bar .buttons-box .minimize")
    const closeButton = appWindow.querySelector(".title-bar .buttons-box .close")
    
    minimizeButton.addEventListener(events[inputType].down, () => appWindow.classList.add("hidden"))
    closeButton.addEventListener(events[inputType].down, () => appWindow.classList.add("closed"))
}

// Set windows movement and action
const appWindows = document.querySelectorAll(".basic-window")
appWindows.forEach(
    (appWindow) => {
        // Move elements
        moveWindows(appWindow)

        // Minimize and close elements
        titleBarActions(appWindow)
    }
)


// Set toolbar actions
const toolbarIcons = document.querySelectorAll(".toolbar .icons-section ul li")
toolbarIcons.forEach(
    (icon) => {
        let relativeWindow
        
        appWindows.forEach((appWindow) => { 
            if (appWindow.dataset.name === icon.dataset.appname) relativeWindow = appWindow 
        })
        
        icon.addEventListener(events[inputType].down, () => { 
            if (relativeWindow.classList.contains("hidden")) relativeWindow.classList.remove("hidden")
            if (relativeWindow.classList.contains("closed")) relativeWindow.classList.remove("closed")
        })
    }
);