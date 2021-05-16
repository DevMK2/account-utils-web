<template>
  <v-tooltip right>
    <template v-slot:activator="{on, attrs}">
      <v-icon color="grey" v-bind="attrs" v-on="on">
        mdi-help-circle-outline 
      </v-icon>
    </template>
    <span>
      <p v-html="innerMsg"/>
    </span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    innerMsg: String
  }
}
</script>

<style>

</style>