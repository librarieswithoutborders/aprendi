const canUserEdit = (currUserPermissions, item, type) => {
  if (currUserPermissions && currUserPermissions.core_admin) {
    return true
  }

  // if only requirement is that user is logged in
  if (currUserPermissions && !item) {
    return true
  }

  if (currUserPermissions && currUserPermissions.teams) {
    if (type === 'collection' && item && item.team) {
      return currUserPermissions.teams.findIndex(d => d._id === item.team._id) > -1
    }
    if (type === 'team' && item) {
      console.log(item._id)
      return currUserPermissions.teams.findIndex(d => d._id === item._id) > -1
    }
  }

  return false
}

export default canUserEdit
