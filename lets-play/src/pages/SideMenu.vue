<template>
  <div class="side-menu">
    <router-link to="/" active-class="active"><h2>Home</h2></router-link>
    <router-link to="/reviews" active-class="active">
      <h2>Reviews</h2>
    </router-link>
    <div class="side-menu__section">
      <h2>New Releases</h2>
      <router-link to="/discover/last-30-days" active-class="active">
        Last 30 days
      </router-link>
      <router-link to="/discover/this-week" active-class="active">
        This week
      </router-link>
      <router-link to="/discover/next-week" active-class="active">
        Next week
      </router-link>
      <router-link to="/discover/release-calendar" active-class="active">
        Release calendar
      </router-link>
    </div>
    <div class="side-menu__section">
      <h2>Top</h2>
      <router-link to="/discover/best-of-year" active-class="active">
        Best of the year
      </router-link>
      <router-link to="/discover/popular-2021" active-class="active">
        Popular in 2021
      </router-link>
      <router-link to="/discover/top-250" active-class="active">
        All time top 250
      </router-link>
    </div>
    <router-link to="/games" active-class="active">
      <h2>All games</h2>
    </router-link>
    <div class="side-menu__section">
      <h2>Browse</h2>
      <router-link to="/platforms" active-class="active">
        Platforms
      </router-link>
      <router-link to="/stores" active-class="active"> Stores </router-link>
      <router-link to="/collections" active-class="active">
        Collections
      </router-link>
      <router-link to="/reviews" active-class="active"> Reviews </router-link>
      <router-link to="/genres" active-class="active"> Genres </router-link>
      <router-link to="/creators" active-class="active"> Creators </router-link>
      <router-link to="/tags" active-class="active"> Tags </router-link>
      <router-link to="/developers" active-class="active">
        Developers
      </router-link>
      <router-link to="/publishers" active-class="active">
        Publishers
      </router-link>
    </div>
    <div class="side-menu__section">
      <h2>Platforms</h2>
      <router-link to="/games/pc" active-class="active"> PC </router-link>
      <router-link to="/games/ps" active-class="active">
        PlayStation 4
      </router-link>
      <router-link to="/games/xbox" active-class="active">
        Xbox One
      </router-link>
      <router-link to="/games/ns" active-class="active">
        Nintendo Switch
      </router-link>
      <router-link to="/games/ios" active-class="active"> IOS </router-link>
      <router-link to="/games/android" active-class="active">
        Android
      </router-link>
    </div>
    <div class="side-menu__section">
      <h2>Genres</h2>
      <router-link to="/genres/action" active-class="active">
        Action
      </router-link>
      <router-link to="/genres/strategy" active-class="active">
        Strategy
      </router-link>
      <router-link to="/genres/rpg" active-class="active"> RPG </router-link>
      <router-link to="/genres/shooter" active-class="active">
        Shooter
      </router-link>
      <router-link to="/genres/adventure" active-class="active">
        Adventure
      </router-link>
      <router-link to="/genres/puzzle" active-class="active">
        Puzzle
      </router-link>
      <router-link to="/genres/racing" active-class="active">
        Racing
      </router-link>
      <router-link to="/genres/sports" active-class="active">
        Sports
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.side-menu {
  position: sticky;
  top: 0;
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  gap: 1.5rem;
  a {
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }
  a:hover {
    color: $font-color-secondary;
  }
}
.side-menu__section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.active {
  color: #64b5f6;
}
</style>
