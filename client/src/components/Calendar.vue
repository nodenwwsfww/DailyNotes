<template>
  <b-datepicker
    class="calendar-date-picker"
    inline
    :month-names="$t('months')"
    v-model="sidebar.date"
    indicators="bars"
    :events="sidebar.events"
    @input="changeDate"
  >
  </b-datepicker>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import format from "date-fns/format";

import SidebarInst from "../services/sidebar";
import { LOCALES } from "@/i18n/locales";
import { defaultLocale } from "@/i18n";

@Component
export default class Calendar extends Vue {
  public sidebar = SidebarInst;

  data() {
    return { LOCALES, defaultLocale };
  }

  mounted() {
    this.sidebar.updateDate(this.$route);
    this.sidebar.getEvents();
    this.sidebar.getSidebarInfo(true);
  }

  public changeDate(value: any) {
    if (value && value instanceof Date) {
      const date: Date = value;

      console.log(date, format(date, "MM-dd-yyyy"));
      console.log(date, date.toLocaleDateString(this.$i18n.locale));
      this.$router.push({
        name: "day-id",
        params: {
          id: format(date, "MM-dd-yyyy")
        }
      });
    }
  }
}
</script>

<style scoped lang="css">
@media (max-width: 390px) {
  .calendar-date-picker {
    width: 120%;
  }
}
</style>
