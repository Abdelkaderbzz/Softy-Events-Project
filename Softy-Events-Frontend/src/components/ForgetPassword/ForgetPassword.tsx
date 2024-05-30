
import { useNavigate } from "react-router-dom"

const ForgetPassword = ({ forWhat }: { forWhat: string }) =>
{
  const label=forWhat==='login'?"I don't have account":'I already have and account'
  const authLink=forWhat==='login'?"create one":'Login'
  const navigate=useNavigate()
  return (
    <div className="forget-password">
      <p onClick={() => navigate(forWhat==='login'?'/register':'/login')}> {label}<span> {authLink}</span></p>
    </div>
  )
}

export default ForgetPassword
