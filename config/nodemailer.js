const nodemailer = require('nodemailer')


const transport = nodemailer.createTransport(
  {
    service: 'Gmail',
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASS
    }
  }
)

module.exports = transport