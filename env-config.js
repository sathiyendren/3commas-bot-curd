const prod = process.env.NODE_ENV === 'production'
module.exports = {
  'process.env.BACKEND_URL': prod ? '/3commas-bot-curd' : ''
}