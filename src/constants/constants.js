export const AQI = [
    {
        index: 1,
        level: "Good",
        message: "😊Air quality is excellent. Safe to enjoy outdoor activities."
    },
    {
        index: 2,
        level: "Fair",
        message: "🙂Air quality is acceptable. Most people can go outside as usual."
    },
    {
        index: 3,
        level: "Moderate",
        message: "👵Air quality is okay, but sensitive groups (kids, elderly, asthmatics) should take care."
    },
    {
        index: 4,
        level: "Poor",
        message: "⚠️Air quality is unhealthy. Consider limiting outdoor exertion, especially if sensitive."
    },
    {
        index: 5,
        level: "Very Poor",
        message: "🔴Air quality is very unhealthy. Avoid outdoor activity if possible."
    },
]

export const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
}

export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const currentDay = daysOfWeek[new Date().getDay()]
export const currentDate = new Date().toLocaleString("en-US", options)
