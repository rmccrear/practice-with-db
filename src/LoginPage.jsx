import supabase from "./utils/supabase"

export default function LoginPage({ loginComplete, cancel }) {


    async function signIn(email, password) {

        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        console.log("handled")
        console.log(error)
        console.log(data)
    }

    async function handleLogin(event) {
        event.preventDefault()
        const email = event.target.elements.email.value
        const password = event.target.elements.password.value
        console.log("handle login")
        await signIn(email, password)
        loginComplete();
    }

    return (<>

        <form onSubmit={handleLogin}>
            <label>
                email
                <input type="text" name="email" />
            </label>
            <label>
                password
                <input type="password" name="password" />
            </label>
            <button type="submit">Login</button>
        </form>
    </>)

}