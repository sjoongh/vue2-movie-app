<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Footer
  },
};
</script>

<style lang="scss" scoped>
// 이 코드가 있어야 sassloader가 실행됨
// sass == scss --> sass-loader로 묶여있음, scss는 sass확장성
</style>
