
import { userdata } from "./user"

export default async function Userlist(){
    const data = await userdata()

    return(
        <div>
        {
          data && data.map((item: any) => {
            return (
              <div className="m-6 border-2 border-red-500" key={item._id}>
                <p>{item.name}</p>
              </div>
            )
          })
        }
      </div>
    )
}