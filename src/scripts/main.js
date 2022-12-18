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

// Selectors
const toolbarIcons = document.querySelectorAll(".toolbar .icons-section ul li")
const appWindows = document.querySelectorAll(".basic-window")

// Declare actions and animations 
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
    let toolbarIconStatus

    toolbarIcons.forEach((icon) => { 
        if (appWindow.dataset.name === icon.dataset.appname) toolbarIconStatus = icon.children[1]
    })
    
    // Minimize animation
    minimizeButton.addEventListener(events[inputType].down, () => {
        appWindow.classList.add("minimize-animation")
        toolbarIconStatus["id"] = "minimized"

        setTimeout(() => {
            appWindow.classList.remove("minimize-animation")
            appWindow.classList.add("hidden")
        }, 500)
    })

    // Close animation
    closeButton.addEventListener(events[inputType].down, () => {
        appWindow.classList.add("close-animation")
        toolbarIconStatus["id"] = "closed"

        setTimeout(() => {
            appWindow.classList.remove("close-animation")
            appWindow.classList.add("closed")
        }, 500)
    })
}

// Set windows movement and action
appWindows.forEach(
    (appWindow) => {
        // Move elements
        moveWindows(appWindow)

        // Minimize and close elements
        titleBarActions(appWindow)
    }
)


// Set toolbar actions
toolbarIcons.forEach(
    (icon) => {
        let relativeWindow
        let toolbarIconStatus = icon.children[1]

        appWindows.forEach((appWindow) => { 
            if (appWindow.dataset.name === icon.dataset.appname) relativeWindow = appWindow 
        })
        
        // Show/Open states and animations 
        icon.addEventListener(events[inputType].down, () => { 
            // When minimized
            if (relativeWindow.classList.contains("hidden")) {
                
                relativeWindow.classList.remove("hidden")
                toolbarIconStatus["id"] = "openned"

                relativeWindow.classList.add("maximize-animation")
                setTimeout(() => {
                    relativeWindow.classList.remove("maximize-animation")
                }, 1000)
            }

            // When closed
            else if (relativeWindow.classList.contains("closed")) {
                relativeWindow.classList.remove("closed")
                relativeWindow.classList.add("open-animation")
                toolbarIconStatus["id"] = "openned"

                setTimeout(() => {
                    relativeWindow.classList.remove("open-animation")
                }, 1000)
            }
            
            else {
                // When opened
                relativeWindow.classList.add("minimize-animation")
                toolbarIconStatus["id"] = "minimized"

                setTimeout(() => {
                    relativeWindow.classList.remove("minimize-animation")
                    relativeWindow.classList.add("hidden")
                }, 500)
            }
        })
    }
);