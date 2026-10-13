const key = "physics-journal-v1";
export function read() {
  try {
    return {
      ...{
        runs: [],
        notes: [],
        stage: 0,
        prediction: null,
        answers: {},
        assessment: null,
      },
      ...JSON.parse(localStorage.getItem(key) || "{}"),
    };
  } catch {
    return {
      runs: [],
      notes: [],
      stage: 0,
      prediction: null,
      answers: {},
      assessment: null,
    };
  }
}
export function write(data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
