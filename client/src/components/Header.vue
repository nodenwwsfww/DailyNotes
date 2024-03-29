<template>
  <div class="header-wrapper light-white" @click="prevent($event)">
    <div class="main-header level is-mobile">
      <div class="level-left">
        <div class="level-item alt-button" v-if="sidebar.tasks.length">
          <b-dropdown aria-role="list">
            <b-tooltip
              :label="$t('buttons.Tasks').toString()"
              position="is-bottom"
              slot="trigger"
              role="button"
            >
              <b-icon icon="tasks"></b-icon>
            </b-tooltip>
            <b-dropdown-item
              custom
              v-for="task of sidebar.tasks"
              v-bind:key="task.uuid"
            >
              <SimpleTask :task="task"></SimpleTask>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="level-item alt-button">
          <div @click="goToSearch()">
            <b-tooltip
              :label="$t('buttons.Search-notes').toString()"
              position="is-bottom"
            >
              <b-icon icon="search"></b-icon>
            </b-tooltip>
          </div>
        </div>
      </div>
      <div class="level-item has-text-primary">
        <div @click="prevDay()" class="alt-button" v-if="options.showDateNavs">
          <b-icon icon="chevron-left"></b-icon>
        </div>
        <div class="header-title light-white" id="header-title-date">
          {{ formatDate(options.title, $i18n.locale) }}
        </div>
        <div @click="nextDay()" class="alt-button" v-if="options.showDateNavs">
          <b-icon icon="chevron-right"></b-icon>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item" v-if="isSaving">
          <div class="header-loading">
            <b-loading :is-full-page="false" :active="true"></b-loading>
          </div>
        </div>
        <div
          v-show="options.saveFn"
          class="level-item alt-button"
          v-bind:class="{ 'save-disabled': options.saveDisabled }"
          @click="save()"
        >
          <b-tooltip
            :label="$t('buttons.Save').toString()"
            position="is-bottom"
          >
            <b-icon icon="save"></b-icon>
          </b-tooltip>
        </div>
        <div
          class="level-item alt-button"
          v-show="options.showDelete"
          @click="deleteNote()"
        >
          <b-tooltip
            :label="$t('buttons.Delete').toString()"
            position="is-bottom"
          >
            <b-icon icon="trash-alt"></b-icon>
          </b-tooltip>
        </div>
        <div class="level-item alt-button">
          <b-dropdown position="is-bottom-left" :close-on-click="true" id="dropdown-right-corner-div">
            <b-icon slot="trigger" icon="ellipsis-v"></b-icon>
            <b-dropdown-item>
              <b-switch
                v-model="sidebar.autoSave"
                @input="sidebar.toggleAutoSave"
              >
                {{
                  sidebar.autoSave
                    ? $t("buttons.disable-auto-save").toString()
                    : $t("buttons.enable-auto-save").toString()
                }}
              </b-switch>
            </b-dropdown-item>
            <b-dropdown-item @click="logout()">{{
              $t("buttons.Logout").toString()
            }}</b-dropdown-item>
            <b-dropdown-item @click="exportNotes()">{{
              $t("buttons.Export-Notes").toString()
            }}</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import _ from "lodash";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import format from "date-fns/format";

import SidebarInst from "../services/sidebar";
import { clearToken } from "../services/user";
import { NoteService } from "../services/notes";

import { IHeaderOptions } from "../interfaces";

import SimpleTask from "./SimpleTask.vue";
import { formatDate } from "../i18n";

@Component({
  components: {
    SimpleTask
  },
  props: {
    options: {
      type: Object,
      required: true
    }
  }
})
export default class Header extends Vue {
  public sidebar = SidebarInst;
  public options!: IHeaderOptions;
  public isSaving: boolean = false;

  public formatDate = formatDate;
  public newNote() {
    this.$router.push({ name: "new-note" }).catch(err => {});
  }

  public goToSearch(searchType: string, tag: string) {
    this.$router.push({ name: "search" }).catch(err => {});
  }

  public prevent($event: any) {
    $event.stopPropagation();
  }

  mounted() {
    // Костыль 1 (buefy красавчики)
    const dropdownBackground = document.querySelector<HTMLElement>('#dropdown-right-corner-div>.background')
    if (!dropdownBackground) return;


    // const dropdownMenu = document.querySelector<HTMLElement>('#dropdown-right-corner-div>.dropdown-menu');
    // if (!dropdownMenu) return;

    const dropdownTrigger = document.querySelector('.dropdown-trigger')
    dropdownBackground.addEventListener('click', () => {
      let clickEvent = new Event('click');
      if (dropdownTrigger) dropdownTrigger.dispatchEvent(clickEvent);
    });

    setTimeout(() => {
      this.adaptiveForSmallDisplays();
    }, 100);

  }
  public adaptiveForSmallDisplays() {
    // Костыли мужицкие (дубль 2) mobile adaptavity
    console.log(window.innerWidth)
    if (window.innerWidth <= 390) {
      const headerTitle = document.getElementById('header-title-date');
      if (!headerTitle) return;
      headerTitle.style.fontSize = "small"
      const date = new Date(this.options.title);
      headerTitle.textContent = format(date, "MM-dd-yyyy")
    }
  }

  public prevDay() {
    const date = subDays(this.sidebar.date, 1);
    this.$router.push({
      name: "day-id",
      params: { id: format(date, "MM-dd-yyyy") }
    });
  }

  public nextDay() {
    const date = addDays(this.sidebar.date, 1);
    this.$router.push({
      name: "day-id",
      params: { id: format(date, "MM-dd-yyyy") }
    });
  }

  public async save() {
    if (
      this.options.saveDisabled ||
      this.isSaving ||
      !this.options.saveFn ||
      !_.isFunction(this.options.saveFn)
    ) {
      return;
    }

    this.isSaving = true;

    try {
      await this.options.saveFn();
    } catch (e) {}

    this.isSaving = false;
  }

  public async deleteNote() {
    if (
      !this.options.showDelete ||
      this.isSaving ||
      !this.options.deleteFn ||
      !_.isFunction(this.options.deleteFn)
    ) {
      return;
    }

    this.isSaving = true;

    try {
      await this.options.deleteFn();
    } catch (e) {}

    this.isSaving = false;
  }

  public async exportNotes() {
    NoteService.exportNotes();
  }

  public logout() {
    clearToken();
    this.$router.push({ name: "Login" });
  }
}
</script>

<style scoped>

.header-wrapper {
  width: 100%;
  padding: 10px 20px 0px 20px;
  border-bottom: 2px solid var(--main-bg-darker);
  position: sticky;
  z-index: 100;
  top: 0;
  background-color: var(--main-bg-color);
}

.main-header {
  margin-right: auto;
  margin-left: auto;
  height: 3em;
}

.header-title {
  margin-left: 1em;
  margin-right: 1em;
  font-weight: bold;
}

.save-disabled {
  color: #888;
  cursor: unset;
}
</style>
