const notifyEvent = () => {
  return {
    NOTIFY: 'NOTIFY',
    WARN: 'WARN',
    EXIST: 'EXIST'
  }
}

export const event = {
  ...notifyEvent()
}

export {
  event as e
}
