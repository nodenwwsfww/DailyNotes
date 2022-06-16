<template>
  <b-datepicker class="calendar-date-picker"
    inline
    :locale="$i18n.locale"
    v-model="sidebar.date"
    indicators="bars"
    :events="sidebar.events"
    @input="changeDate"
  >
  </b-datepicker>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import format from 'date-fns/format';

import SidebarInst from '../services/sidebar';

@Component
export default class Calendar extends Vue {
  public sidebar = SidebarInst;

  mounted() {
    this.sidebar.updateDate(this.$route);
    this.sidebar.getEvents();
    this.sidebar.getSidebarInfo(true);
  }

  public changeDate(value: any) {
    if (value && (value instanceof Date)) {
      const date: Date = value;

      console.log(date, format(date, 'MM-dd-yyyy'))
      console.log(date, date.toLocaleDateString(this.$i18n.locale));
      this.$router.push({ name: 'day-id', params: {
        id: format(date, 'MM-dd-yyyy', )
      } });
    }
  }
}
</script>

<style scoped lang="css">
@media (max-width:  320px) {
  .calendar-date-picker {
    max-width: 60%;
  }
}
</style>