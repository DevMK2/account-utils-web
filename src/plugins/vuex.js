import Vue from 'vue';
import Vuex from 'vuex';
import corptaxPdfContext from '../components/CorptaxPdf/context'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    corptaxPdfStore : corptaxPdfContext.store
  }
});
