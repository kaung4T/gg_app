<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    class=""
    label-width=""
  >
    <el-form-item :label="t('Serial')" prop="serial number">
      <span class="font-bold"> {{ row.round_id }}</span>
    </el-form-item>


    <div>
      <div class="flex justify-middle">
        <h5 class="w-6/12 text-center">Player</h5>
        <h5 class="w-6/12 text-center">Banker</h5>
      </div>
      <el-form-item>
        <ul class="w-full" v-for="(item, index) in gameList" :key="index" ref="playerRow">
          <li ref='`gameRow${{ index }}`' @click="playerClick(index)" class="flex justify-middle">
            <p class="w-6/12 text-center">{{ item[0] }}</p>
            <p class="w-6/12 text-center">{{ item[1] }}</p>
          </li>
        </ul>
      </el-form-item>
    </div>
    
    
    <div class="flex justify-end">
      <el-button @click="closeDialog">{{ t('Close') }}</el-button>
      <el-button type="primary" @click="confirmClick">{{
        t('Save')
      }}</el-button>
    </div>
  </el-form>

</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { player_row1 } from '../utils/types';
import { message } from '@/utils/message';
import { id } from 'element-plus/es/locale';
import { ref, onMounted } from "vue";

const emits = defineEmits(['closeDialog']);
const props = defineProps<{
  row: GAME7API.ORDER;
  mealList: any;
}>();

const newFormInline = reactive({
  p: {},
  meal: '',
  meal_type: ''
});

const playerRow = ref(null);



const gameList = [
  ["k(club) + 9(diamond)", "4(diamond) + 3(club)"],
  ["A(heart) + 8(diamond)", "J(spade) + 7(club)"],
  ["k(club) + 9(diamond)", "4(diamond) + 3(club)"],
  ["k(club) + 9(diamond)", "4(diamond) + 3(club)"],
  ["k(club) + 9(diamond)", "4(diamond) + 3(club)"],
  ["k(club) + 9(diamond)", "4(diamond) + 3(club)"],
  ["k(club) + 9(diamond)", "4(diamond) + 3(club)"],
]

function playerClick (index: number) {
  if (index === 0) { newFormInline.p = player_row1;

   }
}

const closeDialog = () => {
  emits('closeDialog');
};

const confirmClick = async () => {
  // alert(newFormInline.p)
  const res = await API.updateGameVegasBaccarat({
      id: props.row.id,
      member_id: null,
      banker: newFormInline.p["banker"],
      player: newFormInline.p["player"],
      order_type: "MANUAL"
  });
  message(res.message, { type: res.status ? 'success' : 'error' });
  emits('closeDialog');
};
</script>
