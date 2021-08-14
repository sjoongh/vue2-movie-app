<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
// import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Footer
  },
  // mounted() {
  //   this.init()
  // },
  // methods: {
  //   async init() {
  //     // 사용자가 접속하는 로컬같은 주소가 자동으로 붙음 get에
  //     const res = await axios.get('/.netlify/functions/movie')
  //     console.log(res)
  //   }
  // }
};
</script>

<style lang="scss" scoped>
// 이 코드가 있어야 sassloader가 실행됨
// sass == scss --> sass-loader로 묶여있음, scss는 sass확장성
</style>
