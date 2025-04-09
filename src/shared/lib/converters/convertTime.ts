export const convertTime = (dateStr: string) => {
  const date = new Date(dateStr)

  return date.toLocaleTimeString("ru-RU", { 
    hour12: false, 
    hour: "2-digit", 
    minute: "2-digit", 
  })
}