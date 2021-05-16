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
          <dropzone-form/>
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
import Tooltip from '../common/Tooltip';
import File from './Output/File.vue';
import FileGroup from './Output/FileGroup.vue';
import apiMixin from './api'
import DropzoneForm from './Input/DropzoneForm.vue';

export default {
  name: 'CorptaxPdfMain',
  props: [ 'menu' ],
  mixins: [apiMixin],
  components: { Tooltip, DropzoneForm, File, FileGroup },
  data: () => {
    return {
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
  },
}
</script>
