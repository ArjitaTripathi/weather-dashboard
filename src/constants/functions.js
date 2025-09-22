
export const getTimeOfDay = (hour) => {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  return "night";
}

export const getIconUrl = (icon) => {
  if (!icon) return ''
  return `http://openweathermap.org/img/w/${icon}.png`
}

export const getLocalTime = (dt, timezoneOffsetInSeconds) => {
  if (!dt || !timezoneOffsetInSeconds) return null
  return new Date((dt + timezoneOffsetInSeconds) * 1000)
}

export const convertTemp = (kelvin, unit = 'C', decimals = 0) => {
  if (!kelvin) return 'N/A'
  const k = Number(kelvin)
  const c = k - 273.15
  const f = c * 9/5 + 32
  const val = unit === 'F' ? f : c
  const factor = Math.pow(10, Math.max(0, decimals))
  return (Math.round(val * factor) / factor).toFixed(decimals)
}

export const convertTemperature = (value, from = 'K', to = 'C', decimals = 0) => {
  if (!value) return 'N/A'
  const v = Number(value)
  let kelvin
  switch (from) {
    case 'C': kelvin = v + 273.15; break
    case 'F': kelvin = (v - 32) * 5/9 + 273.15; break
    default: kelvin = v
  }
  let out
  switch (to) {
    case 'C': out = kelvin - 273.15; break
    case 'F': out = (kelvin - 273.15) * 9/5 + 32; break
    default: out = kelvin - 273.15
  }
  const factor = Math.pow(10, Math.max(0, decimals))
  return (Math.round(out * factor) / factor).toFixed(decimals)
}
