<template>
  <div class="home">
     <DirectoryComponent/>
  </div>
</template>

<script>
import DirectoryComponent from '@/components/DirectoryComponent.vue'
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    DirectoryComponent
},
  data(){
    return {
     
    }
  },
  mounted() {
    document.title = 'Trang chủ'
  },
}
</script>
<style lang="scss" scoped>

</style>
