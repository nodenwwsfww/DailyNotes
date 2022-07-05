<template>
  <div class="columns no-margin is-mobile full-height main-element">
    <div
        class="album-section column sidebar is-6-mobile is-6-tablet is-two-fifths-desktop is-4-widescreen is-3-fullhd"
        id="home-sidebar-album"
        style="overflow: scroll;"
    >
      <div class="rows">
        <div
            class="columns light-white center-columns text-center"
        >
          <div class="column selectors-child">
            <b-tooltip
                :label="$t('tooltip.today').toString()"
                position="is-bottom"
            >
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
        class="album-section column sidebar is-6-mobile is-6-tablet is-two-fifths-desktop is-4-widescreen is-3-fullhd"
        style="width: 4%; overflow: scroll;"
        id="home-sidebar-portrait"
    >
      <div class="rows">
        <div class="level-item alt-button" style="margin-bottom: 20px;" @click="toggleSidebar(true)" v-show="!sidebar.hide">
          <b-icon icon="grip-lines"> </b-icon>
        </div>
        <div class="level-item alt-button" style="margin-bottom: 20px;" @click="toggleSidebar()" v-show="sidebar.hide">
          <b-icon icon="grip-lines-vertical"> </b-icon>
        </div>
        <div
            class="columns light-white center-columns text-center" id="mobile-content" style="display:none;"
        >
          <div class="column selectors-child">
            <b-tooltip
                :label="$t('tooltip.today').toString()"
                position="is-bottom"
            >
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
            <Calendar />
            <Tags />
          </div>
        </div>
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

import { IHeaderOptions } from "../interfaces";
import { updateJWT } from "../services/user";

import SidebarInst from "../services/sidebar";
import eventHub from "../services/eventHub";

import LanguageSelector from "@/components/LanguageSelector.vue";
import Calendar from "@/components/Calendar.vue";
import Tags from "@/components/Tags.vue";

const MINUTES = 60;
const SECONDS = 60;
const HOUR = MINUTES * SECONDS * 1000; // MS in an hour

@Component({
  components: {
    Calendar,
    Tags,
    LanguageSelector
  },
  metaInfo: {
    title: "Home"
  },
  data: () => ({ sidebarShow: false })
})
export default class Admin extends Vue {
  public auth_timer: any = null;
  public sidebar = SidebarInst;

  mounted() {
    // Get new JWT every hour
    this.auth_timer = setInterval(() => updateJWT(), HOUR);
    // if (window.innerWidth > window.innerHeight) { // Album orientation
    //
    // }

    if (window.innerWidth > window.innerHeight) {
      this.setOrientation('landscape');
    } else {
      this.setOrientation('portrait');
    }

    window
        .matchMedia('(orientation: portrait)')
        .addListener((m) => {
          if (m.matches) {
            this.setOrientation('portrait')

          } else {
            this.setOrientation('landscape')
          }
        });
  }

  toggleSidebar(show = false) {
    console.log(show, this.sidebar.hide)
    this.sidebar.hide = show;
    const sidebar = document.getElementById("home-sidebar-portrait");
    const content = document.getElementById("mobile-content");

    if (!sidebar || !content) return;

    if (show) {
      content.style.display='block'
      sidebar.classList.remove("animated-hide-element");
      sidebar.classList.add("animated-show-element");
      sidebar.style.width="100%";
    } else {
      content.style.display='none'
      sidebar.classList.remove("animated-show-element");
      sidebar.classList.add("animated-hide-element");
      console.log("hide");
    }
  }

  setOrientation(orientation: string) {
    console.log('portrait')
    const albumBlock = document.getElementById('home-sidebar-album');
    const portraitBlock = document.getElementById('home-sidebar-portrait');

    if (!albumBlock || !portraitBlock) return;

    if (orientation === 'portrait') {
      albumBlock.style.display = 'none';
      portraitBlock.style.display = 'block';
    } else if (orientation === 'landscape') {
      albumBlock.style.display = 'block';
      portraitBlock.style.display = 'none';
      console.log('landscape')
    }
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
.no-margin >>> {
  margin: 0px;
}

.no-padding  >>> {
  padding: 0px;
}

.animated-show-element >>> {
  animation: forwards;
  animation-name: showSidebar;
  animation-duration: 1s;
}

.animated-hide-element >>> {
  animation: forwards;
  animation-name: hideSidebar;
  animation-duration: 1s;
}

@keyframes showSidebar {
  0% {
    width: 4%;
  }
  100% {
    width: 100%;
  }
}

@keyframes hideSidebar {
  0% {
    width: 100%;
  }
  100% {
    width: 4%;
  }
}

.full-height >>> {
  height: 100vh;
}

.main-area >>> {
  background-color: var(--main-bg-color);
  overflow-y: auto;
  overflow-x: hidden;
}

.selectors-parent >>> {
  white-space: nowrap;
  overflow-x: auto;
}

.selectors-child >>> {
  display: inline-block;
}

@media screen and (min-width: 0px) and (max-width: 1204px) and (orientation: landscape) {
  html {
    transform: rotate(-90deg);
    transform-origin: left top;
    width: 100vh;
    overflow-x: hidden;
    position: absolute;
    top: 100%;
    left: 0;
  }
}
</style>
