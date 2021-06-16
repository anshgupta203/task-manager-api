const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'anshgupta203@gmail.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the app, ${name}. Let's get you started!`
    })
}


const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'anshgupta203@gmail.com',
        subject: 'We will miss you',
        text: `Please give us a feedback, ${name}.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}