interface Options {
	method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
	body?: object,
	query?: {[key:string]:string},
}

interface Config {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  body?: string,
}

type ServiceFunction = (url: string, options:Options) => any

interface Services {
  monster: ServiceFunction,
  spell: ServiceFunction,
  feature: ServiceFunction,
  classes: ServiceFunction,
  abilityScores: ServiceFunction,
  alignments: ServiceFunction,
  backgrounds: ServiceFunction,
  conditions: ServiceFunction,
  damageTypes: ServiceFunction,
  equipment: ServiceFunction,
  equipmentCategories: ServiceFunction,
  feats: ServiceFunction,
  features: ServiceFunction,
  languages: ServiceFunction,
  magicItems: ServiceFunction,
  magicSchools: ServiceFunction,
  proficiencies: ServiceFunction,
  races: ServiceFunction,
  ruleSections: ServiceFunction,
  rules: ServiceFunction,
  skills: ServiceFunction,
  subclasses: ServiceFunction,
  subraces: ServiceFunction,
  traits: ServiceFunction,
  weaponProperties: ServiceFunction,
}

export default function ():Services {
  function buildFunction(section:string) {
    function build(options:Options) {
      const config:Config = {
        method: 'GET',
      }
      if (options.method) {
        config.method = options.method
      }
      if (options.body) {
        config.body = JSON.stringify(options.body)
      }
      let queryString = ''
      if (options.query) {
        const params = new URLSearchParams()
        for (const key in options.query) {
          if (Object.prototype.hasOwnProperty.call(options.query, key)) {
            params.append(key, options.query[key])
          }
        }
        queryString = `/?${params.toString()}`
      }
      return { query: queryString, config }
    }
    async function runFetch(url:string, config:Config) {
      const response = await fetch(url, config)
      const data = await response.json()
      return data
    }
    return async function (url = '', options:Options = {}) {
      const api = 'https://www.dnd5eapi.co/api'
      const { query, config } = build(options)
      const result = await runFetch(`${api}/${section}${url}${query}`, config)
      return result
    }
  }
  return {
    monster: buildFunction('monsters'),
    spell: buildFunction('spells'),
    feature: buildFunction('features'),
    classes: buildFunction('classes'),
    abilityScores: buildFunction('ability-scores'),
    alignments: buildFunction('alignments'),
    backgrounds: buildFunction('backgrounds'),
    conditions: buildFunction('conditions'),
    damageTypes: buildFunction('damage-types'),
    equipment: buildFunction('equipment'),
    equipmentCategories: buildFunction('equipment-categories'),
    feats: buildFunction('feats'),
    features: buildFunction('features'),
    languages: buildFunction('languages'),
    magicItems: buildFunction('magic-items'),
    magicSchools: buildFunction('magic-schools'),
    proficiencies: buildFunction('proficiencies'),
    races: buildFunction('races'),
    ruleSections: buildFunction('rule-sections'),
    rules: buildFunction('rules'),
    skills: buildFunction('skills'),
    subclasses: buildFunction('subclasses'),
    subraces: buildFunction('subraces'),
    traits: buildFunction('traits'),
    weaponProperties: buildFunction('weapon-properties'),
  }
}
