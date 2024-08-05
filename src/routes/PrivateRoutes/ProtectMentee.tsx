import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { rootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'

// Define the type for the props
interface ProtectLoginProps {
  children: ReactNode
}

const ProtectLogin: React.FC<ProtectLoginProps> = ({ children }) => {
  const status = useSelector((prevState: rootState) => prevState.mentee.menteeLogin)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (status) {
      navigate('/mentee')
    }
  }, [status, navigate])

  return <>{!status && children}</>
}

export default ProtectLogin