// @ts-check

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    'postcss-preset-env': {
      stage: 3, // Enable only stable, stage 3+ features
      features: {
        'nesting-rules': true // Manually enable nesting rules
      }
    },
  },
}
