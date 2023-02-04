const fetch = require('node-fetch')

exports.handler = async event => {
  
  let statusCode
  let data

  const { format, headCount, year } = event.queryStringParameters
  const url = `https://fantasyfootballcalculator.com/api/v1/adp/${format}?teams=${headCount}&year=${year}`

  try {
    const response = await fetch(url)
    data = await response.json()
    statusCode = 200
  } 
  catch (err) {
    statusCode = err.statusCode || 500
    data = { error: err.message }
  }

  return {
    statusCode,
    body: JSON.stringify(data)
  }

}