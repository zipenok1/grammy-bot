import axios from 'axios';

let token: string | undefined = process.env.MARZBAN_TOKEN

export const validToken = async (chekToken: string | undefined) =>{
  if (!chekToken) return false
  try{
    await axios.get("http://localhost:8000/api/admin",
      {
        headers: {
          Authorization: `Bearer ${chekToken}`
        }
      }
    )
    return true

  } catch(error: any){
    return false
  }
}

export const getMarzbanToken = async () =>{
  try{
    const { data } = await axios.post("http://localhost:8000/api/admin/token",
    new URLSearchParams({
      username: `${process.env.MARZBAN_USER}`,
      password: `${process.env.MARZBAN_PASS}`
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    return data.access_token

  } catch(error: any){
    console.error('TOKEN Error', error)
  }
}

export const createMarzbanUser = async (tgUsername: string) =>{  
  if (!(await validToken(token))) {
    token = await getMarzbanToken()
    if (!token) {
      console.error('Токен не получен')
      return null
    }
  }
  try{
    const { data } = await axios.post("http://localhost:8000/api/user",
      {
        username: tgUsername,
        data_limit: 1073741824, 
        proxies: { shadowsocks: { method: "chacha20-ietf-poly1305" } },
        inbounds: { shadowsocks: ["Shadowsocks TCP"] }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return{
      link: data.links[0]
    }
    
  } catch (error: any){
    console.error('API Error', error);
    throw error;
  }
}

export const deleteMarzbanUser = async (tgUsername: string) =>{
  try{
    if (!(await validToken(token))) {
        token = await getMarzbanToken();
        if (!token) 
          console.error('Токен не получен')
          return null
      }
      await axios.delete(`http://localhost:8000/api/user/${tgUsername}`,
        {
          headers: {
              Authorization: `Bearer ${token}`
          }
        }
      )
    return true
  } catch(error: any){
    console.error('DEL Error', error)
    throw error
  } 
}