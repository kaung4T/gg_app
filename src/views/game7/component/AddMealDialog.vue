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


      <div>
        <h4 class="text-center mb-5">When Player is selected</h4>
        <div class="flex justify-middle">
          <h5 class="w-6/12 text-center">Player</h5>
          <h5 class="w-6/12 text-center">Banker</h5>
        </div>
        <ul class="w-full" v-for="(item, index) in playerList" :key="index">
          <li ref='playerSelected' @click="playerClick(index)" class="flex justify-middle cursor-pointer p-1">
            <p class="w-6/12 text-center">{{ item[0] }}</p>
            <p class="w-6/12 text-center">{{ item[1] }}</p>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-center mb-5">When Banker is selected</h4>
        <div class="flex justify-middle">
          <h5 class="w-6/12 text-center">Player</h5>
          <h5 class="w-6/12 text-center">Banker</h5>
        </div>
        <ul class="w-full" v-for="(item, index) in bankerList" :key="index">
          <li ref='bankerSelected' @click="bankerClick(index)" class="flex justify-middle cursor-pointer p-1">
            <p class="w-6/12 text-center">{{ item[0] }}</p>
            <p class="w-6/12 text-center">{{ item[1] }}</p>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-center mb-5">When Tie is selected</h4>
        <div class="flex justify-middle">
          <h5 class="w-6/12 text-center">Player</h5>
          <h5 class="w-6/12 text-center">Banker</h5>
        </div>
        <ul class="w-full" v-for="(item, index) in tieList" :key="index">
          <li ref='tieSelected' @click="tieClick(index)" class="flex justify-middle cursor-pointer p-1">
            <p class="w-6/12 text-center">{{ item[0] }}</p>
            <p class="w-6/12 text-center">{{ item[1] }}</p>
          </li>
        </ul>
      </div>

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
import { player_row, banker_row, tie_row } from '../utils/types';
import { message } from '@/utils/message';
import { id } from 'element-plus/es/locale';
import { ref, onMounted } from "vue";
import { func } from 'vue-types';

const emits = defineEmits(['closeDialog']);
const props = defineProps<{
  row: GAME7API.ORDER;
  mealList: any;
}>();

const newFormInline = reactive({
  p: {}
});

const playerSelected = ref();
const bankerSelected = ref();
const tieSelected = ref();

const playerList = [
  ["k(club) + 9(diamond)", "4(diamond) + 3(club)"],
  ["A(heart) + 8(diamond)", "J(spade) + 7(club)"],
  ["Q(diamond) + 8(club)", "3(heart) + J(spade)"],
  ["3(club) + 6(heart)", "10(diamond) + A(club)"],
  ["k(club) + 9(spade)", "4(club) + 3(diamond)"],
  ["7(heart) + 3(spade) + 8(diamond)", "Q(spade) + K(club) + 2(heart)"],
  ["K(heart) + Q(club) + 7(spade)", "6(diamond) + 4(diamond) + A(spade)"],
  ["10(heart) + K(diamond) +6(heart)", "4(heart) + 7(heart) + 2(heart)"],
  ["2(heart) + 3(diamond) +3(heart)", "A(diamond) + 9(diamond) + 6(spade"],
  ["2(spade) + 9(diamond) +6(heart)", "10(heart) + 3(heart) + 9(spade)"]
]

const bankerList = [
  ["3(diamond) + 2(diamond)", "9(club) + K(club)"],
  ["4(diamond) + 7(heart)", "J(diamond) + 8(spade)"],
  ["10(diamond) + 7(spade)", "Q(diamond) + 9(spade)"],
  ["6(club) + 2(diamond)", "4(spade) + 5(heart)"],
  ["8(diamond) + 8(spade)", "7(heart) + A(spade)"],
  ["10(heart) + A(spade) + 4(diamond)", "Q(spade) + 2(club) + 5(heart)"],	
  ["J(heart) + K(spade) + 5(spade)", "7(spade) + 8(diamond) + A(heart)"],
  ["10(heart) + 4(spade) + 6(club)", "5(club) + K(heart) + 3(heart)"],
  ["3(spade) + 10(diamond) + 7(heart)", "K(spade) + 2(diamond) + 6(spade)"],
  ["10(heart) + 5(spade) + 2(spade)	", "7(club) + 3(diamond) + 9(spade)"]
]

const tieList = [
  ["6(club) + 10(club)", "9(diamond) + 7(club)"],
  ["J(diamond) + 9(spade)", "6(heart) + 3(club)"],
  ["5(club) + 4(club)", "9(diamond) + K(heart)"],
  ["Q(heart) + 8(spade)", "3(heart) + 5(club)"],
  ["3(diamond) + 4(spade)", "A(spade) + 6(spade)"],
  ["A(club) + Q(heart) + 3(spade)", "K(diamond) + 2(heart) + 2(spade)"],
  ["7(diamond) + 3(club) + 6(spade)", "A(club) + 2(spade) + 3(heart)"],
  ["2(heart) + 3(spade) + A(club)", "A(heart) + 9(club) + 6(spade)"],
  ["10(club) + 4(spade) + J(club)", "5(heart) + 6(spade) + 3(heart)"],
  ["7(spade) + 7(heart) + 2(heart)", "8(diamond) + 6(heart) + 2(spade)"]
]

function playerClick (index: number) {
  newFormInline.p = player_row[index];

  playerList.map((d, i) => { playerSelected.value[i].style.border = "none"; })
  bankerList.map((d, i) => { bankerSelected.value[i].style.border = "none"; })
  tieList.map((d, i) => { tieSelected.value[i].style.border = "none"; })
  playerSelected.value[index].style.border = "1px solid #a3a3a3";
}

function bankerClick (index: number) {
  newFormInline.p = banker_row[index];

  playerList.map((d, i) => { playerSelected.value[i].style.border = "none"; })
  bankerList.map((d, i) => { bankerSelected.value[i].style.border = "none"; })
  tieList.map((d, i) => { tieSelected.value[i].style.border = "none"; })
  bankerSelected.value[index].style.border = "1px solid #a3a3a3";
}

function tieClick (index: number) {
  newFormInline.p = tie_row[index];

  playerList.map((d, i) => { playerSelected.value[i].style.border = "none"; })
  bankerList.map((d, i) => { bankerSelected.value[i].style.border = "none"; })
  tieList.map((d, i) => { tieSelected.value[i].style.border = "none"; })
  tieSelected.value[index].style.border = "1px solid #a3a3a3";
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
