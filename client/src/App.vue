<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { SharedBuefy } from "./services/sharedBuefy";
import NoteCard from "@/components/NoteCard";
import ErrorPage from "@/views/ErrorPage";
import Calendar from "@/components/Calendar";

export default {
  name: "App",
  metaInfo: {
    titleTemplate: "%s | DailyNotes"
  },
  components: {
  },
  mounted: function() {
    SharedBuefy.notifications = this.$buefy.toast;
    SharedBuefy.dialog = this.$buefy.dialog;
  }
};
</script>

<style lang="sass">
@import '~bulmaswatch/minty/_variables';
@import '~bulma/bulma';
@import '~bulmaswatch/minty/_overrides';

$app-background: #263238
$loading-background: $app-background
$loading-background-legacy: $app-background

$datepicker-background-color: darken($app-background, 2.5%)
$datepicker-shadow: none
$datepicker-item-color: #fff

@import "~buefy/src/scss/buefy";

html, body
  background-color: $datepicker-background-color
</style>

<style>
@import "~@fortawesome/fontawesome-free/css/all.css";

:root {
  --main-bg-color: #263238;
  --main-bg-darker: #212b30;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pagination-previous,
.pagination-next {
  border: 0;
}

.is-inline > .dropdown-menu {
  width: 100%;
}

html,
body {
  overflow: hidden;
  font-family: "Fira Code", monospace;
  font-family: "Montserrat", sans-serif;
}

*:focus {
  outline: none;
  border: transparent;
}

.light-white {
  color: #ddd;
}

.full-height {
  height: 100%;
}

.center-icon {
  width: 100% !important;
}

.huge.icon.is-large {
  height: auto;
}

.fas.huge-icon,
.fas.huge-icon::before {
  font-size: 2.5em !important;
}

.text-center {
  text-align: center;
}

.title {
  color: #ddd !important;
  margin-top: 15px;
}

.msg {
  color: #ddd !important;
  margin-top: auto;
  margin-bottom: auto;
}

.inputs {
  width: 90%;
  margin: 20px auto;
}

.mt-20 {
  margin-top: 20px;
}

.alt-button {
  cursor: pointer;
}

.msgs {
  color: #eea170;
}

.light-white > .loading-wrapper > .loading-overlay .loading-background {
  background-color: var(--main-bg-darker);
}

.header-loading {
  position: relative;
  height: 2em;
  width: 2em;
}

.header-loading > .loading-overlay .loading-icon::after {
  width: 1em !important;
  height: 1em !important;
  top: calc(50% - 0.5em) !important;
  left: calc(50% - 0.5em) !important;
}

.notification.is-dark {
  background-color: var(--main-bg-color);
  color: #ddd;
}

.CodeMirror-vscrollbar {
  overflow-y: auto;
}
</style>
