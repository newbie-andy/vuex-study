<template>
  <div class="hello">
    {{ count }}
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>

    <div>
      <Test></Test>
    </div>
  </div>
</template>

<script>
// import Store from './../assets/v.js'
import Test from './../components/Test'
export default {
  name: 'HelloWorld',
  data () {
    return {
      
    }
  },
  computed: {
    count() {
      //读取store中的状态
      // return Store.state.count
      return this.$store.state.count;
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment');
    },
    decrement() {
      this.$store.commit('decrement');
    }
  },
  components: {
    Test
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
