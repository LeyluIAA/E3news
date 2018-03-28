<template>
  <section>
    <nav class="navbar is-fixed-top is-dark">
  <div class="navbar-brand">
    <!--<img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">-->
    <a class="navbar-item" href="#">E3 News</a>
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
                <i class="fas fa-user"></i>
              </span>
              <span>S'inscrire</span>
            </a>
            </p>
            <p class="control">
            <a class="button is-link" href="#">
              <span class="icon">
                <i class="fas fa-user"></i>
              </span>
              <span>Se connecter</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>

  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
