const clock = document.getElementById("clock")

setInterval(() => {
    const currentTime = new Date()
    let currentHours = currentTime.getHours()
    let currentMinutes = currentTime.getMinutes()

    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes   
    clock.innerHTML = `${currentHours}:${currentMinutes}`
}, 1000)
