<template>
  <div>
    <Header :options="headerOptions"></Header>
    <div class="search-container">
      <b-field explanded>
        <b-select v-model="sidebar.selectedSearch">
          <option value="project">{{$t('search.Project')}}</option>
          <option value="tag">{{$t('search.Tag')}}</option>
          <option value="search">{{$t('search.Text')}}</option>
        </b-select>
        <b-input :placeholder="$t('form.placeholders.search-query')" v-model="sidebar.searchString" expanded @keyup.native.enter="sidebar.searchNotes"></b-input>
        <p class="control">
          <button class="button is-success" type="button" @click="sidebar.searchNotes()">{{$t('buttons.Search')}}</button>
        </p>
      </b-field>
      <div v-if="!sidebar.searchLoading">
        <div v-if="!sidebar.filteredNotes.length" class="mt-25">
          <b-notification
            type="is-dark"
            :closable="false"
          >
            {{ $t('notifications.no-match-notes') }}
          </b-notification>
        </div>
        <masonry
          :cols="{default: 4, 1250: 3, 1000: 2, 750: 1}"
          :gutter="10"
          class="mt-25"
        >
          <NoteCard v-for="note in sidebar.filteredNotes" :key="note.uuid" :note="note"></NoteCard>
        </masonry>
      </div>
      <div v-else class="loading-wrapper">
        <b-loading :is-full-page="false" :active="sidebar.searchLoading"></b-loading>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import _ from 'lodash';

import Header from '@/components/Header.vue';
import NoteCard from '@/components/NoteCard.vue';

import SidebarInst from '../services/sidebar';

import {IHeaderOptions, INote} from '../interfaces';

@Component({
  metaInfo: {
    title: 'Search'
  },
  components: {
    Header,
    NoteCard,
  }
})

export default class Search extends Vue {
  public sidebar = SidebarInst;
  public headerOptions: IHeaderOptions = {
    title: 'Search',
  };

  @Watch('$route', { immediate: true, deep: true })
  routeQueryChanged() {
    this.setSearch();
  }

  mounted() {
    this.setSearch();
  }

  public setSearch() {
    const searchHash = `${this.sidebar.selectedSearch}:${this.sidebar.searchString}`;

    let selectedSearch: string;
    let searchString: any;

    if (this.$route.query.tag) {
      selectedSearch = 'tag';
      searchString = this.$route.query.tag;
    } else if (this.$route.query.project) {
      selectedSearch = 'project';
      searchString = this.$route.query.project;
    } else if (this.$route.query.search) {
      selectedSearch = 'search';
      searchString = this.$route.query.search;
    } else {
      selectedSearch = 'search';
      searchString = '';
    }

    if (searchHash !== `${selectedSearch}:${searchString}`) {
      this.sidebar.selectedSearch = selectedSearch;
      this.sidebar.searchString = searchString;

      this.sidebar.searchNotes();
    }
  }
}
</script>

<style scoped>
.search-container {
  padding: 1.5em;
  height: 100%;
}

.mt-25 {
  margin-top: 25px;
}

.loading-wrapper {
  width: 100%;
  height: 50vh;
  position: relative;
}
</style>