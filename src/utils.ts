const getMessageId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

const getCurrentUser = () =>localStorage.getItem("currentUser") || "Shahzaib Shahid"
export { getMessageId, getCurrentUser }