// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)

  if (token === null) {
    return children
  } else {
    return ""
  }
}

export default OpenRoute;