
const GetUserLevel = (projects, comments, following, followers) => {

  const medals = {}

  if (projects.length === 0) {
    medals.projects = "Stone"
  } else if (projects.length >= 10) {
    medals.projects = "Gold"
  } else if (projects.length >= 5) {
    medals.projects = "Silver"
  } else if (projects.length >= 1) {
    medals.projects = "Bronce"
  }

  if (comments.length >= 30) {
    medals.comments = "Gold"
  } else if (comments.length >= 15) {
    medals.comments = "Silver"
  } else if (comments.length >= 5) {
    medals.comments = "Bronce"
  } else {
    medals.comments = "Stone"
  }

  if (following.length >= 30) {
    medals.following = "Gold"
  } else if (following.length >= 15) {
    medals.following = "Silver"
  } else if (following.length >= 5) {
    medals.following = "Bronce"
  } else {
    medals.following = "Stone"
  }

  if (followers.length >= 30) {
    medals.followers = "Gold"
  } else if (followers.length >= 15) {
    medals.followers = "Silver"
  } else if (followers.length >= 5) {
    medals.followers = "Bronce"
  } else {
    medals.followers = "Stone"
  }

  let likeAcc = 0
  projects.map((project) => {
    likeAcc += project.likes.length
  })

  if (likeAcc >= 30) {
    medals.likes = "Gold"
  } else if (likeAcc >= 15) {
    medals.likes = "Silver"
  } else if (likeAcc >= 5) {
    medals.likes = "Bronce"
  } else {
    medals.likes = "Stone"
  }

  console.log(medals)
  const medalAcumulator = {
    stone: 0,
    bronce: 0,
    silver: 0,
    gold: 0,
  }
  Object.values(medals).forEach((medal) => {
    if (medal === "Stone") {
      medalAcumulator.stone += 1
    } else if (medal === "Bronce") {
      medalAcumulator.bronce += 1
    } else if (medal === "Silver") {
      medalAcumulator.silver += 1
    } else {
      medalAcumulator.gold += 1
    }
  })

  if (medalAcumulator.gold === 5) {
    return { level: "Black Widow", medals: medals }
  } else if (medalAcumulator.gold >= 1) {
    return { level: "Tarantula", medals: medals }
  } else if (medalAcumulator.silver >= 2) {
    return { level: "Redback", medals: medals }
  } else if (medalAcumulator.bronce >= 3) {
    return { level: "Wolf Spider", medals: medals }
  } else {
    return { level: "Garden Spider", medals: medals }
  }


}

export default GetUserLevel