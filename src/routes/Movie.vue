<template>
    <div class="container">
      <template 
      v-if="template" 
      class ="template">
     <div class="skeletons">
     <div class="skeleton poster"></div>
     <div class="specs">
     <div class="skeleton title"></div>
     <div class="skeleton spec"></div>
     <div class="skeleton plot"></div>
     <div class="skeleton etc"></div>
     <div class="skeleton etc"></div>
     <div class="skeleton etc"></div>
  </div>
</div>
        <Loader 
          :size="3"
          :z-index="9"
          fixed />
      </template>
        <div 
        v-else
        class="movie-details">
            <div
            :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})` }"
            class="poster">
            <!-- 이미지가 Loader 될때 loader이미지가 돌아가게 호출 loading이 끝나면 
            밑에 loading=false 의 코드 때문에 자동으로 종료됨 
            v-if지우면 load이미지가 poster를 불러와도 계속실행-->
            <Loader v-if="imageLoading"
            absolute />
            </div>
            <div class="specs">
                <div class="title">
                    {{ theMovie.Title }}
                </div>
                <div class="plo"></div>
                    {{ theMovie.Plot }}
                <div class="ratings">
                    <h3>Ratings</h3>
                    <div class="rating-wrap">
                        <!-- 꺼내면서 이름 바꾸기 source -> name -->
                        <div 
                        v-for="{ Source: name, Value: score } in theMovie.Ratings"
                        :key="name"
                        class="rating">
                        <img
  :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
  :alt="name" />
                        {{ score }}
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Actors</h3>
                    {{ theMovie.Actors }}
                </div>
                <div>
                    <h3>Director</h3>
                    {{ theMovie.Director }}
                </div>
                <div>
                    <h3>Production</h3>
                    {{ theMovie.Production }}
                </div>
                <div>
                    <h3>Genre</h3>
                    {{ theMovie.Genre }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// 로더 불러옴
import Loader from '@/components/Loader'

export default {
    // 로더를 사용
    components: {
        Loader
    },
    data() {
        return {
            // 이미지가 로딩되고 있을때
            imageLoading: true
        }
    },
    // created()와 mounted() 차이
    created() {
        this.searchMovieWithId({
            id: this.$route.params.id
        })
    },
    computed: {
        ...mapState('movie', [
            'theMovie',
            'loading'
        ])
    },
    methods: {
        ...mapActions('movie', [
            'searchMovieWithId'
        ]),
        // searchMovieWithId(payload) { 위에 ...mapActions와 같은 표현, 주석된 표현을 간소화한게 위에 표현
        //     this.$store.dispatch('movie/searchMovieWithId', payload)
        // }
        // url 주소를 받아서 300의 이미지 사이즈를 700으로 바꿈
        requestDiffSizeImage(url) {
            // N/A -> 포스트 정보가 없을 경우 이 데이터가 넘어옴(확인을 해야함)
            if (!url || url === 'N/A') {
                // 이미지 로딩중 true가 아니면 로딩을 끝내고 return
                this.imageLoading = false
                return ''
            }
            // src에서는 이미지를 변환함
            const src = url.replace('SX300', 'SX700')
            // img 태그를 메모리상에 생성해줌 -> img변수에 담아서
            // const img = document.createElement('img')
            // 바껴야 하는 이미지 크기를 img에 넣어줌
            // img.src = src
            // img가 로드되면 로딩을 멈춤
            // img.addEventListener('load', () => {
                // this.imageLoading = false
            // })
            // requestDiffSizeImage메소드 자체가 비동기여선 안됨 load이미지만 then()으로 비동기
            this.$loadImage(src).then(() => {
              this.imageLoading=false
            })
            return src
        }
    }
}
</script>

<style lang="scss" scoped>
.movie-details {
  display: flex;
  color: $gray-600;
  .poster {
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    position: relative;
    // 감소너비 비율 : 기본값은 1
    flex-shrink: 0;
  }
  .specs {
    flex-grow: 1;
    .title {
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &::after {
          content: "\00b7";
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 20px;
    }
  }
  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px * 3 / 2;
      margin-right: 40px;
    }
  }
  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  }
  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }
      .ratings {
        .rating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
// 스켈레톤 UI
// .skeletons {
//   display: flex;
//   .poster {
//     flex-shrink: 0;
//     width: 500px;
//     height: 500px * 3/2;
//     margin-right: 70px;
//   }

//   .specs {
//     flex-grow: 1;
//   }
//   .skeleton {
//     border-radius: 10px;
//     background-color: $gray-200;
//     &.title {
//       width: 80%;
//       height: 70px;
//     }
//     &.spec {
//       width: 60%;
//       height: 30px;
//       margin-top: 20px;
//     }
//     &.plot {
//       width: 100%;
//       height: 250px;
//       margin-top: 20px;
//     }
//     &.etc {
//       width: 50%;
//       height: 50px;
//       margin-top: 20px;
//     }
//   }
// }
</style>