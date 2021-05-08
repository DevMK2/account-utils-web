<template>
  <v-container>
    <v-main class="pa-3" style="background-color:white">
      <v-row class="text-center">
        <v-col class="mb-4">
          <h1 :style="'color:'+this.menu.color" class="display-1 font-weight-bold mb-3">
            {{this.menu.title}}
            <v-tooltip right>
              <template v-slot:activator="{on, attrs}">
                <v-icon color="grey" v-bind="attrs" v-on="on">
                  mdi-help-circle-outline 
                </v-icon>
              </template>
              <span>
                <p v-html="this.menu.description"/>
              </span>
            </v-tooltip>
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5.5">
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
        </v-col>
        <v-col cols="1" style="display:flex; justify-content:center; align-items:flex-start">
          <v-icon x-large color="blue darken-2">mdi-arrow-right-thick</v-icon>
        </v-col>
        <v-col cols="5.5">
          <file-group>
            <file :name="corptaxPdf" :key="corptaxPdf" v-for="corptaxPdf in corptaxPdfList"/>
          </file-group>
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import File from './output/File.vue';
import FileGroup from './output/FileGroup.vue';

export default {
  name: 'HelloWorld',
  props: [ 'menu' ],
  components: {
    vueDropzone: vue2Dropzone, File,
      FileGroup
  },
  data: () => {
    return {
      dropzoneOptions: {
          url: '/zip-open',
          thumbnailWidth: 200,
          maxFilesize: 100,
          dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>Upload .zip Files",
          headers: { "My-Awesome-Header": "header value" }
      },
      corptaxPdfList: ['149.pdf', '143.pdf', 'a.pdf'],
      getListInterval: null
    }
  },
  mounted() {
    this.getListInterval = setInterval(this.getlist, 1000);
  },
  beforeDestroy() {
    clearInterval(this.getListInterval);
  },
  methods: {
    async check() {
      try {
        const res = await this.axios.get('/');
        console.log(res);
      } catch(e){
        console.error(e);
      }
    },
    async getlist() {
      try {
        const list = await this.axios.get('/corptax/list');
        console.log(list.data);
      } catch(e) {
        console.error(e);
      }
    }
  },
}
</script>
