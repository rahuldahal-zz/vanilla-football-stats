// check if current task is "dev" or "build"

export default function nodeEnv() {
  return process.env.npm_lifecycle_event;
}
