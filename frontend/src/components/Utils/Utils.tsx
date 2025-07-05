export type BadgeColor =
  | "ruby" | "blue" | "brown" | "crimson" | "cyan" | "gold" | "gray"
  | "green" | "indigo" | "lime" | "orange" | "pink" | "plum" | "purple"
  | "red" | "teal" | "tomato" | "violet" | "yellow";
export const Utils = {
  getRandomColor():BadgeColor {
   const validColors: Array<BadgeColor> = [
      "gray", "gold", "brown", "yellow", "orange", "tomato", "red", "ruby",
      "crimson", "pink", "plum", "purple", "violet", "indigo", "blue", "cyan",
      "teal", "green", "lime"
    ];
    return validColors[Math.floor(Math.random() * validColors.length)]
  },
}
