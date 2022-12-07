<template>
  <div
    class="full-height flex flex-center column justify-between q-pa-xl"
  >
    <div class="text-h4 text-uppercase text-weight-bolder text-orange">
      Enter your current results. If you don't want to go in order, then select the required player
    </div>
    <div class="flex row flex-center full-width justify-around">
      <q-table
        v-model:selected="selected"
        :rows="rows"
        :columns="columns"
        :pagination="{ page: 1, rowsPerPage: 0 }"
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
            <q-th
              class="text-left"
            >
              <div
                style="transform: translateY(50%)"
                class="text-h3 text-uppercase text-weight-bolder"
              >
                Players
              </div>
            </q-th>
            <q-th :colspan="columns.length - 2">
              <span
                class="text-h3 text-uppercase text-weight-bolder"
              >
                Hole #
              </span>
            </q-th>
            <q-th class="text-right">
              <div
                class="text-h3 text-uppercase text-weight-bolder"
              >
                Total
              </div>
            </q-th>
          </q-tr>
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              :class="{'current-hole-background': holeNumber === col.label}"
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
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              @click="selectRow(props)"
              :class="{'current-hole-background': `hole${holeNumber}` === col.name}"
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
      <div>
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
                @click="addScore"
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
            keyboard-class="numpad_score"
            layoutName="minus"
            @shift="minus = $event"
            :shift="minus"
          />
        </div>
      </div>
    </div>
    <div class="full-width flex justify-start">
      <q-btn
        :to="`/hole/${holeNumber}`"
        class="text-weight-bolder"
        push
        color="orange"
        icon="fas fa-door-closed"
        size="xl"
        label="exit"
      />
<!--      <q-btn-->
<!--        :to="`/hole/${holeNumber}`"-->
<!--        class="text-weight-bolder"-->
<!--        push-->
<!--        color="orange"-->
<!--        icon-right="fas fa-check"-->
<!--        size="xl"-->
<!--        label="confirm"-->
<!--      />-->
    </div>
    <q-dialog
      v-model="video"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white text-uppercase text-h1 flex flex-center text-weight-bold">
        Here will be video.
      </q-card>
    </q-dialog>
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
let currentPlayer = 0;
onBeforeMount(() => {
  columns.value.push({
    name: 'name',
    required: true,
    label: '',
    field: 'name',
    align: 'left',
    style: 'width: 270px',
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
    label: 'score',
    field: 'score',
    align: 'right',
    style: 'width: 230px',
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
  selected.value.push(rows.value[currentPlayer]);
});

const score = ref('');
const minus = ref(false);

const onChange = (input: string) => {
  score.value = input;
};

const addScore = () => {
  const scores: number | null = Number(`${minus.value ? '-' : ''}${score.value}`);
  selected.value[0][`hole${holeNumber.value}`] = scores;
  team.value.players[currentPlayer].holes[team.value.players[currentPlayer].holes.length - 1].scores = scores;
  team.value.players[currentPlayer].scores += scores;
  selected.value[0].score = team.value.players[currentPlayer].scores;
  video.value = true;
  setTimeout(() => {
    if (currentPlayer + 1 > rows.value.length) currentPlayer += 1;
    else currentPlayer = 0;
    const nextIndex = rows.value.findIndex(
      (item, index) => index >= currentPlayer && item[`hole${holeNumber.value}`] == null,
    );
    if (nextIndex >= 0) {
      currentPlayer = nextIndex;
      selected.value[0] = rows.value[currentPlayer];
      score.value = '';
      minus.value = false;
    } else {
      // holeStore.postResults();
      router.push(`/hole/${holeNumber.value}/check`);
    }
    video.value = false;
  }, 1500);
};

const selectRow = (props: any) => {
  // if (selectedColumn.value === 0) {
  //   selectedColumn.value = 1;
  //   score.value = String(Math.abs(props.cols[selectedColumn.value].value));
  // }
  if (rows.value[props.rowIndex][`hole${holeNumber.value}`] == null && currentPlayer !== props.rowIndex) {
    props.selected = true;
    currentPlayer = props.rowIndex;
    score.value = '';
    minus.value = false;
  }
  // else {
  //   minus.value = selected.value[0][props.cols[selectedColumn.value].name] < 0;
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   score.value = String(Math.abs(selected.value[0][props.cols[selectedColumn.value].name]));
  // }
  // selectedHole.value = props.cols[selectedColumn.value].label;
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
