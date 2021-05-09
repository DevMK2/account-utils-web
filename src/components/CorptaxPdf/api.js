export default {
  methods: {
    async getPdfList() {
      try {
        const list = await this.axios.get('/corptax/list');
        return list.data;
      } catch(e) {
        console.error(e);
        return [];
      }
    },
    async processPdf(fileName) {
      console.log(`process /corptax?id=${fileName.replace('.pdf', '')}`);
      return;
      //try {
      //  const result = await this.axios.post(`/corptax?id=${fileName.replace('.pdf', '')}`);
      //  console.log(result)
      //} catch(e){
      //  console.error(e);
      //}
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