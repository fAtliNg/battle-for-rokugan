import React from "react"
import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
import { RootState } from "../../store"
import { routes } from "../../constants"

const PrivateRoute = () => {
  const { token } = useSelector((state: RootState) => state.login)

  return token ? <Outlet /> : <Navigate to={routes.login} />
}

export { PrivateRoute }
