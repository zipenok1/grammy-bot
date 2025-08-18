import axios from 'axios';

let token: string 

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
    token = data.access_token
    return token

  } catch(error: any){
    console.error('TOKEN Error', error);
  }
}

export const createMarzbanUser = async (tgUsername: string) =>{  
  try{
    let NewToken = await getMarzbanToken()

    const { data } = await axios.post("http://localhost:8000/api/user",
      {
        username: tgUsername,
        data_limit: 1073741824, 
        proxies: { shadowsocks: { method: "chacha20-ietf-poly1305" } },
        inbounds: { shadowsocks: ["Shadowsocks TCP"] }
      },
      {
        headers: {
          Authorization: `Bearer ${NewToken}`
        }
      }
    )
    return{
      link: data.links[0]
    }
    
  } catch (error: any){
    console.error('API Error', error);
  }
};