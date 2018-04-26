const canUserRequestToJoin = (currUserPermissions, team) => {
  console.log('IN CANUSERJOIN')
  console.log(currUserPermissions, team)
  if (!currUserPermissions || currUserPermissions == 'Invalid' || !team) {
    return false
  }

  if (currUserPermissions.core_admin) {
    return false
  }

  const teamId = team._id

  console.log(currUserPermissions.pending_teams.find(d => d._id === teamId))

  if (currUserPermissions.teams && currUserPermissions.teams.find(d => d._id === teamId) !== undefined) {
    return false
  }
  console.log('made it to here')
  if (currUserPermissions.pending_teams && currUserPermissions.pending_teams.find(d => d._id === teamId) !== undefined) {
    return false
  }

  console.log('made it to the end')

  return true
}

export default canUserRequestToJoin
