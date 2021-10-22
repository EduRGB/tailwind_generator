const { writeFileSync } = require('fs')
const colors = require('tailwindcss/colors')

const formatName = name => {
  const parts = name.split(/(?=[A-Z])/)
  return parts.join('-').toLowerCase()
}

const formatColor = (name, shade, value) => {
  const formattedShade = shade ? `-${shade}` : ''
  return `  --${name}${formattedShade}: ${value};`
}

// As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`
const exclusions = ['lightBlue']

const results = []

Object.entries(colors).forEach(color => {
  const [name, shades] = color
  if (exclusions.includes(name)) {
    return
  }

  const formattedName = formatName(name)

  if (typeof shades === 'string') {
    results.push(formatColor(formattedName, null, shades))
    return
  }

  Object.entries(shades).forEach(([shade, value]) => {
    results.push(formatColor(formattedName, shade, value))
  })
})

const lines = results.join('\n')
const content = `:root {\n${lines}\n}`
writeFileSync('colors.scss', content)
