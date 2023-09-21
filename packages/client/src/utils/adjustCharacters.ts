export const adjustCharacters = (text: string) => {
  if (text.length > 250) {
    return text.slice(0, 250);
} else {
    return text.padEnd(250, ' ');
}
}
