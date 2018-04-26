const canUserRequestToJoin = (currUserPermissions, team) => {
  if (!currUserPermissions || currUserPermissions == 'Invalid' || !team) {
    return false
  }

  if (currUserPermissions.core_admin) {
    return false
  }

  const teamId = team._id

  if (currUserPermissions.teams && currUserPermissions.teams.find(d => d._id === teamId) !== undefined) {
    return false
  }
  if (currUserPermissions.pending_teams && currUserPermissions.pending_teams.find(d => d._id === teamId) !== undefined) {
    return false
  }

  return true
}

export default canUserRequestToJoin
