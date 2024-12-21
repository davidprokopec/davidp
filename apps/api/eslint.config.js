/** @type {import("eslint").Linter.Config} */
module.exports = (async () => {
  const { config } = await import('@repo/eslint-config/base')
  return config
})()
