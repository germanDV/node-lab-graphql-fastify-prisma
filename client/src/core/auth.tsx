import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { LoginInput, MeQuery, RegisterUserInput } from "../generated/gql/graphql"
import { graphql } from "../generated/gql"
import { client } from "../graphql/client"

export type AuthCtxType = {
  user: MeQuery["me"]
  login: (input: LoginInput) => Promise<void>
  signup: (input: RegisterUserInput) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

const anonUser: MeQuery["me"] = {
  id: "",
  email: "",
  username: "",
  followers: {
    count: 0,
  },
  following: {
    count: 0,
  },
}

const emptyCtx: AuthCtxType = {
  user: anonUser,
  signup: async (_input: RegisterUserInput) => { },
  login: async (_input: LoginInput) => { },
  logout: async () => { },
  loading: false,
}

const AuthCtx = createContext(emptyCtx)
AuthCtx.displayName = "AuthContext"

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(anonUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const u = await requestMe()
        setUser(u.me)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = useCallback(async (input: LoginInput) => {
    await requestLogin(input) // Token gets stored in a cookie
    const u = await requestMe()
    setUser(u.me)
  }, [])

  const logout = useCallback(async () => {
    await requestLogout()
    setUser(anonUser)
  }, [])

  const signup = useCallback(async (input: RegisterUserInput) => {
    await requestSignup(input)
    await login({ usernameOrEmail: input.email, password: input.password })
  }, [])

  const value = useMemo(
    () => ({ user, login, logout, signup, loading }),
    [user, login, logout, signup, loading]
  )

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (ctx === undefined) {
    throw new Error("useAuth must be used within a AuthProvider.")
  }
  return ctx
}

const meQuery = graphql(/* GraphQL */ `
  query Me {
    me {
      id
      username
      email
      followers {
        count
      }
      following {
        count
      }
    }
  }
`)
async function requestMe() {
  return client.request(meQuery)
}

const loginMutation = graphql(/* GraphQL */ `
  mutation Login($input: LoginInput!) {
    login(input: $input)
  }
`)
async function requestLogin(input: LoginInput) {
  return client.request(loginMutation, { input })
}

const signupMutation = graphql(/* GraphQL */ `
  mutation Register($input: RegisterUserInput!) {
    register(input: $input) {
      id
      username
      email
    }
  }
`)
async function requestSignup(input: RegisterUserInput) {
  return client.request(signupMutation, { input })
}

const logoutMutation = graphql(/* GraphQL */ `
  mutation Logout {
    logout
  }
`)
async function requestLogout() {
  return client.request(logoutMutation)
}
