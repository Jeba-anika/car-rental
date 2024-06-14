export const calcTotalDuration = (startTime: string, endTime: string) => {
  const startHourAndMin = startTime.split(':')
  const endHourAndMin = endTime.split(':')
  const startHour = Number(startHourAndMin[0])
  const startMin = Number(startHourAndMin[1])
  const endHour = Number(endHourAndMin[0])
  const endMin = Number(endHourAndMin[1])
  let timeDiff = 0
  const hourDiff = endHour - startHour
  if (endMin - startMin === 0) {
    timeDiff = hourDiff
  } else if (startMin > endMin) {
    const minDiff = startMin - endMin
    timeDiff = hourDiff - 1 + minDiff / 60
  } else if (startMin < endMin) {
    const minDiff = endMin - startMin
    timeDiff = hourDiff + Number((minDiff / 60).toFixed(2))
  }
  return timeDiff
}
