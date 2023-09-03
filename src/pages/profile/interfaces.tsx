export interface objType {
  username: string,
  email: string,
  profile:{
    name:{
      firstName: string,
      lastNmae: string
    },
    avatar: string,
    country: string,
    rank: string,
    levl: number,
  },
  logs:{
    id: number,
    victories: number,
    defeats: number,
    level: number,
    rank: string,
    userId: number,
  },
  achievements:[
    arrayLevel: Array<level>,
  ]
}

export interface level{
  level: number,
  Achiement:{
    name: string,
    description: string,
  }
}