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
            <q-th colspan="3">
              <span class="text-h3 text-uppercase text-weight-bolder">
                hole #
              </span>
            </q-th>
            <q-th/>
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
            @click="props.selected = true"
          >
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              :class="{'current-hole-background': `hole${holeNumber}` === col.name}"
            >
              <span class="text-h3 text-uppercase text-weight-bold">
                <template v-if="col.value !== ''">
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
                  {{ selected[0][`hole${holeNumber}`] }}
                </div>
              </q-card-section>
            </q-card>
            <div
              style="position: absolute; transform: translateX(157px)"
            >
              <q-btn
                class="text-weight-bolder"
                push
                color="orange"
                icon="fas fa-check"
                size="xl"
                style="width: 70px; height: 70px"
                :disable="selected[0][`hole${holeNumber}`] === ''"
              />
            </div>
          </div>
          <SimpleNumpad
            style="color: black"
            @onChange="onChange"
            :input="selected[0][`hole${holeNumber}`]"
            :maxLength="2"
            keyboard-class="numpad_score"
            layoutName="minus"
            @shift="minus = $event"
            :shift="minus"
          />
        </div>
      </div>
    </div>
    <div class="full-width flex justify-between">
      <q-btn
        :to="`/hole/${holeNumber}`"
        class="text-weight-bolder"
        push
        color="orange"
        icon="fas fa-door-closed"
        size="xl"
        label="exit"
      />
      <q-btn
        :to="`/hole/${holeNumber}`"
        class="text-weight-bolder"
        push
        color="orange"
        icon-right="fas fa-check"
        size="xl"
        label="confirm"
        :disable="!(rows.every(row => row[`hole${holeNumber}`] !== ''))"
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

const holeStore = useHoleStore();
const { team } = storeToRefs(holeStore);

const score = ref('');

const route = useRoute();
const holeNumber = computed(() => route.params.hole);

const router = useRouter();

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Players',
    field: 'name',
    align: 'left',
    style: 'width: 350px',
  },
  {
    name: 'hole1',
    required: true,
    label: '1',
    field: 'hole1',
    align: 'center',
    style: 'width: 100px',
  },
  {
    name: 'hole2',
    required: true,
    label: '2',
    field: 'hole2',
    align: 'center',
    style: 'width: 100px',
  },
  {
    name: 'hole3',
    required: true,
    label: '3',
    field: 'hole3',
    align: 'center',
    style: 'width: 100px',
  },
  {
    name: 'score',
    required: true,
    label: 'Total score',
    field: 'score',
    align: 'right',
  },
];
type IRow = {
  name: string,
  hole1: string,
  hole2: string,
  hole3: string,
  score: number,
}
const rows = ref<Array<IRow>>([]);
const selected = ref<Array<IRow>>([]);
onBeforeMount(() => {
  team.value.players.forEach((player) => {
    rows.value.push({
      name: player.name,
      hole1: '',
      hole2: '',
      hole3: '',
      score: 0,
    });
  });
  selected.value.push(rows.value[0]);
});

const onChange = (input: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  selected.value[0][`hole${holeNumber.value}`] = input;
};

const minus = ref(false);

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
