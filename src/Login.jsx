import { useState } from "react";

function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async () => {

const res = await fetch("http://localhost:5000/login",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

});

const data = await res.json();

if(data.message==="Login successful"){
alert("Login success");
window.location.href="/";
}else{
alert("Invalid credentials");
}

}

return(

<div>

<h2>Login</h2>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>Login</button>

</div>

)

}

export default Login;
