<template>
  <div class="columns no-margin is-mobile full-height main-element" z-index="4" style="position: relative">
    <div
      class="column sidebar is-6-mobile is-6-tablet is-two-fifths-desktop is-4-widescreen is-3-fullhd animated-show-element"
      id="home-sidebar-full" style="display: none"
    >
      <div class="rows">
        <div class="level-item alt-button" style="margin-bottom: 20px;" @click="toggleSidebar(true)" v-show="!sidebar.hide">
          <b-icon icon="grip-lines"> </b-icon>
        </div>
        <div class="level-item alt-button" style="margin-bottom: 20px;" @click="toggleSidebar()" v-show="sidebar.hide">
          <b-icon icon="grip-lines-vertical"> </b-icon>
        </div>
        <div
            class="columns light-white center-columns text-center selectors-parent"
        >
          <div class="column selectors-child">
            <b-tooltip :label="$t('tooltip.today').toString()" position="is-bottom">
              <div @click="today()">
                <b-icon
                    icon="book-open"
                    size="is-medium"
                    style="margin-top: .8em"
                    class="alt-button"
                >
                </b-icon>
              </div>
            </b-tooltip>
            <LanguageSelector style="margin-top: 5px;" />
          </div>
        </div>
      </div>
      <Calendar />
      <Tags />
    </div>
    <div
      class="column sidebar is-6-mobile is-6-tablet is-two-fifths-desktop is-4-widescreen is-3-fullhd"
      id="home-sidebar-hidden"
      style="width: 5%;"
    >
      <div class="level-item alt-button" @click="toggleSidebar(true)">
        <b-icon v-show="!sidebar.hide" icon="grip-lines"> </b-icon>
      </div>
      <div class="level-item alt-button" @click="toggleSidebar()">
        <b-icon v-show="sidebar.hide" icon="grip-lines-vertical"> </b-icon>
      </div>
    </div>
    <div class="column no-padding main-area" @click="focusEditor">
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Calendar from "@/components/Calendar.vue";
import Tags from "@/components/Tags.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";
import Header from "@/components/Header.vue";

import { IHeaderOptions } from "../interfaces";
import { updateJWT } from "../services/user";

import SidebarInst from "../services/sidebar";
import eventHub from "../services/eventHub";

const MINUTES = 60;
const SECONDS = 60;
const HOUR = MINUTES * SECONDS * 1000; // MS in an hour

@Component({
  components: {
    LanguageSelector,
    Calendar,
    Tags,
    Header
  },
  metaInfo: {
    title: "Home"
  },
  data: () => ({ sidebarShow: false })
})
export default class Admin extends Vue {
  public auth_timer: any = null;
  public sidebar = SidebarInst;

  public toggleSidebar(show = false) {
    this.sidebar.hide = show;
    const fullSidebar = document.getElementById("home-sidebar-full");
    const hiddenSidebar = document.getElementById("home-sidebar-hidden");

    if (!fullSidebar || !hiddenSidebar) return;

    if (show) {

      hiddenSidebar.classList.remove('animated-show-element');
      fullSidebar.classList.add('animated-show-element');

      hiddenSidebar.style.display = "none";
      fullSidebar.style.display = "block";

    } else {
      hiddenSidebar.classList.add('animated-hide-element');
      fullSidebar.classList.remove('animated-show-element');
      console.log('hide')
      hiddenSidebar.style.display = "block";
      fullSidebar.style.display = "none";
    }
  }

  mounted() {
    // Get new JWT every hour
    this.auth_timer = setInterval(() => updateJWT(), HOUR);
  }

  today() {
    this.$router.push({ name: "Home Redirect" });
  }

  beforeDestroy() {
    if (this.auth_timer) {
      clearInterval(this.auth_timer);
    }
  }

  focusEditor() {
    eventHub.$emit("focusEditor");
  }
}
</script>

<style scoped>
@media screen and (max-device-width: 620px) {
}
.no-margin {
  margin: 0px;
}

.no-padding {
  padding: 0px;
}

.center-columns {
  margin-left: auto;
  margin-right: auto;
}

.sidebar {
  overflow-y: auto;
  overflow-x: hidden;
  transition: 0.1s ease;
}

.rows {
  flex-direction: row-reverse;
  display: flex;
}
.animated-show-element {
  animation: forwards;
  animation-name: showSidebar;
  animation-duration: 1s;
}

.animated-hide-element {
  animation: forwards;
  animation-name: hideSidebar;
  animation-duration: 1s;
}

@keyframes showSidebar {
  0%   {width: 5%;}
  100% {width: 100%;}
}

@keyframes hideSidebar {
  0%   {width: 100%;}
  100% {width: 5%;}
}

.full-height {
  height: 100vh;
}

.main-area {
  background-color: var(--main-bg-color);
  overflow-y: auto;
  overflow-x: hidden;
}

.selectors-parent {
  white-space: nowrap;
  overflow-x: auto;
}

.selectors-child {
  display: inline-block;
}
</style>
