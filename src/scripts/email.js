// SMTP email send logic
const form = document.querySelector(".mail_form")
function sendMessage(e) {
    e.preventDefault()
    
    const sender = document.querySelector("#from-field")
    const subject = document.querySelector("#subject-field")
    const message = document.querySelector("#message-field")

    console.log(`Sender: ${sender.value}\nSubject: ${subject.value}\nMessage: ${message.value}`)

    Email.send({
        SecureToken : "980b95c0-fd33-4663-bdeb-22b6f8b28496",
        To : 'enzocontas99@gmail.com',
        From : 'enzo.mascia1@gmail.com',
        Subject : subject.value,
        Body : `Message sent from ${sender.value}:  ${message.value}`,
    }).then(
    message => alert(message)
    )
}
form.addEventListener("submit", sendMessage)