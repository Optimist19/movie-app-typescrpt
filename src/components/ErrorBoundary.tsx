import { useRouteError } from "react-router-dom"

function ErrorBoundary() {

	const errorBoundary = useRouteError()
	console.log(errorBoundary, "errorBoundary")

  return (
	<div className="text-2xl font-bold">There is an error, check back later.</div>
  )
}

export default ErrorBoundary