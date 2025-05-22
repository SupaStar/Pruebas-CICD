export const Utils = {
  getRandomColor() {
    const colors = [
      'Gray',
      'Gold',
      'Bronze',
      'Brown',
      'Yellow',
      'Amber',
      'Orange',
      'Tomato',
      'Red',
      'Ruby',
      'Crimson',
      'Pink',
      'Plum',
      'Purple',
      'Violet',
      'Iris',
      'Indigo',
      'Blue',
      'Cyan',
      'Teal',
      'Jade',
      'Green',
      'Grass',
      'Lime',
      'Mint',
      'Sky',
    ]
    return colors[Math.floor(Math.random() * colors.length)].toLowerCase()
  },
}
