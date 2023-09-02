import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"


async function Profile() {
  const user =await getServerSession(authOptions)
  return (
    <div>{JSON.stringify(user?.user)}</div>
  )
}

export default Profile