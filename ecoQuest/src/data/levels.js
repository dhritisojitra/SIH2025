// Each level describes nodes and edges. Nodes have id, label and optional x,y for initial placement.
const levels = [
  {
    id: 'easy-1',
    title: 'Easy 1',
    hint: 'Simple pairs',
    species: [
      { id: 'clownfish', label: 'Clownfish' },
      { id: 'anemone', label: 'Anemone' },
      { id: 'oak', label: 'Oak' }
    ],
    links: [
      ['clownfish', 'anemone']
    ]
  },
  {
    id: 'chain-1',
    title: 'Chain Reaction',
    hint: 'A chain of dependencies',
    species: [
      { id: 'bees', label: 'Bees' },
      { id: 'flowers', label: 'Flowers' },
      { id: 'butterflies', label: 'Butterflies' },
      { id: 'grass', label: 'Grass' }
    ],
    links: [
      ['bees', 'flowers'],
      ['butterflies', 'flowers']
    ]
  }
]

export default levels