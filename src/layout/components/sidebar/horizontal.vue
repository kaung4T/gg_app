<template>
  <div class="horizontal-header">
    <div class="horizontal-header-left" @click="backTopMenu">
      <img src="/logo.svg" alt="logo" />
      <span>{{ title }}</span>
    </div>
    <el-menu
      default-active="2"
      mode="horizontal"
      ref="menuRef"
      class="horizontal-header-menu"
    >
      <el-menu-item index="2" class="hover:bg-transparent!">
        <el-icon><icon-menu /></el-icon>
        <span class="text-lg">
          <router-link to="/game1">Game 1</router-link>
        </span>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><MenuSetting /></el-icon>
          <span class="text-lg">Setting</span>
        </template>
        <el-menu-item index="1-1">
          <router-link to="/members" class="text-lg">Members</router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
          <router-link to="/ipCrawlerManager" class="text-lg"
            >IP Crawler List</router-link
          >
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
    <!-- <el-menu
      router
      ref="menuRef"
      mode="horizontal"
      class="horizontal-header-menu"
      :default-active="defaultActive"
    >
      <sidebar-item
        v-for="route in usePermissionStoreHook().wholeMenus"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu> -->
    <div class="horizontal-header-right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link navbar-bg-hover">
          <img :src="userAvatar" />
          <p v-if="userStore.userInfo.name" class="dark:text-white ml-1">
            {{ userStore.userInfo.name }}
          </p>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="openResetDialog">
              <IconifyIconOffline icon="configCenter" style="margin: 5px" />
              {{ t('Reset Password') }}
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              <IconifyIconOffline
                :icon="LogoutCircleRLine"
                style="margin: 5px"
              />
              {{ t('Log out') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <LanguageNav />

      <span
        class="set-icon navbar-bg-hover"
        @click="onPanel"
        :title="t('Configuration')"
      >
        <IconifyIconOffline :icon="Setting" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarItem from './sidebarItem.vue';
import { isAllEmpty } from '@pureadmin/utils';
import { ref, nextTick, computed } from 'vue';
import { useNav } from '@/layout/hooks/useNav';
import { useTranslationLang } from '../../hooks/useTranslationLang';
import { usePermissionStoreHook } from '@/store/permission';
import LogoutCircleRLine from '@iconify-icons/ri/logout-circle-r-line';
import LanguageNav from '@/components/LanguageNav/index.vue';
import { t } from '@/plugins/i18n';
import { useResetPasswordHook } from '@/hooks/resetPasswordHook';
import { useUserStore } from '@/store/user';
import { Document, Menu as IconMenu, Location } from '@element-plus/icons-vue';
import Setting from '@iconify-icons/ri/settings-3-line';
import { Setting as MenuSetting } from '@element-plus/icons-vue';

const menuRef = ref();

const { route } = useTranslationLang(menuRef);
const { title, logout, backTopMenu, onPanel, userAvatar } = useNav();

const defaultActive = computed(() =>
  !isAllEmpty(route.meta?.activePath) ? route.meta.activePath : route.path
);
const { openResetDialog } = useResetPasswordHook();
const userStore = useUserStore();

nextTick(() => {
  menuRef.value?.handleResize();
});
</script>

<style lang="scss" scoped>
:deep(.el-loading-mask) {
  opacity: 0.45;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}

.logout {
  max-width: 120px;

  ::v-deep(.el-dropdown-menu__item) {
    display: inline-flex;
    flex-wrap: wrap;
    min-width: 100%;
  }
}
</style>
