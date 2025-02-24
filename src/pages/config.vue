<template>
  <v-page id="page" title="Config">
    <v-card v-if="!isLoading">
      <v-card-text>
        This will load all the required data from the 5e api into your
        application.
      </v-card-text>
      <v-card-actions>
        <v-btn text="Load" color="primary" @click="loadData" />
      </v-card-actions>
    </v-card>
    <template v-if="isLoading">
      <v-card>
        <v-card-title> Monsters </v-card-title>
        <v-card-text>
          <v-row v-if="loadingMonsters === true">
            <v-col cols="12" class="d-flex justify-center">
              <v-progress-circular
                color="primary"
                indeterminate
                :size="128"
                :width="12"
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <h3>Fetching Monster List</h3>
            </v-col>
          </v-row>
          <v-list v-if="loadingMonsters === false">
            <v-list-item
              v-for="monster in monsterList"
              :id="monster.index"
              :key="monster.index"
            >
              <v-list-item-title>
                <v-progress-circular
                  v-if="monster.loading"
                  color="primary"
                  class="mr-2"
                  indeterminate
                />
                <v-icon
                  v-else
                  icon="mdi-check-circle"
                  color="success"
                  class="mr-2"
                  size="x-large"
                />
                {{ monster.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </template>
  </v-page>
</template>

<script setup>
const file = useFile()
definePage({
  meta: {
    icon: 'mdi-cog',
    title: 'Config',
  },
})

const isLoading = ref(false)
const loadingMonsters = ref(null)
const monsterList = ref([])

function saveProf(proficiencies) {
  const saves = {
    strength: false,
    dexterity: false,
    constitution: false,
    intelligence: false,
    wisdom: false,
    charisma: false,
  }
  const str = proficiencies.find(
    (i) => i.proficiency.index === 'saving-throw-str',
  )
  if (str) saves.strength = true

  const dex = proficiencies.find(
    (i) => i.proficiency.index === 'saving-throw-dex',
  )
  if (dex) saves.dexterity = true

  const con = proficiencies.find(
    (i) => i.proficiency.index === 'saving-throw-con',
  )
  if (con) saves.constitution = true

  const int = proficiencies.find(
    (i) => i.proficiency.index === 'saving-throw-int',
  )
  if (int) saves.intelligence = true

  const wis = proficiencies.find(
    (i) => i.proficiency.index === 'saving-throw-wis',
  )
  if (wis) saves.wisdom = true

  const cha = proficiencies.find(
    (i) => i.proficiency.index === 'saving-throw-cha',
  )
  if (cha) saves.charisma = true
  proficiencies = proficiencies.filter(
    (i) =>
      ![
        'saving-throw-str',
        'saving-throw-dex',
        'saving-throw-con',
        'saving-throw-int',
        'saving-throw-wis',
        'saving-throw-cha',
      ].includes(i.proficiency.index),
  )
  return { saves, proficiencies }
}

async function loadMonsters() {
  const monsters = []
  const monstersIndex = []
  loadingMonsters.value = true
  const { results } = await useFetch(
    'https://www.dnd5eapi.co/api/2014/monsters',
  )
  monsterList.value = results.map((i) => {
    i.loading = true
    return i
  })
  loadingMonsters.value = false
  for (let i = 0; i < monsterList.value.length; i++) {
    const url = monsterList.value[i].url
    const data = await useFetch(`https://www.dnd5eapi.co${url}`)
    const { proficiencies, saves } = saveProf(data.proficiencies)
    data.proficiencies = proficiencies
    data.saves = saves
    data.spells = []
    data.spellSlots = false
    if (data.special_abilities) {
      const spellcasting = data.special_abilities.find(
        (i) => i.name === 'Spellcasting',
      )
      if (spellcasting) {
        for (const { url: spellUrl } of spellcasting.spellcasting.spells) {
          const spell = await useFetch(`https://www.dnd5eapi.co${spellUrl}`)
          data.spells.push(spell)
        }
        data.spellSlots = spellcasting.spellcasting.slots
      }
    }
    monsters.push(data)
    monstersIndex.push({
      title: data.name,
      value: data.index,
      cr: data.challenge_rating,
    })
    monsterList.value[i].loading = false
    document.getElementById(data.index).scrollIntoView(true)
  }
  file.write('monsters/data', monsters)
  file.write('monsters/index', monstersIndex)
  console.log(monsters)
}

async function loadData() {
  isLoading.value = true
  await loadMonsters()
}
</script>
