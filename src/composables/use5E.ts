import axios from "axios";

export default function use5E(section:'ability-scores'|'alignments'|'backgrounds'|'conditions'|'classes'|'damage-types'|'equipment'|'equipment-categories'|'feats'|'features'|'languages'|'magic-items'|'magic-schools'|'monsters'|'proficiencies'|'races'|'rule-sections'|'rules'|'skills'|'spells'|'subclasses'|'subraces'|'traits'|'weapon-properties') {
  return async function(query:object|null = null) {
    const { data, status } = await axios({
      baseURL: 'https://www.dnd5eapi.co/api/',
      method: 'GET',
      url: section,
      params: query,
    })
    if(status === 200) return data;
    return null
  }
}
