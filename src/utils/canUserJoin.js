const canUserJoin = (user, team) => {
  if (!user || !user.permissions || !team) {
    return false
  }

  if (user.permissions.core_admin) {
    return false
  }

  if (user.permissions.teams) {
    const isOnTeam = user.permissions.teams.findIndex(d => d._id === team._id) > -1
    if (isOnTeam) {
      return false
    }
  }

  if (user.permissions.pending_teams) {
    const alreadyRequested = user.permissions.pending_teams.findIndex(d => d._id === team._id) > -1
    if (alreadyRequested) {
      return false
    }
  }

  return true
}

export default canUserJoin
