<template>
  <v-item-group class="vue-dropzone dropzone">
    <file-output processing :name="pdf" :key="pdf" v-for="pdf in pdfProcessing"/>
    <file-output waiting :name="pdf" :key="pdf" v-for="pdf in pdfWaiting"/>
    <file-output done :name="pdf" :key="pdf" :downloadDone="()=>downloadPdf(pdf)" :deleteDone="()=>deletePdf(pdf)" v-for="pdf in pdfDone"/>
  </v-item-group>
</template>

<script>
import apiMixin from '../api'
import FileOutput from './FileOutput.vue'

export default {
  components: { FileOutput },
  name: "FileOutputForm",
  mixins: [apiMixin],
  data: () => {
    return {
      pdfProcessing: ['processing.pdf'],
      pdfWaiting: ['wating1.pdf', 'wating2.pdf', 'wating3.pdf'],
      pdfDone: ['done1.pdf', 'done2.pdf', 'done3.pdf'],
      checkPdfListInterval: null,
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

<style>

</style>