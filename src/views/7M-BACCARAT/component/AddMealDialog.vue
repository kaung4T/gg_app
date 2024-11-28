<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    class=""
    label-width=""
  >
    <el-form-item :label="t('Serial')" prop="serial number" style="width: 12%; margin-right: auto; margin-left: auto;">
      <span class="font-bold"> {{ row.round_id }}</span>
    </el-form-item>


    <div>


      <div class="mb-11">
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

      <div class="mb-11">
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

      <div class="mb-11">
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
  row: Baccarat7MAPI.ORDER;
  mealList: any;
}>();

const newFormInline = reactive({
  updaetData: null
});

const playerSelected = ref();
const bankerSelected = ref();
const tieSelected = ref();

const playerList = [
  ["8(heart) + Q(heart)", "5(spade) + 9(heart)"],
  ["J(spade) + 8(diamond)", "8(spade) + 8(club)"],
  ["K(diamond) + 9(club)", "5(heart) + 9(spade)"],
  ["J(diamond) + 8(heart)", "Q(club) + A(spade)"],
  ["2(club) + 7(spade)", "2(heart) + 9(diamond)"],
  ["10(heart) + 4(spade) + 4(diamond)", "5(spade) +9(club) + A(heart)"],
  ["5(club) + 6(spade) + 6(heart)", "10(spade) + 5(diamond) + K(diamond)"],
  ["4(spade) + 8(diamond) +6(heart)", "9(heart) + 3(heart) + Q(spade)"],
  ["7(spade) +5(diamond) +4(heart)", "10(club) + A(diamond) + A(heart)"],
  ["2(diamond) + 9(heart) +6(heart)", "K(diamond) + 4(heart) + 6(spade)"]
]

const bankerList = [
  ["K(spade) + 3(diamond)", "J(spade) + 8(club)"],
  ["7(club) + 10(heart)", "6(club) + 3(spade)"],
  ["4(spade) + 2(diamond)", "Q(club) + 7(spade)"],
  ["6(club) + 2(diamond)", "4(spade) + 5(heart)"],
  ["7(diamond) + 4(spade)", "5(heart) + 3(spade)"],
  ["K(heart) + 2(spade) + 10(diamond)", "10(spade) + 3(club) + J(heart)"],
  ["7(club) + 4(spade) + 10(spade)", "5(spade) + 10(heart) + K(heart)"],
  ["K(spade) + A(spade) + A(club)", "6(heart) + 4(club) + 9(spade)"],
  ["10(spade) + K(spade) + A(diamond)", "A(spade) + 2(diamond) + 3(club)"],
  ["Q(diamond) + K(spade) + 3(spade)", "7(club) + 4(diamond) + 4(spade)"]
]

const tieList = [
  ["J(club) + 9(heart)", "2(diamond) + 7(heart)"],
  ["6(diamond) + 3(spade)", "4(heart) + 5(club)"],
  ["5(club) + 2(club)", "7(diamond) + K(heart)"],
  ["Q(heart) + 7(spade)", "3(heart) + 4(club)"],
  ["4(diamond) + 3(spade)", "5(spade) + 2(spade)"],
  ["5(spade) +9(club) + A(heart)", "10(spade) + 3(club) + 2(heart)"],
  ["10(spade) + 5(diamond) + K(diamond)", "4(spade) + 10(heart) + A(heart)"],
  ["7(heart) + 3(heart) + 8(spade)", "6(heart) + 4(club) + 8(club)"],
  ["5(club) + 5(diamond) + 4(heart)", "2(spade) + K(diamond) + 2(club)"],
  ["6(diamond) + 4(heart) + 6(spade)", "4(club) + 10(diamond) + 2(spade)"],
]

function playerClick (index: number) {
  newFormInline.updaetData = player_row[index];

  playerList.map((d, i) => { playerSelected.value[i].style.border = "none"; })
  bankerList.map((d, i) => { bankerSelected.value[i].style.border = "none"; })
  tieList.map((d, i) => { tieSelected.value[i].style.border = "none"; })
  playerSelected.value[index].style.border = "1px solid #a3a3a3";
}

function bankerClick (index: number) {
  newFormInline.updaetData = banker_row[index];

  playerList.map((d, i) => { playerSelected.value[i].style.border = "none"; })
  bankerList.map((d, i) => { bankerSelected.value[i].style.border = "none"; })
  tieList.map((d, i) => { tieSelected.value[i].style.border = "none"; })
  bankerSelected.value[index].style.border = "1px solid #a3a3a3";
}

function tieClick (index: number) {
  newFormInline.updaetData = tie_row[index];

  playerList.map((d, i) => { playerSelected.value[i].style.border = "none"; })
  bankerList.map((d, i) => { bankerSelected.value[i].style.border = "none"; })
  tieList.map((d, i) => { tieSelected.value[i].style.border = "none"; })
  tieSelected.value[index].style.border = "1px solid #a3a3a3";
}

const closeDialog = () => {
  emits('closeDialog');
};

const confirmClick = async () => {
  if (newFormInline.updaetData !== null) {
    const res = await API.updateGameBaccarat7M({
      id: props.row.id,
      member_id: null,
      banker: newFormInline.updaetData["banker"],
      player: newFormInline.updaetData["player"],
      order_type: "MANUAL"
    });
    message(res.message, { type: res.status ? 'success' : 'error' });
    emits('closeDialog');
  }
};
</script>
