<template>
  <section>
    <nav class="navbar is-fixed-top is-dark">
  <div class="navbar-brand">
    <!--<img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">-->
    <a class="navbar-item" href="#" style="font-family: boldfont; font-size: 2.5em;">E3 News</a>
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="#">
        Feeds
      </a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="#">
          Articles
        </a>
        <div class="navbar-dropdown is-boxed">
            <a class="navbar-item" href="#">
                Tous les articles
            </a>
            <hr class="navbar-divider">            
            <a class="navbar-item" href="#">
                Microsoft
            </a>
            <a class="navbar-item" href="#">
                Sony
            </a>
            <a class="navbar-item" href="#">
                Nintendo
            </a>
            <a class="navbar-item" href="#">
                PC
            </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
            <p class="control">
            <a class="button is-primary" href="#">
              <span class="icon">
                <i class="mdi mdi-account"></i>
              </span>
              <span>S'inscrire</span>
            </a>
            </p>
            <p class="control">
            <a class="button is-link" href="#">
              <span class="icon">
                <i class="mdi mdi-account"></i>
              </span>
              <span>Se connecter</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
<feed-card>
</feed-card>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import FeedCard from '~/components/FeedCard.vue'

export default {
  components: {
    AppLogo,
    FeedCard
  }
}
</script>

<style>
</style>
