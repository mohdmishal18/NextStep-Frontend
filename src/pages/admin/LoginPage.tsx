import Login from "../../components/admin/Login"

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex justify-center items-center flex-grow px-4 py-20 bg-zinc-900">
        <div className="w-full max-w-[1078px] py-24 max-md:py-10">
          <div className="flex justify-center items-center">
            <Login />
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
