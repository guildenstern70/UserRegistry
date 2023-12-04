<!--
  -
  -  User Registry
  -  A web template for user management for Svelte
  -  Copyright (c) 2023 Alessio Saltarin
  -  ISC License - see LICENSE
  -
  -->
  
<script lang="ts">

</script>


<div class="text-center form-signin">
  <form>
    <img class="mt-4 mb-4" src="/img/logo.png" alt="UserRegistry Logo" width="400">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="text" class="form-control" id="username" placeholder="Your username">
      <label for="username">Username</label>
    </div>
    <div class="form-floating">
      <input type="password" class="mt-1 form-control" id="password" placeholder="Password">
      <label for="password">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2023 LittleLite Software</p>
  </form>
</div>

