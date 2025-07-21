export function probabilityFn(probability:number) {
  if (Math.random()*100 < probability) {
    return true; // 확률에 따라 true 반환
  } else {
    return false; // 확률에 따라 false 반환
  }
}
