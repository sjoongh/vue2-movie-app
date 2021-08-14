import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    loading: false,
    message: 'Search for the movie title!',
    theMovie: {}
  }),
  getters: {},
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    async searchMovies({ state, commit }, payload) {
      if (state.loading) return
    
      // 로딩 시작
      commit('updateState', {
        loading: true,
        message: ''
      })

      try {
        console.log(typeof payload.number)
        const res = await _fetchMovie(payload)
        const { Search, totalResults } = res.data
        console.log(res)
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })

        const total = parseInt(totalResults, 10) // '266' => 266
        const pageLength = Math.ceil(total / 10) // 26.6 => 27

        // 검색된 총 결과가 2페이지 이상인 경우.
        if (pageLength > 1) {
          // 2페이지부터 반복 처리
          for (let page = 2; page <= pageLength; page += 1) {
            // 반복되는 페이지 번호가, 요청(request)한 개수보다 크면 요청 종료!
            if (page > (payload.number / 10)) break
            // 추가 요청 처리
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: _uniqBy([
                ...state.movies,
                ...Search
              ], 'imdbID')
            })
          }
        }
      } catch (error) {
        console.log(error)
        commit('updateState', {
          message: error.message,
          movies: []
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return

      commit('updateState', {
        loading: true
      })

      try {
        const res = await _fetchMovie({ 
          id: payload.id
        })
        console.log(res.data)
        // theMovie = res.data
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          message: error.message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
}

// import axios from "axios"
// import _uniqBy from 'lodash/uniqBy'
// // lodash의 uniqBy의 파일만 사용(경로를 통해 가져옴)
// // import { resolve } from "../../webpack.config"

// export default {
//     // data는 함수여야 함
//     // 기본구조
//     namespaced: true,
//     state: () => ({
//         // 배열로 안하면 state에 따로따로 데이터를 만들어야함
//         movies: [],
//         loading: false, // loading이 false인 상태
//         message: 'Search for the movie title!', // 최초메시지
//         theMovie: {}
//     }),
//     getters: {},
//     mutations: {
//         updateState(state, payload) {
//             // movies의 배열값을 forEach로 반복해서 할당
//             // 여러 데이터를 한곳에 묶기위해서
//             Object.keys(payload).forEach(key => {
//                 state[key] = payload[key]
//             })
//         }
//     },
//     actions: {
//         // context -> actions에 기본으로 들어있는 값, payload를 받아옴
//         async searchMovies({ state, commit }, payload) {
//             if (state.loading) return // inline방식으로 한 줄로 표현 
//             // 로딩 시작
//             commit('updateState', { // commit(updateState) 함수를 통해(commit은 무슨뜻?)
//                 loading: true, // loading이라는 state를 true로 갱신
//                 message: ''
//             })
//             try {
//                 // awitr로 fetchMoive가 비동기로 실행되는 것을 기다렸다가
//             // res 변수에 담음
//             const res = await _fetchMovie(payload)
//             const { Search, totalResults } = res.data
//             console.log(res)
//             commit('updateState', {
//                 // movies의 데이터가 updateState의 payload로 들어감
//                 movies: _uniqBy(Search, 'imdbID')
//             })
//             // res.data.Search.length = 7
//             // res.data.totalResults = 7
//             const total = parseInt(totalResults, 10) // '266' => 266
//              const pageLength = Math.ceil(total / 10) // 26.6 => 27

//              if (pageLength > 1) {
//                  for (let page = 2; page <= pageLength; page += 1) {
//                      if (page > (payload.number / 10)) break
//                      // 추가 요청
//                      const res = await _fetchMovie({
//                         ...payload,
//                          page
//                      })
//                      // 밑에 두개의 프로그램으로 코드 테스트가능
//                      // Vue test utils
//                      // Jest
//                      const { Search } = res.data
//                      // mutation실행 함수 commit()
//                      commit('updateState', {
//                          movies: _uniqBy([
//                                 // 전개연산자로 state(배열요소)를 먼저 풀어놓고
//                                 // 그 다음 전개연산자 res를 풀어놓음
//                                 ...state.movies,
//                                 ...Search
//                          ], 'imdbID')
//                      })
//                  }
//              }
//             } catch(error) {
//                 console.log(error)
//                 commit('updateState', {
//                     message: error.message,
//                     movies: []
//                 })
//             } finally {
//                 commit('updateState', {
//                     loading: false
//                 })
//             }
//         },
//         async searchMovieWithId({ state, commit }, payload) {
//             if (state.loading) return

//             commit('updateState', {
//                 loading: true
//             })

//             try {
//                 const res = await _fetchMovie({
//                     id: payload.id
//                 })
//                 console.log(res.data)
//                 commit('updateState', {
//                     theMovie: res.data
//                 })
//             } catch (error) {
//                 commit('updateState', {
//                     message: error.message
//                 })
//             } finally {
//                 commit('updateState', {
//                     loading: false
//                 })
//             }
//         }
//     }
// }

// /*
// fetchMoive({
//     title: ''
// })
// */

// // 일반함수는 호이스팅 가능
// // async로 비동기화
// // 재활용용도의 함수
// // 해당 js안에서만 활용되는 함수라는 의미로 _(언더바)붙임(의미적으로쓰임)
// async function _fetchMovie(payload) {
//     return await axios.post('/.netlify/functions/movie', payload)
//     // 기본형 비동기
//     // reuturn new Promise((resolbe) => {
//     //     return await axios.get(`https://www.omdbapi.com/?apikey=7035c60c&s=${ title }`)
//     //     resolve(res)
//     // })
// }