<template>
  <el-date-picker
    :class="['ml-4']"
    v-model="timeVal"
    :type="isSingle ? 'date' : isDateTime ? 'datetimerange' : 'daterange'"
    :placeholder="placeholder"
    value-format="x"
    :format="format"
    :start-placeholder="startPlaceHolder"
    :end-placeholder="endPlaceHolder"
    :disabled-date="disableDate"
    @change="changeDate"
    :shortcuts="shortcuts"
  />
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { DateModelType, dayjs } from 'element-plus';

const props = withDefaults(
  defineProps<{
    val: string | number | string[];
    placeholder?: string;
    format?: string;
    disableDate?: Function;
    isShowShortCuts?: boolean;
    isDateTime?: boolean;
    isSingle?: boolean;
    className?: string;
    startPlaceHolder?: string;
    endPlaceHolder?: string;
  }>(),
  {
    disabledDate: () => {},
    format: 'YYYY-MM-DD',
    isShowShortCuts: true,
    isSingle: false,
    isDateTime: false,
    placeholder: t('Please select date'),
    startPlaceholder: t('Start Date'),
    endPlaceholder: t('End Date'),
    disabledDefault: false,
    className: ''
  }
);

const shortcuts = !props.isShowShortCuts
  ? []
  : props.isSingle
  ? [
      {
        text: t('One week ago'),
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return date;
        }
      },
      {
        text: t('Yesterday'),
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          return date;
        }
      },
      {
        text: t('Today'),
        value: () => {
          return new Date();
        }
      },
      {
        text: t('Tomorrow'),
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() + 3600 * 1000 * 24);
          return date;
        }
      }
    ]
  : [
      {
        text: t('Last 7 days'),
        value: () => {
          const start7Days =
            dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD') +
            '00:00:00';
          const end7Days =
            dayjs().endOf('day').format('YYYY-MM-DD') + '23:59:59';

          return [start7Days, end7Days];
        }
      },
      {
        text: t('Last 30 days'),
        value: () => {
          const start30Days =
            dayjs().subtract(30, 'day').startOf('day').format('YYYY-MM-DD') +
            '00:00:00';
          const end7Days =
            dayjs().endOf('day').format('YYYY-MM-DD') + '23:59:59';

          return [start30Days, end7Days];
        }
      },
      {
        text: t('Last month'),
        value: () => {
          const startMonth =
            dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD') +
            '00:00:00';
          const endMonth = dayjs()
            .subtract(1, 'month')
            .endOf('month')
            .format('YYYY-MM-DD');

          return [startMonth, endMonth];
        }
      },
      {
        text: t('Last week'),
        value: () => {
          const timestamp = Math.round(+new Date());
          const date = new Date(timestamp);
          const weekday = date.getDay();
          const we = weekday === 0 ? -1 : 0;

          const startOfWeek =
            dayjs()
              .add(we, 'week')
              .subtract(1, 'week')
              .day(1)
              .format('YYYY-MM-DD') + '00:00:00';

          const endOfWeek =
            dayjs()
              .add(we, 'week')
              .subtract(1, 'week')
              .add(7)
              .format('YYYY-MM-DD') + '23:59:59';

          return [startOfWeek, endOfWeek];
        }
      },
      {
        text: t('This week'),
        value: () => {
          const timestamp = Math.round(+new Date());
          const date = new Date(timestamp);
          const weekday = date.getDay();
          const we = weekday === 0 ? -1 : 0;

          const startOfWeek =
            dayjs()
              .add(we, 'week')
              .startOf('week')
              .day(1)
              .format('YYYY-MM-DD') + '00:00:00';

          const endOfWeek =
            dayjs().add(we, 'week').endOf('week').add(7).format('YYYY-MM-DD') +
            '23:59:59';

          return [startOfWeek, endOfWeek];
        }
      },
      {
        text: t('This month'),
        value: () => {
          const startMonth =
            dayjs().startOf('month').format('YYYY-MM-DD') + '00:00:00';
          const endMonth =
            dayjs().endOf('month').format('YYYY-MM-DD') + '23:59:59';

          return [startMonth, endMonth];
        }
      }
    ];

const emits = defineEmits(['update:val', 'changeDate']);
const timeVal = computed({
  get: () =>
    props.val as string | number | Date | [DateModelType, DateModelType],
  set(val) {
    emits('update:val', val);
  }
});

const changeDate = (t: number | number[]) => {
  emits('changeDate', t);
};
</script>

<style scoped></style>
