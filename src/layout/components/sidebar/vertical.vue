<template>
  <div :class="['sidebar-container', showLogo ? 'has-logo' : '']">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar
      wrap-class="scrollbar-wrapper"
      :class="[device === 'mobile' ? 'mobile' : 'pc']"
    >
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span class="text-lg">
            <router-link to="/game1">Game 1</router-link>
          </span>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><setting /></el-icon>
            <span class="text-lg">Setting</span>
          </template>
          <el-menu-item index="1-1">
            <router-link to="/members" class="text-lg">Members</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/ipManager" class="text-lg"
              >IP Manager</router-link
            >
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo.vue';
import { useRoute } from 'vue-router';
import { emitter } from '@/utils/mitt';
import SidebarItem from './sidebarItem.vue';
import { useNav } from '@/layout/hooks/useNav';
import { responsiveStorageNameSpace } from '@/config';
import { storageLocal, isAllEmpty } from '@pureadmin/utils';
import { findRouteByPath, getParentPaths } from '@/router/utils';
import { usePermissionStoreHook } from '@/store/permission';
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting
} from '@element-plus/icons-vue';

const route = useRoute();
const showLogo = ref(
  storageLocal().getItem<StorageConfigs>(
    `${responsiveStorageNameSpace()}configure`
  )?.showLogo ?? true
);

const { device, pureApp, isCollapse, menuSelect } = useNav();

const subMenuData = ref([]);

const menuData = computed(() => {
  return pureApp.layout === 'mix' && device.value !== 'mobile'
    ? subMenuData.value
    : usePermissionStoreHook().wholeMenus;
});

const defaultActive = computed(() =>
  !isAllEmpty(route.meta?.activePath) ? route.meta.activePath : route.path
);

function getSubMenuData() {
  let path = '';
  path = defaultActive.value;
  subMenuData.value = [];
  // path的上级路由组成的数组
  const parentPathArr = getParentPaths(
    path,
    usePermissionStoreHook().wholeMenus
  );
  // 当前路由的父级路由信息
  const parenetRoute = findRouteByPath(
    parentPathArr[0] || path,
    usePermissionStoreHook().wholeMenus
  );
  if (!parenetRoute?.children) return;
  subMenuData.value = parenetRoute?.children;
}

watch(
  () => [route.path, usePermissionStoreHook().wholeMenus],
  () => {
    if (route.path.includes('/redirect')) return;
    getSubMenuData();
    menuSelect(route.path);
  }
);

onMounted(() => {
  getSubMenuData();

  emitter.on('logoChange', key => {
    showLogo.value = key;
  });
});

onBeforeUnmount(() => {
  // 解绑`logoChange`公共事件，防止多次触发
  emitter.off('logoChange');
});
</script>

<style scoped>
:deep(.el-loading-mask) {
  opacity: 0.45;
}
</style>
