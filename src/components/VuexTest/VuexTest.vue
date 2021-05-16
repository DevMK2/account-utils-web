<template>
<div>
  <v-btn @click="()=>this.incrementAsync({amount:10})">incrementAsync</v-btn>
  <v-btn @click="()=>this.increment()">increment</v-btn>
  <v-btn @click="()=>this.plus({amount:10})">plus 10</v-btn>
  <p> - result - </p>
  <p>{{count}}</p>
  <p>{{doubleCount}}</p>
  <p>{{fourtimeCount}}</p>
</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  mounted () {
    console.log(this.count);
    console.log(this.doubleCount);
    console.log(this.fourtimeCount);
  },
  methods: {
    ...mapMutations([
      'increment', 'plus'
    ]),
    ...mapActions([
      'incrementAsync'
    ])
  },
  computed: {
    ...mapState({
      count: state => state.corptaxPdfStore.count
    }),
    ...mapGetters([
      'doubleCount', 'fourtimeCount'
    ])
  },
}
</script>

<style>

</style>