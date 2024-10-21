//recibe como parametro las 5 medallas, cuenta cuantas de cada una tiene y dependiendo de eso devuelve uno de los 5 niveles. con ese nivel al regresar se hace lo que sea dependiendo de la respuesta
/*    
medals:{ 
  projects :{type: String, enum :["stone","Bronce","Silver","Gold"]},
  comments :{type: String, enum :["stone","Bronce","silver","Gold"]},
  following :{type: String, enum :["stone","Bronce","silver","gold"]},
  followers :{type: String, enum :["stone","bronce","silver","gold"]},
  likes :{type: String, enum :["stone","bronce","silver","gold"]},
}*/

/*
1-/projects/user/:userId (x2 - projectos(.length) y likes(map.length))
2-/comments/user/:userId (comments(.length))
3-/users/following/:userId (following(.following.length))
4-/users/followers/:userId (.length)
*/


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
  }else {
    medals.following = "Stone"
  }

  if (followers.length >= 30) {
    medals.followers = "Gold"
  } else if (followers.length >= 15) {
    medals.followers = "Silver"
  } else if (followers.length >= 5) {
    medals.followers = "Bronce"
  }else {
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
  }else {
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
    return {level:5,medals:medals}
  } else if (medalAcumulator.gold >= 1){
    return {level:4,medals:medals}
  } else if (medalAcumulator.silver >=2){
    return {level:3,medals:medals}
  } else if (medalAcumulator.bronce >= 4){
    return {level:2,medals:medals}
  } else {
    return {level:1,medals:medals}
  }


}

export default GetUserLevel