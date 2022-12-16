<template>
  <div class="mb-10">
    <div class="dark-bg section d-flex justify-center">
      <div class="container-fluid">
        <div class="row col-md-12 justify-content-center" style="margin-top: 30px">
          <div class="col-md-3">
            <v-select
              :items="sidos"
              v-model="selectedSido"
              item-text="sidoName"
              item-value="dongCode"
              label="시도선택"
              @change="getGuguns"
              return-object
              solo
            ></v-select>
          </div>
          <div class="col-md-3">
            <v-select
              :items="guguns"
              v-model="selectedGugun"
              item-text="gugunName"
              item-value="dongCode"
              label="구군선택"
              @change="getDongs"
              return-object
              solo
            ></v-select>
          </div>
          <div class="col-md-3">
            <v-select
              :items="dongs"
              v-model="selectedDong"
              item-text="dongName"
              item-value="dongCode"
              label="동선택"
              return-object
              solo
            ></v-select>
          </div>
          <div class="col-md-3">
            <v-btn id="apt-btn" color="#005085" x-large @click="getAptInfo">아파트매매정보가져오기</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div id="wrapper">
      <v-row>
        <v-col cols="9">
          <div class="map_wrap">
            <div
              class="justify-content-center"
              id="map"
              style="width: 100%; height: 813px; position: relative; overflow: hidden"
            ></div>
            <ul id="category">
              <li id="BK9" data-order="0" @click="onClickCategory('BK9')">
                <span class="category_bg bank"></span>
                은행
              </li>
              <li id="MT1" data-order="1" @click="onClickCategory('MT1')">
                <span class="category_bg mart"></span>
                마트
              </li>
              <li id="PM9" data-order="2" @click="onClickCategory('PM9')">
                <span class="category_bg pharmacy"></span>
                약국
              </li>
              <li id="OL7" data-order="3" @click="onClickCategory('OL7')">
                <span class="category_bg oil"></span>
                주유소
              </li>
              <li id="CE7" data-order="4" @click="onClickCategory('CE7')">
                <span class="category_bg cafe"></span>
                카페
              </li>
              <li id="CS2" data-order="5" @click="onClickCategory('CS2')">
                <span class="category_bg store"></span>
                편의점
              </li>
            </ul>
          </div>
        </v-col>
        <v-col cols="3">
          <div id="menu_wrap">
            <template v-if="aptInfo">
              <v-card append>
                <v-row justify="center" class="mb-10 mt-1"> <h2 style="margin-top: 20px">아파트 정보</h2></v-row>
                <v-simple-table id="apart" class="table table-hover text-center" height="783px">
                  <thead>
                    <tr>
                      <th>아파트이름</th>
                      <th>법정동</th>
                      <th>지번</th>
                      <th>관심지역설정</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in aptList"
                      :key="index"
                      @mouseover="mouseOver(item)"
                      @mouseleave="mouseLeave(item)"
                    >
                      <td @click="detailApt(index)">{{ item.name }}</td>
                      <td>{{ item.dong }}</td>
                      <td>{{ item.jibun }}</td>
                      <td v-if="item.isCk" @click="changeCk(index)">
                        <v-img max-height="25" max-width="25" :src="require('@/assets/img/star_on.png')"></v-img>
                      </td>
                      <td v-else @click="changeCk(index)">
                        <v-img max-height="25" max-width="25" :src="require('@/assets/img/star_off.png')"></v-img>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card>
            </template>
            <v-card>
              <div v-show="detailView">
                <!-- <h3 id="detail-title">아파트 상세 정보</h3> -->
                <!-- <v-row justify="center" class="mb-5 mt-3"> <h2>아파트 상세 정보</h2></v-row> -->
                <div v-if="selectedAptImg == null">
                  <v-img
                    class="rounded-lg rounded-b-0"
                    id="apt-img"
                    max-width="100%"
                    max-height="300px"
                    :src="require('@/assets/img/no-image-icon.jpg')"
                    ><v-btn class="ma-2" fab small id="back-btn" @click="goBack"><v-icon>mdi-cat</v-icon></v-btn></v-img
                  >
                </div>
                <div v-else>
                  <v-img
                    id="apt-img"
                    max-width="100%"
                    max-height="300px"
                    object-fit
                    :src="selectedAptImg"
                    class="rounded-lg rounded-b-0"
                    ><v-btn class="ma-2" fab small id="back-btn" @click="goBack"><v-icon>mdi-cat</v-icon></v-btn></v-img
                  >
                </div>
                <!-- <h3>{{ selectedAptName }}</h3> -->
                <v-row justify="center" class="mt-3">
                  <h2>{{ selectedAptName }}</h2></v-row
                >
                <v-row justify="center" class="mb-5">
                  <h5 class="red--text">Build Year : {{ selectedBuildYear }}</h5></v-row
                >
                <v-divider></v-divider>
                <h4 class="ml-3 mt-3">시세 경향</h4>
                <v-sparkline
                  class="ml-3 mr-3"
                  :labels="chart.years"
                  :value="chart.value"
                  :gradient="chart.gradient"
                  :smooth="chart.radius || false"
                  :padding="chart.padding"
                  :line-width="chart.width"
                  :stroke-linecap="chart.lineCap"
                  :gradient-direction="chart.gradientDirection"
                  :fill="chart.fill"
                  :type="chart.type"
                  :auto-line-width="chart.autoLineWidth"
                  auto-draw
                >
                </v-sparkline>
                <v-divider class="mt-3"></v-divider>
                <h4 class="ml-3 mt-3 mb-3">매매 정보</h4>
                <v-select class="ml-3 mr-3" :items="years" v-model="selectedYear" @change="changeYear"></v-select>
                <v-data-table
                  class="ml-3 mr-3"
                  :headers="detailHeaders"
                  :items="selectedAptDeal"
                  :items-per-page="5"
                ></v-data-table>
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import http from "@/util/http.js";
import { mapState } from "vuex";
import router from "@/router";
import store from "@/store";

let validCheck = function (data) {
  if (data == "not Login") {
    alert("로그인 해주세요.");
    router.push({ name: "login" });
    return false;
  } else if (data == "not Valid") {
    alert("유효하지 않은 토큰입니다.");
    store.dispatch("userStore/logout");
    router.push({ name: "login" });
    return false;
  }
  return true;
};

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

export default {
  async created() {
    // 브라우저가 열리면 시도정보 얻기.
    this.sidos = await this.sendRequest("sido");
  },
  data() {
    return {
      aptInfo: false,
      detailView: false,
      sidos: [],
      guguns: [],
      dongs: [],
      years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
      selectedSido: null,
      selectedGugun: null,
      selectedDong: null,
      selectedYear: 2022,
      selectedMonth: null,
      ckList: [],
      map: null,
      markers: [],
      categoryMarkers: {},
      infowindow: null,
      currCategory: "",
      el: null,
      ps: null,
      positions: [],
      clusterer: null,
      aptList: [],
      selectedApt: null,
      selectedAptName: null,
      selectedBuildYear: null,
      selectedAptImg: null,
      selectedAptDeal: [],
      detailHeaders: [
        { text: "층", value: "floor" },
        { text: "면접", value: "area" },
        { text: "거래 금액", value: "dealAmount" },
      ],
      chart: {
        width: 2,
        radius: 10,
        padding: 8,
        lineCap: "round",
        gradient: gradients[5],
        value: [],
        years: [],
        gradientDirection: "top",
        gradients,
        fill: false,
        type: "trend",
        autoLineWidth: false,
      },
    };
  },
  mounted() {
    // this.addCategoryClickEvent();
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      this.addKakaoMapScript();
    }
  },
  computed: {
    ...mapState("userStore", ["loginInfo"]),
  },
  methods: {
    /* eslint-disable */
    addKakaoMapScript() {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?appkey=990dc7405c46ef7868fb137ebe4a7cc6&libraries=services,clusterer&autoload=false";
      document.head.appendChild(script);
    },
    initMap() {
      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);
      this.ps = new kakao.maps.services.Places(this.map);
    },
    async sendRequest(selid, regcode) {
      if (selid == "sido") {
        let { data } = await http.get("/dong-code/sido");
        if (validCheck(data)) return data.regcodes;
      } else if (selid == "gugun") {
        let { data } = await http.get("/dong-code/gugun/" + regcode);
        return data.regcodes;
      } else if (selid == "dong") {
        let { data } = await http.get("/dong-code/dong/" + regcode);
        return data.regcodes;
      }
    },
    getMonths(year) {
      let date = new Date();
      let month = date.getMonth() + 1;
      let m = year == date.getFullYear() ? month : 13;
      for (let i = 1; i < m; i++) {
        this.months.push(i);
      }
    },
    async getGuguns() {
      this.guguns = await this.sendRequest("gugun", this.selectedSido.dongCode);
    },
    async getDongs() {
      this.dongs = await this.sendRequest("dong", this.selectedGugun.dongCode);
      let params = "regcode=" + this.selectedGugun.dongCode.substring(0, 5) + "&userId=" + this.loginInfo.id;
      let { data } = await http.get("/apts/guguns/?" + params);
      this.aptInfo = true;
      this.detailView = false;
      this.ckList = data.aptcode;
      if (this.markers.length != 0) {
        this.clusterer.removeMarkers(this.markers);
      }
      this.removeMarker();
      let bounds = new kakao.maps.LatLngBounds();
      this.aptList = [];
      this.infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      this.clusterer = new kakao.maps.MarkerClusterer({
        map: this.map,
        averageCenter: true,
        minLevel: 5,
      });
      for (let [idx, home] of data.homes.entries()) {
        let name = home.apartmentName;
        let code = home.aptCode;
        let buildYear = home.buildYear;
        let dong = home.dong;
        let jibun = home.jibun;
        let lat = home.lat;
        let lng = home.lng;
        let img = home.img;
        let aptInfo = {
          code,
          name,
          buildYear,
          dong,
          jibun,
          lat,
          lng,
          img,
          year: {
            2015: [],
            2016: [],
            2017: [],
            2018: [],
            2019: [],
            2020: [],
            2021: [],
            2022: [],
          },
          isCk: this.ckList.includes(code),
        };
        for (let deal of home.houseDeals) {
          aptInfo["year"][deal.dealYear].push(deal);
        }
        this.aptList.push(aptInfo);

        let coords = new kakao.maps.LatLng(parseFloat(lat), parseFloat(lng));
        let infowindow = new kakao.maps.InfoWindow({
          content: '<div style="padding:5px;z-index:1;">' + name + "</div>",
          disableAutoPan: true,
        });
        let marker = new kakao.maps.Marker({
          position: coords,
          title: name,
        });

        kakao.maps.event.addListener(marker, "mouseover", () => {
          infowindow.open(this.map, marker);
        });
        kakao.maps.event.addListener(marker, "mouseout", () => {
          infowindow.close();
        });
        kakao.maps.event.addListener(marker, "click", () => {
          this.map.panTo(coords);
          this.detailApt(idx);
        });
        this.markers.push(marker);
        bounds.extend(coords);
      }
      this.clusterer.addMarkers(this.markers);
      this.map.setBounds(bounds);
    },
    async getAptInfo() {
      let params = "regcode=" + this.selectedDong.dongCode + "&userId=" + this.loginInfo.id;

      let { data } = await http.get("/apts?" + params);
      if (data.empty == "T") {
        alert("해당 매물 정보가 없습니다!");
        return;
      }
      this.aptInfo = true;
      this.detailView = false;
      if (this.markers.length != 0) {
        this.clusterer.removeMarkers(this.markers);
      }
      // data - > homes - >
      //aptcode,aptcode,buildyear,dong
      //houseDeals -> aptcode,area,dealamount,dealMonth,dealYear,floor
      this.ckList = data.aptcode;
      this.removeMarker();
      let bounds = new kakao.maps.LatLngBounds();
      this.infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      this.aptList = [];
      for (let [idx, home] of data.homes.entries()) {
        let name = home.apartmentName;
        let code = home.aptCode;
        let buildYear = home.buildYear;
        let dong = home.dong;
        let jibun = home.jibun;
        let lat = home.lat;
        let lng = home.lng;
        let img = home.img;
        let aptInfo = {
          code,
          name,
          buildYear,
          dong,
          jibun,
          lat,
          lng,
          img,
          year: {
            2015: [],
            2016: [],
            2017: [],
            2018: [],
            2019: [],
            2020: [],
            2021: [],
            2022: [],
          },
          isCk: this.ckList.includes(code),
        };
        for (let deal of home.houseDeals) {
          aptInfo["year"][deal.dealYear].push(deal);
        }
        this.aptList.push(aptInfo);
        this.positions.push({ lat: parseFloat(lat), lng: parseFloat(lng) });
        let coords = new kakao.maps.LatLng(parseFloat(lat), parseFloat(lng));
        let infowindow = new kakao.maps.InfoWindow({
          content: '<div style="padding:5px;z-index:1;">' + name + "</div>",
          disableAutoPan: true,
        });
        let marker = new kakao.maps.Marker({
          map: this.map,
          position: coords,
          title: name,
        });

        this.markers.push(marker);

        kakao.maps.event.addListener(marker, "mouseover", () => {
          infowindow.open(this.map, marker);
        });

        kakao.maps.event.addListener(marker, "mouseout", () => {
          infowindow.close();
        });
        kakao.maps.event.addListener(marker, "click", () => {
          this.map.panTo(coords);
          this.detailApt(idx);
        });
        bounds.extend(coords);
      }
      this.map.setBounds(bounds);
    },
    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    removeCategoryMarker(id) {
      if (!this.categoryMarkers[id]) {
        return;
      }
      for (let i = 0; i < this.categoryMarkers[id].length; i++) {
        this.categoryMarkers[id][i].setMap(null);
      }
      delete this.categoryMarkers[id];
    },
    changeCk(idx) {
      if (this.aptList[idx].isCk) {
        let delIdx = this.ckList.indexOf(this.aptList[idx].code);
        this.ckList.splice(delIdx, 1);
        this.aptList[idx].isCk = false;
      } else {
        this.aptList[idx].isCk = true;
        if (!this.ckList.includes(this.aptList[idx].code)) this.ckList.push(this.aptList[idx].code);
      }
      http.post("/apts/ck/" + this.loginInfo.id, this.ckList);
    },
    detailApt(idx) {
      this.detailView = true;
      this.aptInfo = false;

      let el = document.getElementById("map");
      let el2 = document.getElementsByClassName("map_wrap");
      el2[0].style.height = "976px";
      el.style.height = "976px";
      this.selectedApt = this.aptList[idx];
      let coords = new kakao.maps.LatLng(parseFloat(this.selectedApt.lat), parseFloat(this.selectedApt.lng));
      this.map.panTo(coords);
      this.selectedAptName = this.selectedApt.name;
      this.selectedBuildYear = this.selectedApt.buildYear;
      this.selectedAptDeal = this.selectedApt.year[2022];
      if (
        this.selectedApt.img == "assets/img/no-image-icon.jpg?w=500&h=375&q=60&a=1" ||
        this.selectedApt.img == "https://s.zigbang.com/v2/web/og/zigbang_default.png?v=20200709"
      ) {
        this.selectedAptImg = null;
      } else {
        this.selectedAptImg = this.selectedApt.img;
      }
      console.log(this.selectedAptImg);
      let chartValue = [];
      let chartYear = [];
      for (let year of this.years) {
        const sum = this.selectedApt.year[year].reduce(
          (prev, cur) => prev + Math.round(parseInt(cur.dealAmount.replace(",", "")) / parseInt(cur.area)),
          0
        );
        const average = Math.round(sum / this.selectedApt.year[year].length);

        if (!isNaN(average)) {
          chartValue.push(average);
          chartYear.push(year);
        }
      }
      this.chart.value = chartValue;
      this.chart.years = chartYear;
    },
    goBack() {
      this.detailView = false;
      this.aptInfo = true;
      this.selectedYear = 2022;
      this.infowindow.close();
      let el = document.getElementById("map");
      let el2 = document.getElementsByClassName("map_wrap");
      el2[0].style.height = "813px";
      el.style.height = "813px";
    },
    changeYear() {
      this.selectedAptDeal = this.selectedApt.year[this.selectedYear];
    },
    mouseOver(item) {
      let marker;
      for (let i = 0; i < this.markers.length; i++) {
        if (this.markers[i].Gb == item.name) {
          marker = this.markers[i];
        }
      }
      let content = '<div style="padding:5px;">' + item.name + "</div>";
      this.infowindow.setContent(content);
      this.infowindow.open(this.map, marker);
    },
    mouseLeave() {
      this.infowindow.close();
    },
    onClickCategory(id) {
      this.el = document.getElementById(id);
      let className = this.el.className;
      if (className === "on") {
        this.currCategory = "";
        this.changeCategoryClass();
        this.removeCategoryMarker(id);
      } else {
        this.currCategory = id;
        this.changeCategoryClass(this.el);
        this.searchPlaces();
      }
    },
    changeCategoryClass(el) {
      if (el) {
        this.el.className = "on";
      } else {
        this.el.className = "";
      }
    },
    searchPlaces() {
      if (!this.currCategory) {
        return;
      }
      this.ps.categorySearch(this.currCategory, this.placesSearchCB, { useMapBounds: true });
    },
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        this.displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    },
    displayPlaces(places) {
      let order = document.getElementById(this.currCategory).getAttribute("data-order");
      for (let i = 0; i < places.length; i++) {
        this.addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);
      }
    },
    addMarker(position, order) {
      let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      if (this.categoryMarkers[this.currCategory]) {
        this.categoryMarkers[this.currCategory].push(marker); // 배열에 생성된 마커를 추가합니다
      } else {
        this.categoryMarkers[this.currCategory] = [marker];
      }
      return marker;
    },
  },
};
</script>

<style>
#apt-img {
  max-width: 100%;
  max-height: 300px;
}
#category {
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  padding-left: 0;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
}
#category li {
  float: left;
  list-style: none;
  width: 70px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
#category li .category_bg {
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png) no-repeat;
}
#category li .bank {
  background-position: -10px 0px;
}
#category li .mart {
  background-position: -10px -36px;
}
#category li .pharmacy {
  background-position: -10px -72px;
}
#category li .oil {
  background-position: -10px -108px;
}
#category li .cafe {
  background-position: -10px -144px;
}
#category li .store {
  background-position: -10px -180px;
}
#category li.on .category_bg {
  background-position-x: -46px;
}
.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 813px;
}
#wrapper {
  padding: 10px 10px;
}
#apt-btn .v-btn__content {
  color: #fff;
  font-weight: bold;
}
</style>
