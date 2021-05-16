<template>
  <v-container>
    <v-main class="pa-3" style="background-color:white">
      <v-row class="text-center">
        <v-col class="mb-4">
          <h1 :style="'color:'+this.menu.color" class="display-1 font-weight-bold mb-3">
            {{this.menu.title}}
            <tooltip :inner-msg="this.menu.description"/>
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5.5">
          <file-input-form/>
        </v-col>
        <v-col cols="1" style="display:flex; justify-content:center; align-items:flex-start">
          <v-icon x-large color="blue darken-2">mdi-arrow-right-thick</v-icon>
        </v-col>
        <v-col cols="5.5">
          <file-output-form/>
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<script>
import Tooltip from '../common/Tooltip';
import FileInputForm from './Input/FileInputForm.vue';
import FileOutputForm from './Output/FileOutputForm.vue';

export default {
  name: 'CorptaxPdfMain',
  props: [ 'menu' ],
  components: { Tooltip, FileInputForm, FileOutputForm }
}
</script>
