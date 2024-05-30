import  { useState } from 'react'
import OtpInput from 'react-otp-input'


const EmailConfirm = () => {
    const [otp, setOtp] = useState('')

  return (
      <div style={{ height:'400px', display:'flex',justifyContent:'center',alignContent:'center'}}>
      <OtpInput
        inputStyle={{color:'red',height:'42px',width:'43px',fontSize:'18px',borderRadius:'8px',margin:'5px'}}
        value={otp}
        onChange={setOtp}
        numInputs={8}
        renderSeparator={<span></span>}
        renderInput={(props) => <input {...props} />}
        />
        </div>
    )
}

export default EmailConfirm
