import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "../components/ui/form"
import { Button } from "../components/ui/button"
import FormField from "./FormField"
import API from "../services/api"

const authFormSchema = (type) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
}

const AuthForm = ({ type }) => {
  const navigate = useNavigate()

  const formSchema = authFormSchema(type)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      if (type === "sign-up") {
        const res = await API.post("/auth/register", data)

        if (!res.data.success) {
          toast.error(res.data.message)
          return
        }

        toast.success("Account created successfully")
        navigate("/login")
      } else {
        const res = await API.post("/auth/login", data)

        if (!res.data.success) {
          toast.error(res.data.message)
          return
        }

        localStorage.setItem("userId", res.data.user._id)
        localStorage.setItem("name", res.data.user.name)

        toast.success("Signed in successfully")
        navigate("/")
      }
    } catch (error) {
      console.log(error)
      toast.error("Authentication failed")
    }
  }

  const isSignIn = type === "sign-in"

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">

        <div className="flex flex-row gap-2 justify-center">
          <img src="/logo.svg" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >

            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>

          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}

          <Link
            to={!isSignIn ? "/login" : "/register"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>

      </div>
    </div>
  )
}

export default AuthForm