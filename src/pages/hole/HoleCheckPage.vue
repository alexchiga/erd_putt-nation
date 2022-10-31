<template>
  <div
    class="full-height flex flex-center column justify-between q-pa-xl"
  >
    <div></div>
    <div class="flex row flex-center full-width justify-around">
      <q-table
        v-model:selected="selected"
        :rows="rows"
        :columns="columns"
        row-key="name"
        separator="vertical"
        dark
        flat
        card-class="bg-blue"
        hide-bottom
        selection="single"
      >
        <template v-slot:header="props">
          <q-tr>
            <q-th/>
            <q-th :colspan="columns.length - 2">
              <span class="text-h3 text-uppercase text-weight-bolder">
                hole #
              </span>
            </q-th>
            <q-th/>
          </q-tr>
          <q-tr :props="props">
            <q-th
              v-for="(col, index) in props.cols"
              :key="col.name"
              :props="props"
              @click="selectColumn(props, index)"
              :class="{'current-hole-background': selectedColumn !== 0 && selectedColumn === index}"
            >
              <span
                class="text-h3 text-uppercase text-weight-bolder"
              >
                {{ col.label }}
              </span>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr
            class="cursor-pointer hover-disable"
            :props="props"
          >
            <q-td
              v-for="(col, index) in props.cols"
              :key="col.name"
              :props="props"
              @click="selectRow(props, index)"
              :class="{'current-hole-background': selectedColumn !== 0 && selectedColumn === index}"
            >
              <span class="text-h3 text-uppercase text-weight-bold">
                <template v-if="col.value !== null">
                  {{ col.value }}
                </template>
                <template v-else>
                  —
                </template>
              </span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div v-if="selected.length">
        <div class="text-h3 q-mb-lg text-uppercase text-weight-bolder text-center">
          {{ selected[0].name }}:
        </div>
        <div class="flex flex-center column full-width justify-around" style="width: 400px">
          <div class="flex flex-center  q-mb-lg">
            <q-card
              class="input no-border-radius flex flex-center text-blue text-h3 text-weight-bold"
            >
              <q-card-section>
                <div class="carriage">
                  <span style="position: absolute; transform: translateX(-10px)" v-if="minus">-</span>
                  {{ score }}
                </div>
              </q-card-section>
            </q-card>
            <div
              style="position: absolute; transform: translateX(157px)"
            >
              <q-btn
                @click="editScore"
                class="text-weight-bolder"
                push
                color="orange"
                icon="fas fa-check"
                size="xl"
                style="width: 70px; height: 70px"
                :disable="score === ''"
              />
            </div>
          </div>
          <SimpleNumpad
            @onChange="onChange"
            style="color: black"
            :input="score"
            :maxLength="2"
            keyboard-class="numpad_check"
            layoutName="minus"
            @shift="minus = $event"
            :shift="minus"
          />
        </div>
      </div>
    </div>
    <div class="full-width flex justify-end">
      <q-btn
        @click="confirm"
        class="text-weight-bolder"
        push
        color="orange"
        icon-right="fas fa-check"
        size="xl"
        label="confirm"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SimpleNumpad from 'components/SimpleNumpad.vue';
import { useHoleStore } from 'stores/hole-store';
import { storeToRefs } from 'pinia';

const video = ref(false);

const holeStore = useHoleStore();
const { team } = storeToRefs(holeStore);

const route = useRoute();
const holeNumber = computed(() => route.params.hole);

const router = useRouter();

type IRow = {
  [k: string]: string | number,
}
type IColumn = {
  name: string,
  required: boolean,
  label: string,
  field: string,
  align: string,
  style?: string,
}
const columns = ref<Array<IColumn>>([]);
const rows = ref<Array<IRow>>([]);
const selected = ref<Array<IRow>>([]);
const selectedColumn = ref(0);
const selectedHole = ref('');
let currentPlayer = 0;
onBeforeMount(() => {
  columns.value.push({
    name: 'name',
    required: true,
    label: 'Players',
    field: 'name',
    align: 'left',
    style: 'width: 350px',
  });
  team.value.players[0].holes.forEach((hole) => {
    columns.value.push({
      name: `hole${hole.id}`,
      required: true,
      label: hole.id,
      field: `hole${hole.id}`,
      align: 'center',
      style: 'width: 100px',
    });
  });
  columns.value.push({
    name: 'score',
    required: true,
    label: 'Total score',
    field: 'score',
    align: 'right',
  });
  team.value.players.forEach((player) => {
    const holes: { [k: string]: number | null } = {};
    player.holes.forEach((hole) => {
      holes[`hole${hole.id}`] = hole.scores;
    });
    rows.value.push({
      name: player.name,
      ...holes,
      score: player.scores,
    });
  });
  // selected.value.push(rows.value[currentPlayer]);
});

const score = ref('');
const minus = ref(false);

const onChange = (input: string) => {
  score.value = input;
};

const editScore = () => {
  const scores: number | null = Number(`${minus.value ? '-' : ''}${score.value}`);
  selected.value[0][selectedHole.value] = scores;
  team.value.players[currentPlayer].holes[selectedColumn.value - 1].scores = scores;
  let totalScore = 0;
  team.value.players[currentPlayer].holes.forEach((item) => {
    totalScore += item.scores ? item.scores : 0;
  });
  team.value.players[currentPlayer].scores = totalScore;
  selected.value[0].score = totalScore;
};

const selectColumn = (props: any, index: number) => {
  if (selected.value.length === 0) {
    selected.value.push(rows.value[0]);
  }
  if (index !== 0 && index !== props.cols.length - 1) {
    // props.selected = true;
    selectedColumn.value = index;
    minus.value = selected.value[0][props.cols[index].name] < 0;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    score.value = String(Math.abs(selected.value[0][props.cols[index].name]));
  }
  selectedHole.value = props.cols[selectedColumn.value].name;
};

const selectRow = (props: any, index: number) => {
  props.selected = true;
  if (selectedColumn.value === 0) {
    selectedColumn.value = 1;
    score.value = String(Math.abs(props.cols[selectedColumn.value].value));
  }
  if (index !== 0 && index !== props.cols.length - 1) {
    selectedColumn.value = index;
    currentPlayer = props.rowIndex;
    minus.value = props.cols[index].value < 0;
    score.value = String(Math.abs(props.cols[index].value));
  } else {
    minus.value = selected.value[0][props.cols[selectedColumn.value].name] < 0;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    score.value = String(Math.abs(selected.value[0][props.cols[selectedColumn.value].name]));
  }
  selectedHole.value = props.cols[selectedColumn.value].name;
};

const loading = ref(false);
const confirm = () => {
  loading.value = true;
  holeStore.postResults();
  router.push(`/hole/${holeNumber.value}`);
};
</script>

<style scoped lang="sass">
.input
  width: 395px
  height: 80px
  transition: background-color .3s
.carriage
  height: 50px
  border-right-color: $blue
  animation: blink 1s infinite
  border-right-width: 5px
  border-right-style: solid
  white-space: pre
@keyframes blink
  0%
    border-right-color: $blue
  40%
    border-right-color: transparent
  80%
    border-right-color: $blue

.current-hole-background
  background-color: #1e485d

.hover-disable > td:before
  background: rgba(0,0,0,0) !important
</style>
