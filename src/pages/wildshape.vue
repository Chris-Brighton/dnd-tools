<template>
  <v-page title="WildShape">
    <v-card v-if="!hasCast">
      <v-card-text>
        <v-form>
          <v-select v-model="config.creature" label="Creature" :items="items">
            <template #item="{ item, props }">
              <v-list-item v-bind="props">
                <template #prepend>
                  <template v-if="item.raw.cr === 0.125">
                    [CR: &nbsp; <fraction sup="1" sub="8" />] &nbsp;
                  </template>
                  <template v-else-if="item.raw.cr === 0.25">
                    [CR: &nbsp; <fraction sup="1" sub="4" />] &nbsp;
                  </template>
                  <template v-else-if="item.raw.cr === 0.5">
                    [CR: &nbsp; <fraction sup="1" sub="2" />] &nbsp;
                  </template>
                  <template v-else> [CR: {{ item.raw.cr }}] &nbsp; </template>
                </template>
                <v-list-item-title> {{ item.name }} </v-list-item-title>
              </v-list-item>
            </template>
          </v-select>
          <v-row>
            <v-col cols="4">
              <v-number-input
                v-model="config.intelligence"
                label="Intelligence"
              />
            </v-col>
            <v-col cols="4">
              <v-number-input v-model="config.wisdom" label="Wisdom" />
            </v-col>
            <v-col cols="4">
              <v-number-input v-model="config.charisma" label="Charisma" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-number-input
                v-model="config.proficiencyBonus"
                label="Proficiency Bonus"
              />
            </v-col>
            <v-col cols="8">
              <v-row no-gutters>
                <v-col cols="12">Save Proficiencies</v-col>
                <v-col cols="2">
                  <v-checkbox v-model="config.saves.str" label="Strength" />
                </v-col>
                <v-col cols="2">
                  <v-checkbox v-model="config.saves.dex" label="Dexterity" />
                </v-col>
                <v-col cols="2">
                  <v-checkbox v-model="config.saves.con" label="Constitution" />
                </v-col>
                <v-col cols="2">
                  <v-checkbox v-model="config.saves.int" label="Intelligence" />
                </v-col>
                <v-col cols="2">
                  <v-checkbox v-model="config.saves.wisdom" label="Wisdom" />
                </v-col>
                <v-col cols="2">
                  <v-checkbox v-model="config.saves.cha" label="Charisma" />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text="Reset" color="grey" @click="reset" />
        <v-btn text="Wildshape" color="primary" @click="cast" />
      </v-card-actions>
    </v-card>
    <v-card v-if="hasCast">
      <v-card-title>{{ wildshape.name }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-img :src="`/images/${wildshape.index}.png`" />
          </v-col>
          <v-col cols="8">
            <dnd-stats
              :strength="wildshape.strength"
              :dexterity="wildshape.dexterity"
              :constitution="wildshape.constitution"
              :intelligence="wildshape.intelligence"
              :wisdom="wildshape.wisdom"
              :charisma="wildshape.charisma"
            />
            <v-row>
              <v-col cols="2" class="d-flex justify-center">
                <dnd-save
                  label="Strength"
                  :proficiency-bonus="wildshape.proficiency_bonus"
                  :value="wildshape.strength"
                  :proficient="isProficient('str')"
                />
              </v-col>
              <v-col cols="2" class="d-flex justify-center">
                <dnd-save
                  label="Dexterity"
                  :proficiency-bonus="wildshape.proficiency_bonus"
                  :value="wildshape.dexterity"
                  :proficient="isProficient('dex')"
                />
              </v-col>
              <v-col cols="2" class="d-flex justify-center">
                <dnd-save
                  label="Constitution"
                  :proficiency-bonus="wildshape.proficiency_bonus"
                  :value="wildshape.constitution"
                  :proficient="isProficient('con')"
                />
              </v-col>
              <v-col cols="2" class="d-flex justify-center">
                <dnd-save
                  label="Intelligence"
                  :proficiency-bonus="wildshape.proficiency_bonus"
                  :value="wildshape.intelligence"
                  :proficient="isProficient('int')"
                />
              </v-col>
              <v-col cols="2" class="d-flex justify-center">
                <dnd-save
                  label="Wisdom"
                  :proficiency-bonus="wildshape.proficiency_bonus"
                  :value="wildshape.wisdom"
                  :proficient="isProficient('wis')"
                />
              </v-col>
              <v-col cols="2" class="d-flex justify-center">
                <dnd-save
                  label="Charisma"
                  :proficiency-bonus="wildshape.proficiency_bonus"
                  :value="wildshape.charisma"
                  :proficient="isProficient('cha')"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <code>
          <pre>{{ JSON.stringify(wildshape, null, 2) }}</pre>
        </code>
      </v-card-text>
    </v-card>
  </v-page>
</template>

<script setup>
definePage({
  meta: {
    icon: 'mdi-teddy-bear',
    title: 'Wildshape',
  },
})
const hasCast = ref(false)
const wildshape = ref()
const data = ref()
const items = ref([])
const config = ref({
  creature: null,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
  proficiencyBonus: 0,
  saves: {
    strength: false,
    dexterity: false,
    constitution: false,
    intelligence: false,
    wisdom: false,
    charisma: false,
  },
})

onBeforeMount(async () => {
  data.value = useMonsters((i) => i.type === 'beast')
  items.value = data.value
    .sort((a, b) => a.challenge_rating - b.challenge_rating)
    .map((i) => {
      return {
        title: i.name,
        value: i.index,
        cr: i.challenge_rating,
      }
    })
})

function reset() {
  config.value = {
    creature: null,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    proficiencyBonus: 0,
    saves: {
      str: false,
      dex: false,
      cons: false,
      int: false,
      wis: false,
      cha: false,
    },
  }
}

function cast() {
  const shape = JSON.parse(
    JSON.stringify(data.value.find((i) => i.index === config.value.creature)),
  )
  shape.intelligence = config.value.intelligence
  shape.wisdom = config.value.wisdom
  shape.charisma = config.value.charisma
  shape.proficiency_bonus = Math.max(
    shape.proficiency_bonus,
    config.value.proficiencyBonus,
  )
  wildshape.value = shape
  hasCast.value = true
}

function isProficient(stat) {
  if (!wildshape.value) return false
  if (config.value.saves[stat]) return true
  const proficient = wildshape.value.proficiencies.find((i) => {
    if (i.proficiency.index === `saving-throw-${stat}`) return true
    return false
  })
  if (proficient) return true
  return false
}
</script>
