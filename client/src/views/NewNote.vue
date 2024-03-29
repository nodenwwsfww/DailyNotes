<template>
  <div>
    <Header :options="headerOptions"></Header>
    <Editor v-bind:value="text" v-on:valChanged="valChanged" v-on:saveShortcut="saveNote"></Editor>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Route } from "vue-router";

import SidebarInst from '../services/sidebar';
import {NoteService} from '../services/notes';
import {newNote} from '../services/consts';

import {INote} from '../interfaces';

import Editor from '@/components/Editor.vue';
import Header from '@/components/Header.vue';
import UnsavedForm from '@/components/UnsavedForm.vue';

import {IHeaderOptions} from '../interfaces';


Component.registerHooks([
  'metaInfo',
  'beforeRouteLeave'
]);

@Component({
  components: {
    Editor,
    Header,
  }
})
export default class NewNote extends Vue {
  public sidebar = SidebarInst;
  public text: string = '';
  public modifiedText: string = '';
  public unsavedChanges : boolean = false;
  public title: string = this.$t('titles.new-note').toString();
  public note!: INote;
  public headerOptions: IHeaderOptions = {
    title: this.$t('titles.new-note').toString(),
    saveDisabled: true,
    saveFn: () => this.saveNote(),
  };

  public metaInfo(): any {
    return {
      title: this.title
    };
  };

  created() {
    window.addEventListener('beforeunload', this.unsavedAlert);
  }

  mounted() {
    this.text = newNote;

    this.note = {
      data: this.text,
      uuid: null
    };
  }

  beforeDestroy() {
    window.removeEventListener('beforeunload', this.unsavedAlert);
  }

  public async saveNote() {
    const updatedNote = Object.assign(this.note, {data: this.modifiedText});
    try {
      const res = await NoteService.createNote(updatedNote);
      this.sidebar.getSidebarInfo();
      this.unsavedChanges = false;
      this.$router.push({name: 'note-id', params: {uuid: (res as any).uuid}})
    } catch(e) {
      this.$buefy.toast.open({
        duration: 5000,
        message: this.$t('errors.saving-error').toString(),
        position: 'is-top',
        type: 'is-danger'
      });
    }

    this.headerOptions.showDelete = !!this.note.uuid;
  }

  beforeRouteLeave(to: Route, from: Route, next: Function) {
    if (this.unsavedChanges) {
      this.$buefy.modal.open({
        parent: this,
        component: UnsavedForm,
        hasModalCard: true,
        trapFocus: true,
        events: {
          cancel: () => {
            next(false);
          },
          discard: () => {
            next();
          },
          save: () => {
            this.saveNote();
            next();
          }
        }
      });
    } else {
      next();
    }
  }

  public valChanged(data: string) {
    this.modifiedText = data;

    if (this.modifiedText !== this.text) {
      this.title = `'* ${this.$t('titles.new-note').toString()}`;
      this.headerOptions.saveDisabled = false;
      this.unsavedChanges = true;
    } else {
      this.title = this.$t('titles.new-note').toString();
      this.headerOptions.saveDisabled = true;
    }
  }

  unsavedAlert(e: Event) {
    if (this.unsavedChanges) {
      // Attempt to modify event will trigger Chrome/Firefox alert msg
      e.returnValue = true;
    }
  }
}
</script>

<style scoped>
.loading-wrapper {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
