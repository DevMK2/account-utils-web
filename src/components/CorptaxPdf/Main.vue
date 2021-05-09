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
          <vue-dropzone 
            id="corptax-pdf-dropzone" 
            ref="myVueDropzone" 
            @vdropzone-error="afterUploadZipFailed"
            @vdropzone-file-added="beforeUploadZip"
            :options="dropzoneOptions"/>
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
      checkPdfListInterval: null,
      checkWaitingListInterval: null,
    }
  },
  mounted() {
    this.checkPdfListInterval = setInterval(this.checkDoneList, 1000);
  },
  beforeDestroy() {
    clearInterval(this.checkPdfListInterval);
  },
  watch: {
    pdfWaiting() {
      this.checkAndProcessWatingList();
    },
    pdfProcessing() {
      this.checkAndProcessWatingList();
    }
  },
  methods: {
    async checkDoneList() {
      this.pdfDone = [...await this.getPdfList(), 'done1.pdf', 'done2.pdf', 'processing.pdf'];
      // processing list 중 doneList에 있는 파일은 삭제
      this.pdfProcessing = this.pdfProcessing.filter(pdf => !this.pdfDone.includes(pdf));
    },
    checkAndProcessWatingList() {
      // processing list 가 비었으면 wating list 에서 하나 실행.
      if(this.pdfProcessing.length !== 0) {
        return;
      }
      const pdf = this.pdfWaiting.shift();
      this.processPdf(pdf);
      this.pdfProcessing.push(pdf);
    },
    beforeUploadZip(file) {
      console.log('beforeUploadZip', file);
      return false;
    },
    afterUploadZip(file) {
      console.log('afterUploadZip', file);
      //this.pdfWaiting.push('a');
    },
    afterUploadZipFailed(file) {
      const elements = document.querySelectorAll(".dz-file-preview");
      elements.forEach(element => {
        const filename = element.querySelectorAll(".dz-filename span")[0];
        if(!filename) {
          return;
        }

        if(filename.textContent === file.name) {
          const errorMessage = element.querySelector('.dz-error-message span');
          if(!file.name.includes('.zip')) {
            errorMessage.textContent=".zip 으로 압축된 파일만 업로드할 수 있습니다.";
          } else {
            errorMessage.textContent="원인을 알 수 없는 에러입니다.";
          }
        }
      });
    }
  },
}
</script>
