const canUserEdit = (user, item, type) => {
  console.log('checking user', user, item, type)

  // only requirement is that user is logged in
  if (user && !item) {
    return true
  }

  if (user && user.permissions && user.permissions.teams) {
    if (type === "collection" && item && item.team) {
      return user.permissions.teams.findIndex(d => d._id === item.team._id) > -1
    }
    if (type === "team" && item) {
      console.log(item._id)
      return user.permissions.teams.findIndex(d => d._id === item._id) > -1
    }
  }

  return false
}

export default canUserEdit
