<template>
  <transition>
    <div v-if="isActive" class="dialog modal is-active">
      <div class="modal-background" @click="cancel('outside')" />
      <div class="modal-card animation-content">
        <header class="modal-card-head">
          <p class="modal-card-title" style="line-height: 1">{{$t("titles.unsaved-content")}}</p>
        </header>

        <section class="modal-card-body is-flex">
          <div class="media">
            <div class="media-left">
              <b-icon
                icon="alert"
                type="is-warning"
                :both="true"
                size="is-large"
              />
            </div>
            <div class="media-content">
              <p>
                <template>
                  <div>
                    {{$t("suggestions.unsaved-changes")}}
                  </div>
                </template>
              </p>
            </div>
          </div>
        </section>

        <footer class="modal-card-foot" id="unsaved-buttons">
          <b-button ref="cancelButton" @click="cancel('button')"
            >{{$t("buttons.Cancel")}}</b-button
          >
          <b-button type="is-warning" ref="discardButton" @click="discard"
            >{{$t("buttons.Discard")}}</b-button
          >
          <b-button
            type="is-primary"
            ref="saveButton"
            class="is-focused"
            @click="save"
            >{{$t("buttons.Save-Continue")}}</b-button
          >
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class UnsavedForm extends Vue {
  public isActive: boolean = false;

  correctBtnsText() {
    // Костыли мужицкие (дубль 2) mobile adaptavity
    console.log(window.innerWidth)
    if (window.innerWidth <= 300) {
      const btns: HTMLElement[] = Array.from(document.querySelectorAll('#unsaved-buttons>.button'));
      console.dir(btns)

      btns.forEach(btn => {
        btn.style.fontSize = "small";
      })
    }
  }
  mounted() {
    console.log('mounted')
    this.isActive = true;
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }

    setTimeout(() => {
      this.correctBtnsText();
    }, 200)
  }

  beforeDestroy() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
    }
  }

  keyPress({ key }: any) {
    if (key == "Enter") {
      this.save();
    }
  }

  cancel() {
    this.$emit("cancel");
    this.$emit("close");
  }

  discard() {
    this.$emit("close");
    this.$emit("discard");
  }

  save() {
    this.$emit("close");
    this.$emit("save");
  }
}
</script>
