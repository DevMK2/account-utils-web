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
            <file processing :name="pdf" :key="pdf" v-for="pdf in pdfProcessing"/>
            <file waiting :name="pdf" :key="pdf" v-for="pdf in pdfWaiting"/>
            <file done :name="pdf" :key="pdf" :downloadDone="()=>downloadPdf(pdf)" :deleteDone="()=>deletePdf(pdf)" v-for="pdf in pdfDone"/>
          </file-group>
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import File from '../common/output-file/File.vue';
import FileGroup from '../common/output-file/FileGroup.vue';
import apiMixin from './api'

export default {
  name: 'CorptaxPdfMain',
  props: [ 'menu' ],
  mixins: [apiMixin],
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
      pdfProcessing: ['processing.pdf'],
      pdfWaiting: ['wating1.pdf', 'wating2.pdf', 'wating3.pdf'],
      pdfDone: ['done1.pdf', 'done2.pdf', 'done3.pdf'],
      checkPdfListInterval: null
    }
  },
  mounted() {
    this.checkPdfListInterval = setInterval(this.checkPdfList, 1000);
  },
  beforeDestroy() {
    clearInterval(this.checkPdfListInterval);
  },
  methods: {
  },
}
</script>
