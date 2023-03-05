import React from 'react'

interface BranchIsAuthenticatedProps {
  children?: Array<React.ReactElement>
}

export const BranchIsAuthenticated = ({ children }: BranchIsAuthenticatedProps): React.ReactElement => {
  if (!children || (Array.isArray(children) && children.length != 2)) return <span className="">BranchIsAuthenticated requires two children</span>
  return children[0]
}

export default BranchIsAuthenticated
