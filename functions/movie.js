const axios = require('axios')
const { OMDB_API_KEY } = process.env

exports.handler = async function (event) {
  const payload = JSON.parse(event.body)
  console.log(payload)

  const { title, type, year, page, id } = payload
  const url = id
  // &s=${}는 사용자가 입력하는 데이터로 검색하겠다
    // `(백틱)기호로 보간
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`    
  const { data } = await axios.get(url)
  return {
    statusCode: 200,
           // body부분에서 내보냄 (백엔드)
    body: JSON.stringify(data)
  }
}