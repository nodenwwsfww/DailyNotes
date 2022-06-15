<template>
  <div>
    <div class="msgs">{{errMsg}}</div>
    <div class="inputs">
        <b-field :type="usernameErr ? 'is-danger' : ''" :message="usernameErr">
          <b-input :placeholder="$t('form.placeholders.username')" size="is-medium" icon="user" v-model="username" @keyup.native.enter="login"></b-input>
        </b-field>
        <b-field :type="passwordErr ? 'is-danger' : ''" :message="passwordErr">
          <b-input :placeholder="$t('form.placeholders.password')" type="password" password-reveal size="is-medium" icon="key" v-model="password" @keyup.native.enter="login"></b-input>
        </b-field>
        <b-button type="is-primary" size="is-medium" expanded class="mt-20" @click="login" :loading="isLoading">{{ $t('headers.login') }}</b-button>
        <h1 class="mt-20 alt-button" @click="signup" v-if="!hideSignup">{{ $t('headers.signup') }}</h1>
    </div>
    <LanguageSelector/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import {Requests} from '../services/requests';
import {setToken} from '../services/user';
import LanguageSelector from "@/components/LanguageSelector.vue";

declare var process: any;

@Component({
  components: {
    LanguageSelector,
  },
  metaInfo: {
    title: 'Login'
  },
})

export default class Login extends Vue {
  public username: string = '';
  public usernameErr: string = '';

  public password: string = '';
  public passwordErr: string = '';

  public errMsg: string = '';

  public isLoading: boolean = false;

  public hideSignup = process.env.VUE_APP_PREVENT_SIGNUPS ? true : false;

  public signup() {
    this.$router.push({name: 'Sign Up'});
  }

  public async login() {
    if (this.isLoading) {
      return;
    }

    this.usernameErr = '';
    this.passwordErr = '';
    this.errMsg = '';

    if (!this.username || !this.username.length) {
      this.usernameErr = this.$t('form.errors.username').toString();

      return;
    }

    if (!this.password || !this.password.length) {
      this.passwordErr = this.$t('form.errors.password').toString();
      return;
    }

    this.isLoading = true;

    try {
      const res = await Requests.post('/login', {username: this.username, password: this.password});
      if (res.data && res.data.access_token) {
        setToken(res.data.access_token);

        if (this.$route.query && this.$route.query.from) {
          this.$router.push({path: (this.$route.query as any).from});
        } else {
          this.$router.push({name: 'Home Redirect'});
        }
      } else {
        throw Error('Data isn\'t right');
      }
    } catch (e) {
      console.log(e);

      this.errMsg = this.$t('errors.login').toString();
      this.$buefy.toast.open({
        duration: 5000,
        message: this.errMsg,
        position: 'is-top',
        type: 'is-danger'
      });
    }

    this.isLoading = false;
  }
}
</script>

<style scoped lang="scss">
.language-selector__container {
select {
  background-color: white;
  border: 1px solid rgb(197, 197, 197);
  border-radius: 5px;
  box-sizing: border-box;
  color: #3E3D40;
  font-family: SourceSansPro, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 600;
  height: 40px;
  min-width: 80px;
  padding: 0 20px 0 16px;
  outline: none;
  margin-bottom: 10px;
}
}

</style>
