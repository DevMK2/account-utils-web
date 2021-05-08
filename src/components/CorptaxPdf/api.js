export default {
  methods: {
    async checkPdfList() {
      try {
        const list = await this.axios.get('/corptax/list');
        console.log(list.data);
      } catch(e) {
        console.error(e);
      }
    },
    async downloadPdf(fileName) {
      console.log(`download /corptax?id=${fileName.replace('.pdf', '')}`);
      try {
        const result = await this.axios.get(`/corptax?id=${fileName.replace('.pdf', '')}`);
        console.log(result)
      } catch(e){
        console.error(e);
      }
    },
    async deletePdf(fileName) {
      console.log(`delete /corptax?id=${fileName.replace('.pdf', '')}`);
      try {
        const result = await this.axios.delete(`/corptax?id=${fileName.replace('.pdf', '')}`);
        console.log(result)
      } catch(e){
        console.error(e);
      }
    },
  },
};