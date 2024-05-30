export const isISO8086 = (dateString: string) => {
  const iso8601Regex =
    /^(\d{4})-(\d{2})-(\d{2})[Tt](\d{2}):(\d{2}):(\d{2})([.,]\d+)?([Zz]|([+-])(\d{2}):(\d{2}))?$/
  const isoExtendedRegex =
    /^(\d{4})-(\d{2})-(\d{2})[Tt](\d{2}):(\d{2}):(\d{2})([.,]\d+)?([Zz]|([+-])(\d{2}):(\d{2}))?$/
  const isoBasicRegex =
    /^(\d{4})(\d{2})(\d{2})[Tt](\d{2})(\d{2})(\d{2})([.,]\d+)?([Zz]|([+-])(\d{2})(\d{2}))?$/

  return (
    (iso8601Regex.test(dateString) && dateString.length >= 19 && dateString.length <= 29) ||
    (isoExtendedRegex.test(dateString) && dateString.length >= 19 && dateString.length <= 29) ||
    (isoBasicRegex.test(dateString) && dateString.length >= 15 && dateString.length <= 25)
  )
}
export const setFormatTime = (timeString: string) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const dateObj = new Date(timeString)
  const dayOfWeek = daysOfWeek[dateObj.getDay()]
  const day = dateObj.getDate().toString().padStart(2, '0')
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObj.getFullYear()
  const hours = dateObj.getHours().toString().padStart(2, '0')
  const minutes = dateObj.getMinutes().toString().padStart(2, '0')

  return `${dayOfWeek}, ${day}/${month}/${year} ${hours}:${minutes}`
}
