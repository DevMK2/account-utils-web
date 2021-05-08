<template>
  <v-app>
    <v-slide-group mandatory v-model="selectedMenuIdx" @change="selectedMenuIdxChange" class="pa-4" center-active show-arrows>
      <v-slide-item v-for="menu in menuList" :key="menu.title" v-slot="{ active, toggle }" >
        <v-card
          :color="active ? menu.color : 'grey lighten-1'"
          class="pa-3 ma-3" height="100%" width="200" @click="toggle"
        >
          <v-row align="center" justify="center">
            <h3 :style="active? 'color:white' : ''">
              {{menu.title}}
            </h3>
          </v-row>
          <v-row align="center" justify="center">
            <v-scale-transition>
              <v-icon v-if="active" color="white">
                {{
                  menu.title!=='준비중'?
                    'mdi-check-circle-outline' : 'mdi-minus-circle-outline'
                }}
              </v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
    </v-slide-item>
    </v-slide-group>
    <v-main :style="selectedBackground">
      <CorptaxPdfMain :menu="selectedMenu"/>
    </v-main>
  </v-app>
</template>

<script>
import CorptaxPdfMain from './components/CorptaxPdf/Main';

export default {
  name: 'App',
  components: {
    CorptaxPdfMain
  },
  data() {
    return {
      selectedMenuIdx: 0,
      selectedMenu: {
        title: '법인세신고서 통합', 
        color: '#1296f3cc',
        description: `
          법인세신고서 통합 설명.  법인세신고서 통합 설명.  법인세신고서 통합 설명. <br/>
          법인세신고서 통합 설명.  법인세신고서 통합 설명.  법인세신고서 통합 설명. <br/>
          법인세신고서 통합 설명.  법인세신고서 통합 설명.  법인세신고서 통합 설명. <br/>
        `
      },
      menuList: [
        {
          title: '법인세신고서 통합', 
          color: '#1296f3cc',
          description: `
            법인세신고서 통합 설명.  법인세신고서 통합 설명.  법인세신고서 통합 설명. <br/>
            법인세신고서 통합 설명.  법인세신고서 통합 설명.  법인세신고서 통합 설명. <br/>
            법인세신고서 통합 설명.  법인세신고서 통합 설명.  법인세신고서 통합 설명. <br/>
          `
        },
        {
          title: '계좌거래내역 정규화',
          color: 'green',
          description: `
            계좌거래내역 졍규화 설명.  계좌거래내역 졍규화 설명.  계좌거래내역 졍규화 설명.  <br/>
            계좌거래내역 졍규화 설명.  계좌거래내역 졍규화 설명.  계좌거래내역 졍규화 설명.  <br/>
            계좌거래내역 졍규화 설명.  계좌거래내역 졍규화 설명.  계좌거래내역 졍규화 설명.  <br/>
          `
        },
        {
          title: '준비중',
          color: '#ff5252'
        }
      ],
    }
  },
  methods: {
    selectedMenuIdxChange() {
      console.log(this.menuList[this.selectedMenuIdx].title);
      this.selectedMenu = this.menuList[this.selectedMenuIdx];
    }
  },
  computed: {
    selectedBackground() {
      return 'background-color:' + this.selectedMenu.color;
    }
  },
};
</script>
