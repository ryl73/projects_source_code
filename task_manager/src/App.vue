<template>
  <sidebar-menu
      :menu="menu"
      @update:collapsed="onToggleCollapse"
      v-model:collapsed="collapsed"/>
  <div
      v-if="!collapsed"
      class="sidebar-overlay"
      @click="collapsed = true"
  />
  <div class="container" id="container" :class="[{'collapsed' : collapsed}]">
    <nav-bar/>
    <router-view/>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar/NavBar";
  export default {
    components: {NavBar},
    data() {
      return {
        menu: [
          {
            header: 'Task Manager',
            hiddenOnCollapse: true
          },
          {
            href: '/',
            title: 'Main',
            icon: 'fa fa-user'
          },
          {
            href: '/charts',
            title: 'Charts',
            icon: 'fa fa-chart-area',
            child: [
              {
                href: '/charts/sublink',
                title: 'Sub Link'
              }
            ]
          }
        ],
        collapsed: true,
      }
    },
    methods: {
      onToggleCollapse(_collapsed) {
        this.collapsed = _collapsed;
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  position: relative;
}

body {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

#container {
  padding-left: 300px;
  transition: 0.3s ease;
}
#container.collapsed {
  padding-left: 70px;
}

.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
}
</style>
